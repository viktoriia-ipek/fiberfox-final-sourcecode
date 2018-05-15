
const sql = require('mssql');
var sqlCon = sql.globalCon;
var conString = sql.conString;

const errorResponse = (err, res) => {
    console.log("Connection error: " + err);
    res.send({ success: false });
}

const successResponse = (result, res) => {
    res.send({ success: true });
}

// https://github.com/tediousjs/node-mssql#promises
var baseController = {
    executeQuery: function executeQuery(query, inputList) {
        return sql.connect(sql.conString)
            .then(pool => {
                let req = pool.request();
                if (inputList && inputList.length > 0) {
                    inputList.forEach(input => {
                        req.input(input.parameter, input.type, input.value)
                    });
                }
                return req.query(query);
            });
    },
    get: function (req, res, tableName) {
        var query = `select * from ${tableName}`;
        this.executeQuery(query)
            .then(result => res.json(result))
            .catch((err) => this.errorResponse(err, res));
    },
    find: function (req, res, tableName, keyField, keyFieldValue) {
        var query = `select * from ${tableName} where ${keyField}=@RowId`;
        let inputList = [{ parameter: "RowId", type: sql.Int, value: keyFieldValue }];
        this.executeQuery(query, inputList)
            .then(result => res.json(result))
            .catch((err) => this.errorResponse(err, res));
    },
    delete: function (req, res, tableName, keyField, keyFieldValue) {
        var query = `delete from ${tableName} where ${keyField}=@RowId`;
        let inputList = [{ parameter: "RowId", type: sql.Int, value: keyFieldValue }];
        this.executeQuery(query, inputList)
            .then((result) => this.successResponse(result, res))
            .catch((err) => this.errorResponse(err, res));
    },
    successResponse: successResponse,
    errorResponse: errorResponse
}

module.exports = baseController;