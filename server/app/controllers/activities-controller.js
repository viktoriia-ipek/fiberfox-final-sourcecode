var baseController = require('./baseController');
const sql = require('mssql');

var activityCtrl = {
  get: function (req, res) {
    baseController.get(req, res, 'Activities');
  },

  find: function (req, res) {
    baseController.find(req, res, 'Activities', 'ActivityId', req.params.id);
  },

  post: function (req, res) {
    var query = `INSERT INTO [dbo].[Activities] 
      ([Name], [SortOrder]) 
      VALUES 
      (@Name, @SortOrder)`;
    let inputList = [
      { parameter: "Name", type: sql.NVarChar, value: req.body.Name },
      { parameter: "SortOrder", type: sql.Int, value: req.body.SortOrder }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    var query = `UPDATE [dbo].[Activities]
      SET [Name] = @Name,
          [SortOrder] = @SortOrder
      WHERE ActivityId = @ActivityId`;
    let inputList = [
      { parameter: "Name", type: sql.NVarChar, value: req.body.Name },
      { parameter: "SortOrder", type: sql.NVarChar, value: req.body.SortOrder },
      { parameter: "ActivityId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'Activities', 'ActivityId', req.params.id);
  }
};

module.exports = activityCtrl;
