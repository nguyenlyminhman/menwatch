const pg = require('pg');
//using for local host
var config = {
    user: 'postgres', //env var: PGUSER
    database: 'menwatch', //env var: PGDATABASE
    password: 'sa', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
};

//using for heroku
// var config = {
//     user: 'pegrhnpbmowjzv', //env var: PGUSER
//     database: 'd19gkjak9k477b', //env var: PGDATABASE
//     password: '59cfb7db0472ebb6771b35c7a06b6ffc7b87e7d6be1dbfca89bbea233af7c1d9', //env var: PGPASSWORD
//     host: 'ec2-107-21-236-219.compute-1.amazonaws.com', // Server hosting the postgres database
//     port: 5432, //env var: PGPORT
//     max: 10, // max number of clients in the pool
//     idleTimeoutMillis: 1000, // how long a client is allowed to remain idle before being closed
// };

 const pool = new pg.Pool(config);

//query function using to get data from PG
//const URI = 'postgres://ynixgrygsibkhx:dc4fc74d9e74195ead59737bff32dfb5351b2c558bef07ba167d96f5b82da7ef@ec2-23-21-220-48.compute-1.amazonaws.com:5432/d15n4528dno5aj'
//const URI = 'postgres://postgres:sa@localhost:5432/menstyle'

function queryDB(sqlString, arrData) {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, done) => {
            if (err) return reject(err);
            done();
            client.query(sqlString, arrData, (errQuery, result) => {
                if (errQuery) return reject(errQuery);
                resolve(result);
            });
        });
    });
}

// queryDB('select * from "Customer"', [])
// .then(data => console.log(data.rows))
// .catch(err => console.log(err + ''));
module.exports = queryDB;
