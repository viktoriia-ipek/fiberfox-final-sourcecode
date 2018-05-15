var baseController = require('./baseController');
const sql = require('mssql');

var userCtrl = {
  get: function (req, res) {
    var query = `SELECT u.*, f.FieldName, af.FieldName AS ActivityName, el.LevelName
    FROM Users u
    INNER JOIN IndustryFields f
    ON f.IndustryFieldId=u.IndustryFieldId
    INNER JOIN ActivityFields af
    ON af.ActivityFieldId=u.ActivityFieldId
    INNER JOIN ExperienceLevels el
    ON el.ExperienceLevelId=u.ExperienceLevelId`;
    baseController.executeQuery(query)
      .then(result => res.json(result))
      .catch((err) => baseController.errorResponse(err, res));
  },

  find: function (req, res) {
    var query = `select * from Users where UserId=${req.params.id}`;
    baseController.executeQuery(query)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },

  post: function (req, res) {
    var query =
      `INSERT INTO [dbo].[Users] 
                ([Email]
                ,[Username]
                ,[Password]
                ,[IndustryFieldId]
                ,[ActivityFieldId]
                ,[ActivityField]
                ,[ExperienceLevelId]
                ,[CompanyName]
                ,[IsApproved])
            VALUES
                (@Email
                ,@Username
                ,@Password
                ,@IndustryFieldId
                ,@ActivityFieldId
                ,@ActivityField
                ,@ExperienceLevelId
                ,@CompanyName
                ,0)`; // not approved!

    let inputList = [
      { parameter: "Email", type: sql.NVarChar, value: req.body.Email },
      { parameter: "Username", type: sql.NVarChar, value: req.body.Username },
      { parameter: "Password", type: sql.NVarChar, value: req.body.Password },
      { parameter: "CompanyName", type: sql.NVarChar, value: req.body.CompanyName },
      { parameter: "ActivityField", type: sql.NVarChar, value: req.body.ActivityField },
      { parameter: "IndustryFieldId", type: sql.Int, value: req.body.IndustryFieldId },
      { parameter: "ActivityFieldId", type: sql.Int, value: req.body.ActivityFieldId },
      { parameter: "ExperienceLevelId", type: sql.Int, value: req.body.ExperienceLevelId }];

    baseController.executeQuery(query, inputList)
      .then(result => {
        res.json({ success: true });
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },

  put: function (req, res) {
    var id = req.params.id //will get id
    res.send('not implemented');
  },

  delete: function (req, res) {
    var id = req.params.id //will get id
    res.send('not implemented');
  },

  getUnApproved: function (req, res) {
    var query = "select * from Users where IsApproved=0";
    baseController.executeQuery(query)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },

  changeApproveUser: function (req, res) {
    var query =
      `UPDATE [dbo].[Users] 
      SET IsApproved = ${req.body.IsApproved}
      WHERE UserId=${req.params.id}`;

    baseController.executeQuery(query)
      .then(result => {
        res.json({ success: true });
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  },

  saveOperationLog: function (req, res) {
    var query =
      `INSERT INTO [dbo].[UserOperationLogs]
           ([UserId], [SubCategoryId], [ActivityId], [PhaseId], [TopicId], [QuestionId])
           VALUES (@UserId, @SubCategoryId, @ActivityId, @PhaseId, @TopicId, @QuestionId)`;
    let inputList = [
      { parameter: "UserId", type: sql.Int, value: req.body.UserId },
      { parameter: "SubCategoryId", type: sql.Int, value: req.body.SubCategoryId },
      { parameter: "ActivityId", type: sql.Int, value: req.body.ActivityId },
      { parameter: "PhaseId", type: sql.Int, value: req.body.PhaseId },
      { parameter: "TopicId", type: sql.Int, value: req.body.TopicId },
      { parameter: "QuestionId", type: sql.Int, value: req.body.QuestionId },
    ];

    baseController.executeQuery(query, inputList)
      .then(result => {
        res.json({ success: true });
      })
      .catch(err => {
        console.log("Connection error" + err);
        res.send({ success: false });
      });
  }
};

module.exports = userCtrl;
