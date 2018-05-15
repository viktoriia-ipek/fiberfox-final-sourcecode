var baseController = require('./baseController');
const sql = require('mssql');
const xml2js = require('xml2js');

var frontController = {
  getCategories: function (req, res) {
    var query = `SELECT c.*, sc.SubCategoryId, sc.Name AS SubCategoryName, sc.IsActive FROM Categories c
    INNER JOIN SubCategories sc
    ON C.CategoryId = sc.CategoryId
    ORDER BY c.CategoryId`;
    baseController.executeQuery(query)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  getTopicsGroups: function (req, res) {
    var query = `SELECT a.ActivityId, a.Name AS ActivityName, p.PhaseId, p.Name AS PhaseName, p.Description AS PhaseDescription, COUNT(t.TopicId) AS Topics FROM Phases p
    CROSS APPLY Activities a
    LEFT JOIN Topics t
    ON t.PhaseId = p.PhaseId AND t.ActivityId = a.ActivityId AND t.SubCategoryId = @SubCategoryId
    GROUP BY a.ActivityId, a.Name, p.PhaseId, p.Name,p.Description
    ORDER BY a.Activityid`;

    let inputList = [{ parameter: "SubCategoryId", type: sql.Int, value: req.params.id }];
    baseController.executeQuery(query, inputList)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  getTopicsBy: function (req, res) {
    var query = `	SELECT t.*, p.Name AS PhaseName, 
    CASE WHEN EXISTS (SELECT * FROM Questions q WHERE q.TopicId=t.TopicId) THEN 1 ELSE 0 END AS HasQuestions 
    FROM Topics t
    INNER JOIN Phases p
    ON p.PhaseId = t.PhaseId
    WHERE t.PhaseId = @PhaseId
      AND t.SubCategoryId = @SubCategoryId
      AND t.ActivityId = @ActivityId`;

    let inputList = [
      { parameter: "PhaseId", type: sql.Int, value: req.params.pid },
      { parameter: "SubCategoryId", type: sql.Int, value: req.params.scid },
      { parameter: "ActivityId", type: sql.Int, value: req.params.actid }
    ];
    baseController.executeQuery(query, inputList)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  getQuestions: function (req, res) {
    var query = `SELECT q.*, t.Name AS TopicName FROM Questions q 
      INNER JOIN Topics t
      ON t.TopicId = q.TopicId
      WHERE q.TopicId=@TopicId`;

    let inputList = [
      { parameter: "TopicId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  getTargetFilters: function (req, res) {
    var query = `SELECT
    (SELECT * FROM TargetFilterGroups AS TargetFilterGroup
    INNER JOIN TargetFilters AS TargetFilter
    ON TargetFilter.TargetFilterGroupId = TargetFilterGroup.TargetFilterGroupId
    WHERE TargetFilterGroup.TopicId = @TopicId
    FOR XML AUTO, ROOT('Filters')) AS data`;

    let inputList = [{ parameter: "TopicId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then(xml => {
        var parseString = xml2js.parseString;
        parseString(xml[0].data, function (err, result) {
          if (result) {
            res.json(result);
          }
          else {
            baseController.errorResponse({ message: "No data found" }, res)
          }
        });
      })
      .catch((err) => baseController.errorResponse(err, res));
  },

  getBoundaries: function (req, res) {
    var query = `SELECT
    (SELECT * FROM Boundaries AS Boundary
    INNER JOIN BoundaryOptions
    ON BoundaryOptions.BoundaryId = Boundary.BoundaryId
    WHERE Boundary.TopicId = @TopicId
    FOR XML AUTO, ROOT('Filters')) AS data`;

    let inputList = [{ parameter: "TopicId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then(xml => {
        var parseString = xml2js.parseString;
        parseString(xml[0].data, function (err, result) {
          if (result) {
            res.json(result);
          }
          else {
            baseController.errorResponse({ message: "No data found" }, res)
          }
        });
      })
      .catch((err) => baseController.errorResponse(err, res));
  },

  getResultMenu: function (req, res) {
    // check for sql injection
    let filtersList = req.body.filtersList;
    let boundariesList = req.body.boundariesList;

    // if (!idList) {
    //   res.send("HM Level:01");
    // }
    // try {
    //   let numbers = idList.split(",");
    //   numbers.forEach(element => {
    //     parseInt(element);
    //   });
    // } catch (exc) {
    //   res.send("HM Level:99!!! Secret services have been notified!");
    // }

    var query = `
      SELECT r.ResultMenuId, r.Name, SUM(r.Ranking) AS Ranking
      FROM
      (SELECT 
        tfv.ResultMenuId, 
        rm.Name, 
        SUM(tfv.AlgorithmValue) AS Ranking 
      FROM TargetFilterValues tfv
      INNER JOIN ResultMenu rm
      ON rm.ResultMenuId = tfv.ResultMenuId
      WHERE tfv.TargetFilterId in (${filtersList || -1})
      GROUP BY tfv.ResultMenuId, rm.Name
      UNION ALL
      SELECT 
        bov.ResultMenuId,
        rm.Name, 
        SUM(bov.AlgorithmValue) AS Ranking
        FROM BoundaryOptionValues bov
      INNER JOIN ResultMenu rm
      ON rm.ResultMenuId = bov.ResultMenuId
      WHERE bov.BoundaryOptionId in (${boundariesList || -1})
      GROUP BY bov.ResultMenuId, rm.Name) r
      GROUP BY r.ResultMenuId, r.Name
      ORDER BY SUM(r.Ranking) DESC, r.ResultMenuId ASC`;

    baseController.executeQuery(query)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  getResultMenuByQuestionId: function (req, res) {
    var query = `
    SELECT qrm.ResultMenuId, rm.Name, 1 AS Ranking FROM [dbo].[QuestionResultMenu] qrm
    INNER JOIN ResultMenu rm
    ON rm.ResultMenuId = qrm.ResultMenuId
    WHERE qrm.QuestionId = @QuestionId`;

    let inputList = [{ parameter: "QuestionId", type: sql.Int, value: req.params.id }];

    baseController.executeQuery(query, inputList)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  getArticles: function (req, res) {
    baseController.find(req, res, 'Articles', 'ResultMenuId', req.params.id);
  },

  getMultipleArticles: function (req, res) {
    var query = `SELECT * FROM Articles
    WHERE ResultMenuId IN (${req.body.list})`;
    baseController.executeQuery(query)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  }
};

module.exports = frontController;
