var baseController = require('./baseController');
const sql = require('mssql');

var topicsController = {
  get: function (req, res) {
    var query =
      `SELECT t.*,
        p.Name AS PhaseName,
        sc.Name AS SubCategoryName,
        a.Name AS ActivityName,
        CASE WHEN EXISTS (SELECT * FROM Questions q WHERE q.TopicId=t.TopicId) THEN 1 ELSE 0 END AS HasQuestions 
      FROM Topics t
      JOIN Phases p on p.PhaseID = t.PhaseID
      JOIN SubCategories sc on sc.SubCategoryId = t.SubCategoryId
      JOIN Activities a on a.ActivityId = t.ActivityId`;
    baseController.executeQuery(query)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  find: function (req, res) {
    baseController.find(req, res, 'Topics', 'TopicId', req.params.id);
  },

  post: function (req, res) {
    var query = `INSERT INTO [dbo].[Topics] 
      ([Name], [PhaseId], [SubCategoryId], [ActivityId], [HasBoundaryOptions], [HasTargetFiltering], [IsActive]) 
      VALUES 
      (@Name, @PhaseId, @SubCategoryId, @ActivityId, @HasBoundaryOptions, @HasTargetFiltering, @IsActive)`;
    let inputList = [
      { parameter: "Name", type: sql.NVarChar, value: req.body.Name },
      { parameter: "PhaseId", type: sql.Int, value: req.body.PhaseId },
      { parameter: "SubCategoryId", type: sql.Int, value: req.body.SubCategoryId },
      { parameter: "ActivityId", type: sql.Int, value: req.body.ActivityId },
      { parameter: "HasTargetFiltering", type: sql.Bit, value: req.body.HasTargetFiltering === true ? 1 : 0 },
      { parameter: "HasBoundaryOptions", type: sql.Bit, value: req.body.HasBoundaryOptions === true ? 1 : 0 },
      { parameter: "IsActive", type: sql.Bit, value: req.body.IsActive === true ? 1 : 0 }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    var query = `UPDATE [dbo].[Topics]
      SET [Name] = @Name,
          [PhaseId] = @PhaseId,
          [SubCategoryId] = @SubCategoryId,
          [ActivityId] = @ActivityId,
          [HasBoundaryOptions] = @HasBoundaryOptions,
          [HasTargetFiltering] = @HasTargetFiltering,
          [IsActive] = @IsActive
      WHERE TopicId = @TopicId`;
    let inputList = [
      { parameter: "Name", type: sql.NVarChar, value: req.body.Name },
      { parameter: "PhaseId", type: sql.Int, value: req.body.PhaseId },
      { parameter: "SubCategoryId", type: sql.Int, value: req.body.SubCategoryId },
      { parameter: "ActivityId", type: sql.Int, value: req.body.ActivityId },
      { parameter: "HasBoundaryOptions", type: sql.Bit, value: req.body.HasBoundaryOptions === true ? 1 : 0 },
      { parameter: "HasTargetFiltering", type: sql.Bit, value: req.body.HasTargetFiltering === true ? 1 : 0 },
      { parameter: "IsActive", type: sql.Bit, value: req.body.IsActive === true ? 1 : 0 },
      { parameter: "TopicId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'Topics', 'TopicId', req.params.id);
  }
};

module.exports = topicsController;
