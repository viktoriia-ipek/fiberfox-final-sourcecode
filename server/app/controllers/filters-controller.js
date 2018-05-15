var baseController = require('./baseController');
const sql = require('mssql');

var filterController = {
  get: function (req, res) {
    baseController.find(req, res, 'TargetFilters', 'TargetFilterGroupId', req.params.id);
  },

  find: function (req, res) {
    baseController.find(req, res, 'TargetFilters', 'TargetFilterId', req.params.id);
  },

  post: function (req, res) {
    var query = `INSERT INTO [dbo].[TargetFilters] 
      ([FilterText], [TargetFilterGroupId]) 
      VALUES 
      (@FilterText, @TargetFilterGroupId)`;
    let inputList = [
      { parameter: "FilterText", type: sql.NVarChar, value: req.body.FilterText },
      { parameter: "TargetFilterGroupId", type: sql.Int, value: req.body.TargetFilterGroupId }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    var query = `UPDATE [dbo].[TargetFilters]
      SET [FilterText] = @FilterText,
          [TargetFilterGroupId] = @TargetFilterGroupId
      WHERE TargetFilterId = @TargetFilterId`;
    let inputList = [
      { parameter: "FilterText", type: sql.NVarChar, value: req.body.FilterText },
      { parameter: "TargetFilterGroupId", type: sql.NVarChar, value: req.body.TargetFilterGroupId },
      { parameter: "TargetFilterId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'TargetFilters', 'TargetFilterId', req.params.id);
  }
};

module.exports = filterController;
