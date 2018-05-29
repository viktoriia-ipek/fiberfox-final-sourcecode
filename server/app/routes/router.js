var express = require('express');

var exportedRoutes = function (app) {
    const routes = express.Router();
    var secureRoutes = require('./secureRoutes')(app);
    var adminRouter = require('./admin-router')(app);

    var frontController = require('./../controllers/_front-controller');
    routes.use('/api/front/categories', secureRoutes);
    routes.route('/api/front/categories').get(frontController.getCategories);
    routes.use('/api/front/topicgroups', secureRoutes);
    routes.route('/api/front/topicgroups/:id').get(frontController.getTopicsGroups);
    routes.use('/api/front/topics', secureRoutes);
    routes.route('/api/front/topics/:pid/:scid/:actid/').get(frontController.getTopicsBy);
    routes.use('/api/front/questions', secureRoutes);
    routes.route('/api/front/questions/:id').get(frontController.getQuestions);
    routes.use('/api/front/filters', secureRoutes);
    routes.route('/api/front/filters/:id').get(frontController.getTargetFilters);
    routes.use('/api/front/boundaries', secureRoutes);
    routes.route('/api/front/boundaries/:id').get(frontController.getBoundaries);
    routes.use('/api/front/resultmenu', secureRoutes);
    routes.route('/api/front/resultmenu/').post(frontController.getResultMenu);
    routes.use('/api/front/resultmenu/:id', secureRoutes);
    routes.route('/api/front/resultmenu/:id').get(frontController.getArticles);
    routes.use('/api/front/resultmenubyq/:id', secureRoutes);
    routes.route('/api/front/resultmenubyq/:id').get(frontController.getResultMenuByQuestionId);
    





    var boundaryOptionValuesController = require('./../controllers/boundary-option-values-controller');
    routes.use('/api/boundaryvalues/:id', secureRoutes);
    routes.route('/api/boundaryvalues/:id').get(boundaryOptionValuesController.get);
    routes.use('/api/boundaryvalue', secureRoutes);
    routes.route('/api/boundaryvalue').post(boundaryOptionValuesController.post);

    var boundaryOptionController = require('./../controllers/boundary-options-controller');
    routes.use('/api/boundaryoptions/:id', secureRoutes);
    routes.route('/api/boundaryoptions/:id').get(boundaryOptionController.get);

    routes.use('/api/boundaryoptions', secureRoutes);
    routes.route('/api/boundaryoptions').post(boundaryOptionController.post);

    routes.use('/api/boundaryoption/:id', secureRoutes);
    routes.route('/api/boundaryoption/:id')
        .get(boundaryOptionController.find)
        .patch(boundaryOptionController.patch)
        .delete(boundaryOptionController.delete);

    var boundaryController = require('./../controllers/boundaries-controller');
    routes.use('/api/boundaries/', secureRoutes);
    routes.route('/api/boundaries')
        .post(boundaryController.post)
        .get(boundaryController.get);
    routes.use('/api/boundary/:id', secureRoutes);
    routes.route('/api/boundary/:id')
        .get(boundaryController.find)
        .patch(boundaryController.patch)
        .delete(boundaryController.delete);

    var filterValuesController = require('./../controllers/filters-values-controller');
    routes.use('/api/filtervalues/:id', secureRoutes);
    routes.route('/api/filtervalues/:id').get(filterValuesController.get);
    routes.use('/api/filtervalue', secureRoutes);
    routes.route('/api/filtervalue').post(filterValuesController.post);

    var filterController = require('./../controllers/filters-controller');
    routes.use('/api/filters/:id', secureRoutes);
    routes.route('/api/filters/:id').get(filterController.get);

    routes.use('/api/filters', secureRoutes);
    routes.route('/api/filters').post(filterController.post);

    routes.use('/api/filter/:id', secureRoutes);
    routes.route('/api/filter/:id')
        .get(filterController.find)
        .patch(filterController.patch)
        .delete(filterController.delete);

    var filterGroupController = require('./../controllers/filter-groups-controller');
    routes.use('/api/filtergroups/', secureRoutes);
    routes.route('/api/filtergroups')
        .post(filterGroupController.post)
        .get(filterGroupController.get);
    routes.use('/api/filtergroup/:id', secureRoutes);
    routes.route('/api/filtergroup/:id')
        .get(filterGroupController.find)
        .patch(filterGroupController.patch)
        .delete(filterGroupController.delete);

    var questionController = require('./../controllers/questions-controller');
    routes.use('/api/questions/', secureRoutes);
    routes.route('/api/questions')
        .post(questionController.post)
        .get(questionController.get);
    routes.use('/api/question/:id', secureRoutes);
    routes.route('/api/question/:id')
        .get(questionController.find)
        .patch(questionController.patch)
        .delete(questionController.delete);

    var articleController = require('./../controllers/articles-controller');
    routes.use('/api/articles/', secureRoutes);
    routes.route('/api/articles')
        .post(articleController.post)
        .get(articleController.get);
    routes.use('/api/article/:id', secureRoutes);
    routes.route('/api/article/:id')
        .get(articleController.find)
        .patch(articleController.patch)
        .delete(articleController.delete);

    var resultMenuController = require('./../controllers/result-menu-controller');
    routes.use('/api/menu/', secureRoutes);
    routes.route('/api/menu')
        .post(resultMenuController.post)
        .get(resultMenuController.get);
    routes.use('/api/resultmenu/:id', secureRoutes);
    routes.route('/api/resultmenu/:id')
        .get(resultMenuController.find)
        .patch(resultMenuController.patch)
        .delete(resultMenuController.delete);

    var phasesController = require('./../controllers/phases-controller');
    routes.use('/api/phases', secureRoutes);
    routes.route('/api/phases')
        .post(phasesController.post)
        .get(phasesController.get);
    routes.use('/api/phase/:id', secureRoutes);
    routes.route('/api/phase/:id')
        .get(phasesController.find)
        .patch(phasesController.patch)
        .delete(phasesController.delete);

    var topicsController = require('./../controllers/topics-controller');
    routes.use('/api/topics', secureRoutes);
    routes.route('/api/topics')
        .post(topicsController.post)
        .get(topicsController.get);
    routes.use('/api/topic/:id', secureRoutes);
    routes.route('/api/topic/:id')
        .get(topicsController.find)
        .patch(topicsController.patch)
        .delete(topicsController.delete);

    var activityController = require('./../controllers/activities-controller');
    routes.use('/api/activities/', secureRoutes);
    routes.route('/api/activities/')
        .get(activityController.get)
        .post(activityController.post);
    routes.use('/api/activity/:id', adminRouter);
    routes.route('/api/activity/:id')
        .get(activityController.find)
        .patch(activityController.patch)
        .delete(activityController.delete);



    var categoryController = require('./../controllers/categoriesController');
    routes.use('/api/categories/', adminRouter);
    routes.route('/api/categories/')
        .get(categoryController.get)
        .post(categoryController.post);

    routes.use('/api/category/:id', adminRouter);
    routes.route('/api/category/:id', adminRouter)
        .get(categoryController.find)
        // TODO edit
        .delete(categoryController.delete);

    var subCategoryController = require('./../controllers/sub-categories-controller');
    routes.use('/api/subcategories/', adminRouter);
    routes.route('/api/subcategories/')
        .get(subCategoryController.get)
        .post(subCategoryController.post);

    routes.use('/api/subcategory/:id', adminRouter);
    routes.route('/api/subcategory/:id', adminRouter)
        .get(subCategoryController.findByCatId)
        .patch(subCategoryController.patch)
        .delete(subCategoryController.delete);



    var indFieldController = require('./../controllers/industryFieldsController');
    routes.route('/api/indfields/')
        .get(indFieldController.get);

    routes.use('/api/indfield', adminRouter);
    routes.route('/api/indfield')
        .post(indFieldController.post);

    routes.use('/api/indfield/:id', adminRouter);
    routes.route('/api/indfield/:id', adminRouter)
        .get(indFieldController.find)
        // TODO edit
        .delete(indFieldController.delete);

    var activityFieldController = require('./../controllers/activityFieldsController');
    routes.route('/api/actfields/')
        .get(activityFieldController.get);
    routes.use('/api/actfield', adminRouter);
    routes.route('/api/actfield')
        .post(activityFieldController.post);
    routes.use('/api/actfield/:id', adminRouter);
    routes.route('/api/actfield/:id')
        .get(activityFieldController.find)
        // TODO edit
        .delete(activityFieldController.delete);

    var experienceLevelController = require('./../controllers/experienceLevelsController');
    routes.route('/api/levels/')
        .get(experienceLevelController.get);
    routes.use('/api/level', adminRouter);
    routes.route('/api/level')
        .post(experienceLevelController.post) // create
    routes.use('/api/level/:id', adminRouter);
    routes.route('/api/level/:id')
        .get(experienceLevelController.find)
        // TODO edit
        .delete(experienceLevelController.delete);

    // user api
    var userController = require('../controllers/userController');
    // user registration, auth is in `secureRoutes`
    routes.route('/api/account')
        .post(userController.post);
    routes.route('/api/users')
        .get(userController.get);
    routes.use('/api/user/:id', secureRoutes);
    routes.route('/api/user/:id')
        .get(userController.find)
        .put(userController.put)
        .delete(userController.delete);

    // operation log save
    routes.use('/api/log', secureRoutes);
    routes.route('/api/log').post(userController.saveOperationLog);

    // approval
    routes.use('/api/approval/:id', adminRouter);
    routes.route('/api/approval/:id')
        .post(userController.changeApproveUser);

    routes.get('/', function (req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    return routes;
}

module.exports = exportedRoutes;