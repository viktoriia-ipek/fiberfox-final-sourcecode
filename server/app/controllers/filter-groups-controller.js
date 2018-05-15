var baseController = require('./baseController');
const sql = require('mssql');

var filterGroupsController = {
  get: function (req, res) {
    var query = `SELECT tfg.*, t.Name AS TopicName
      FROM TargetFilterGroups tfg
      INNER JOIN Topics t
      ON t.TopicId = tfg.TopicId`;
      baseController.executeQuery(query)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  find: function (req, res) {
    baseController.find(req, res, 'TargetFilterGroups', 'TargetFilterGroupId', req.params.id);
  },

  post: function (req, res) {
    var query = `INSERT INTO [dbo].[TargetFilterGroups] 
      ([Title], [TopicId], [MaxAllowedOptions]) 
      VALUES 
      (@Title, @TopicId, @MaxAllowedOptions)`;
    let inputList = [
      { parameter: "Title", type: sql.NVarChar, value: req.body.Title },
      { parameter: "TopicId", type: sql.Int, value: req.body.TopicId },
      { parameter: "MaxAllowedOptions", type: sql.Int, value: req.body.MaxAllowedOptions }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    var query = `UPDATE [dbo].[TargetFilterGroups]
      SET [Title] = @Title,
          [TopicId] = @TopicId,
          [MaxAllowedOptions] = @MaxAllowedOptions
      WHERE TargetFilterGroupId = @TargetFilterGroupId`;
    let inputList = [
      { parameter: "Title", type: sql.NVarChar, value: req.body.Title },
      { parameter: "TopicId", type: sql.Int, value: req.body.TopicId },
      { parameter: "MaxAllowedOptions", type: sql.Int, value: req.body.MaxAllowedOptions },
      { parameter: "TargetFilterGroupId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'TargetFilterGroups', 'TargetFilterGroupId', req.params.id);
  }
};

module.exports = filterGroupsController;