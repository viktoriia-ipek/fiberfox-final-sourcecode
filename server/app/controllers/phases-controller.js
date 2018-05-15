var baseController = require('./baseController');
const sql = require('mssql');

var phasesController = {
  get: function (req, res) {
    baseController.get(req, res, 'Phases');
  },

  find: function (req, res) {
    baseController.find(req, res, 'Phases', 'PhaseId', req.params.id);
  },

  post: function (req, res) {
    var query = `INSERT INTO [dbo].[Phases] 
      ([Name], [Description]) 
      VALUES 
      (@Name, @Description)`;
    let inputList = [
      { parameter: "Name", type: sql.NVarChar, value: req.body.Name },
      { parameter: "Description", type: sql.NVarChar, value: req.body.Description }];

    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  patch: function (req, res) {
    var query = `UPDATE [dbo].[Phases]
      SET [Name] = @Name,
          [Description] = @Description
      WHERE PhaseId = @PhaseId`;
    let inputList = [
      { parameter: "Name", type: sql.NVarChar, value: req.body.Name },
      { parameter: "Description", type: sql.NVarChar, value: req.body.Description },
      { parameter: "PhaseId", type: sql.Int, value: req.params.id }];
      
    baseController.executeQuery(query, inputList)
      .then((result) => baseController.successResponse(result, res))
      .catch((err) => baseController.errorResponse(err, res));
  },

  delete: function (req, res) {
    baseController.delete(req, res, 'Phases', 'PhaseId', req.params.id);
  }
};

module.exports = phasesController;
