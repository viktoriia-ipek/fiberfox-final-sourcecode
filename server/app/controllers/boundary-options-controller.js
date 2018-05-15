var baseController = require('./baseController');
const sql = require('mssql');

var boundaryOptionController = {
  get: function (req, res) {
    baseController.find(req, res, 'BoundaryOptions', 'BoundaryId', req.params.id);
  },

  find: function (req, res) {
    baseController.find(req, res, 'BoundaryOptions', 'BoundaryOptionId', req.params.id);
  },

  post: function (req, res) {
    var query = `INSERT INTO [dbo].[BoundaryOptions] 
      ([BoundaryText], [BoundaryId]) 
      VALUES 
      (@BoundaryText, @BoundaryId)`;
    let inputList = [
      { parameter: "BoundaryText", type: sql.NVarChar, value: req.body.BoundaryText },
      { parameter: "BoundaryId", type: sql.Int, value: req.body.BoundaryId }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    var query = `UPDATE [dbo].[BoundaryOptions]
      SET [BoundaryText] = @BoundaryText,
          [BoundaryId] = @BoundaryId
      WHERE BoundaryOptionId = @BoundaryOptionId`;
    let inputList = [
      { parameter: "BoundaryText", type: sql.NVarChar, value: req.body.BoundaryText },
      { parameter: "BoundaryId", type: sql.NVarChar, value: req.body.BoundaryId },
      { parameter: "BoundaryOptionId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    var query = `DELETE FROM[dbo].[BoundaryOptionValues]
                 WHERE BoundaryOptionId = @BoundaryOptionId
                 DELETE FROM BoundaryOptions 
                 WHERE BoundaryOptionId = @BoundaryOptionId`;
    let inputList = [{ parameter: "BoundaryOptionId", type: sql.Int, value: req.params.id }];
    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  }
};

module.exports = boundaryOptionController;
