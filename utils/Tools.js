// const queryDB = require('../utils/DatabaseConnection');

// function getProductByKeyword(aa) {
//     //        let sql = 'SELECT * FROM public."Product" WHERE name SIMILAR TO '+ "%"+'$1'+"%" +'or description SIMILAR TO'+ "%"+'$2'+"%" +' ORDER BY Id DESC'
//     let sql = 'SELECT * FROM public."Product"  WHERE "name" Like  $1';
//     return queryDB(sql, [ aa ])
//         .then(result => result.rows);
// }

// module.exports = { getProductByKeyword };

// getProductByKeyword('%Neutra%').then(results => console.log(results));

// let randomValueBase64 = (lenght) => {
//     return new Promise((resolve,reject) => {
//       let randomString = Crypto.randomBytes(Math.ceil(lenght * 3 / 4))
//                               .toString('base64')   // convert to base64 format
//                               .slice(0, lenght)        // return required number of characters
//                               .replace(/\+/g, '0')  // replace '+' with '0'
//                               .replace(/\//g, '0'); // replace '/' with '0'
//       resolve(randomString);
//     })
//   };

// function randomPassword() {
//   var text = "";
//   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   for (var i = 0; i < 9; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }
module.exports = { randomPassword };
// let a  = randomPassword();
// console.log(a)
function getOrder_Code() {
    let p_time = new Date();
    return p_time.getTime();
  }

  console.log()