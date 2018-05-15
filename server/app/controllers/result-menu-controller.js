var baseController = require('./baseController');
const sql = require('mssql');

var articleController = {
  get: function (req, res) {
    var query = `SELECT rm.*, t.Name AS TopicName FROM ResultMenu rm
        INNER JOIN Topics t
        ON t.TopicId = rm.TopicId`;
    baseController.executeQuery(query)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  find: function (req, res) {
    baseController.find(req, res, 'ResultMenu', 'ResultMenuId', req.params.id);
  },

  post: function (req, res) {
    var query = `INSERT INTO [dbo].[ResultMenu] ([Name], [TopicId]) VALUES (@Name, @TopicId)`;
    let inputList = [
      { parameter: "Name", type: sql.NVarChar, value: req.body.Name },
      { parameter: "TopicId", type: sql.Int, value: req.body.TopicId }
    ];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    var query = `UPDATE [dbo].[ResultMenu]
      SET [Name] = @Name,
      [TopicId]=@TopicId
      WHERE ResultMenuId = @ResultMenuId`;
    let inputList = [
      { parameter: "Name", type: sql.NVarChar, value: req.body.Name },
      { parameter: "TopicId", type: sql.Int, value: req.body.TopicId },
      { parameter: "ResultMenuId", type: sql.Int, value: req.body.ResultMenuId }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'ResultMenu', 'ResultMenuId', req.params.id);
  }
};

module.exports = articleController;
