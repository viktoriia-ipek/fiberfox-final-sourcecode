var baseController = require('./baseController');
var sql = require('mssql');

var categoryCtrl = {
  get: function (req, res) {
    baseController.get(req, res, 'Categories');
  },

  find: function (req, res) {
    baseController.find(req, res, 'Categories', 'CategoryId', req.params.id);
  },

  post: function (req, res) {
    var query = `INSERT INTO [dbo].[Categories] 
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
    var query = `UPDATE [dbo].[Categories]
      SET [Name] = @Name,
          [SortOrder] = @SortOrder
      WHERE CategoryId = @CategoryId`;
    let inputList = [
      { parameter: "Name", type: sql.NVarChar, value: req.body.Name },
      { parameter: "SortOrder", type: sql.NVarChar, value: req.body.SortOrder },
      { parameter: "CategoryId", type: sql.Int, value: req.params.id }];
      
    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'Categories', 'CategoryId', req.params.id);
  }
};

module.exports = categoryCtrl;
