const queryDB = require('../utils/DatabaseConnection');

function getProductByKeyword(aa) {
    //        let sql = 'SELECT * FROM public."Product" WHERE name SIMILAR TO '+ "%"+'$1'+"%" +'or description SIMILAR TO'+ "%"+'$2'+"%" +' ORDER BY Id DESC'
    let sql = 'SELECT * FROM public."Product"  WHERE "name" Like  $1';
    return queryDB(sql, [ aa ])
        .then(result => result.rows);
}

module.exports = { getProductByKeyword };

getProductByKeyword('%Neutra%').then(results => console.log(results));