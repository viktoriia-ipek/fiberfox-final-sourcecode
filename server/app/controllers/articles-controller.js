var baseController = require('./baseController');
const sql = require('mssql');

var articleController = {
  get: function (req, res) {
    var query = `select a.*, rm.Name AS ResultMenuName from Articles a
      join ResultMenu rm on rm.ResultMenuId = a.ResultMenuId`;
      baseController.executeQuery(query)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  find: function (req, res) {
    baseController.find(req, res, 'Articles', 'ArticleId', req.params.id);
  },

  post: function (req, res) {
    var query = `INSERT INTO [dbo].[Articles] 
      ([Title], [Description], [ResultMenuId]) 
      VALUES 
      (@Title, @Description, @ResultMenuId)`;
    let inputList = [
      { parameter: "Title", type: sql.NVarChar, value: req.body.Title },
      { parameter: "Description", type: sql.NVarChar, value: req.body.Description },
      { parameter: "ResultMenuId", type: sql.Int, value: req.body.ResultMenuId }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    var query = `UPDATE [dbo].[Articles]
      SET [Title] = @Title,
          [Description] = @Description,
          [ResultMenuId] = @ResultMenuId
      WHERE ArticleId = @ArticleId`;
    let inputList = [
      { parameter: "Title", type: sql.NVarChar, value: req.body.Title },
      { parameter: "Description", type: sql.NVarChar, value: req.body.Description },
      { parameter: "ResultMenuId", type: sql.Int, value: req.body.ResultMenuId },
      { parameter: "ArticleId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'Articles', 'ArticleId', req.params.id);
  }
};

module.exports = articleController;
