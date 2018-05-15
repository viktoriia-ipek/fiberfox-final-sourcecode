var baseController = require('./baseController');
const sql = require('mssql');

var questionsController = {
  get: function (req, res) {
    var query = `SELECT q.*, t.Name AS TopicName
                FROM [dbo].[Questions] q
                INNER JOIN Topics t
                ON t.TopicId = q.TopicId`;

    baseController.executeQuery(query)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  find: function (req, res) {
    var query = `SELECT q.*, qrm.QuestionResultMenuId,qrm.ResultMenuId, rm.Name AS ResultMenuName
                 FROM [dbo].[Questions] q
                 LEFT JOIN [dbo].[QuestionResultMenu] qrm
                 ON q.QuestionId = qrm.QuestionId
                 LEFT JOIN [dbo].[ResultMenu] rm
                 ON RM.ResultMenuId = qrm.ResultMenuId
                 WHERE q.QuestionId = @QuestionId`;
    let inputList = [{ parameter: "QuestionId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  post: function (req, res) {
    let resultMenuScript = "";
    if (req.body.ResultMenuItems && req.body.ResultMenuItems.length > 0) {
      resultMenuScript = `INSERT INTO [dbo].[QuestionResultMenu] ([ResultMenuId], [QuestionId]) VALUES `;
      req.body.ResultMenuItems.forEach((element, i) => {
        resultMenuScript += `(${element.ResultMenuId}, @QuestionId)`;
        if (i != req.body.ResultMenuItems.length - 1) {
          resultMenuScript += ",";
        }
      });
    }
    var query = `
    BEGIN TRANSACTION;
      INSERT INTO [dbo].[Questions] ([QuestionText] ,[TopicId] ,[HasTargetFiltering] ,[HasBoundaryOptions])
        VALUES ('${req.body.QuestionText}', ${req.body.TopicId}, 
                 ${req.body.HasTargetFiltering === true ? 1 : 0}, ${req.body.HasBoundaryOptions === true ? 1 : 0})
      DECLARE @QuestionId INT = (SELECT SCOPE_IDENTITY());
      ${resultMenuScript}
    COMMIT;`;
    baseController.executeQuery(query)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    let resultMenuScript = "";
    if (req.body.ResultMenuItems && req.body.ResultMenuItems.length > 0) {
      resultMenuScript = `INSERT INTO [dbo].[QuestionResultMenu] ([ResultMenuId], [QuestionId]) VALUES `;
      req.body.ResultMenuItems.forEach((element, i) => {
        resultMenuScript += `(${element.ResultMenuId}, ${req.params.id})`;
        if (i != req.body.ResultMenuItems.length - 1) {
          resultMenuScript += ",";
        }
      });
    }
    var query = `
    BEGIN TRANSACTION;
      UPDATE [dbo].[Questions] 
      SET [QuestionText] = '${req.body.QuestionText}',
          [TopicId] = ${req.body.TopicId},
          [HasTargetFiltering] = ${req.body.HasTargetFiltering === true ? 1 : 0},
          [HasBoundaryOptions] = ${req.body.HasBoundaryOptions === true ? 1 : 0}
      WHERE QuestionId = ${req.params.id}
      DELETE FROM [dbo].[QuestionResultMenu]
      WHERE QuestionId = ${req.params.id}
      ${resultMenuScript}
    COMMIT;`;
    baseController.executeQuery(query)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'Questions', 'QuestionId', req.params.id);
  }
};

module.exports = questionsController;
