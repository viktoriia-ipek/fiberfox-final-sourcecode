var baseController = require('./baseController');
const sql = require('mssql');

var activityFieldCtrl = {
  get: function (req, res) {
    baseController.get(req, res, 'ExperienceLevels');
  },

  find: function (req, res) {
    baseController.find(req, res, 'ExperienceLevels', 'ExperienceLevelId', req.params.id);
  },

  post: function (req, res) {
    var query = `INSERT INTO [dbo].[ExperienceLevels] 
      ([LevelName], [SortOrder]) 
      VALUES 
      (@LevelName, @SortOrder)`;
    let inputList = [
      { parameter: "LevelName", type: sql.NVarChar, value: req.body.LevelName },
      { parameter: "SortOrder", type: sql.Int, value: req.body.SortOrder }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    var query = `UPDATE [dbo].[ExperienceLevels]
      SET [LevelName] = @LevelName,
          [SortOrder] = @SortOrder
      WHERE ExperienceLevelId = @ExperienceLevelId`;
    let inputList = [
      { parameter: "LevelName", type: sql.NVarChar, value: req.body.LevelName },
      { parameter: "SortOrder", type: sql.NVarChar, value: req.body.SortOrder },
      { parameter: "ExperienceLevelId", type: sql.Int, value: req.params.id }];
      
    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'ExperienceLevels', 'ExperienceLevelId', req.params.id);
  }
};

module.exports = activityFieldCtrl;
