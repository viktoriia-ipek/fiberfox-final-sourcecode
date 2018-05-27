// exports.dbConfig = {
//     user:  'sa',
//     password: 'mbrinfo@123',
//     server: '192.168.0.67\\mbrinfo',
//     database:'Fiberfox_Db',
//     port:1433

// };


// exports.dbConfig = {
//     user:  'rahman@fiberfox1',
//     password: 'fiberfox_123',
//     server: 'fiberfox1.database.windows.net',
//     database:'Fiberfox_Db',
//     port:1433,
//     options: {
//         encrypt: true // Use this if you're on Windows Azure
//     }

// };

exports.dbConfig = {
    user:  'rahman',
    password: 'fiberfox_123',
    server: 'fiberfoxdatabase.cx2y7jjgw3wj.eu-central-1.rds.amazonaws.com',
    database:'Fiberfox_Db',
    port:1433,
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }

};

exports.secrets={'superSecret': 'goyalRahmanJointSecretCode'};