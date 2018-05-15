var express = require('express');

var phaseRoutes = function () {
    var phasesRouter = express.Router();
    
    var phasesController = require('./../controllers/phases-controller');
    
    phasesRouter.route('/phases')
        .post(phasesController.post)
        .get(function (req, res) {
            res.send("WW");
          });

    phasesRouter.route('/phase/:id')
        .get(phasesController.find)
        //.patch(phasesController.patch)
        .delete(phasesController.delete);

    return phasesRouter;
};

module.exports = phaseRoutes;