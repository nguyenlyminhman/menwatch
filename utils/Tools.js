// var pdf = require('pdfkit');
// var fs = require('fs');

// var myDoc = new pdf();

// myDoc.pipe(fs.createWriteStream('demo.pdf'));
// myDoc.font('Times-Roman')
//   .fontSize(24)
//   .text(`This is an example.\n <h1>Welll</h1>`)
//   .save()
// myDoc.end();


function removeSpace(str) {
  // xóa dấu
  // str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
  // str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
  // str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
  // str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
  // str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
  // str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
  // str = str.replace(/(đ)/g, 'd');
  str = str.replace(/( )/g, ' ');
  // Remove special character.
  str = str.replace(/([^0-9a-zA-Z-\s])/g, '');
  // Remmove the space with -
  str = str.replace(/(\s+)/g, ' ');
  // remove - character at the first string
  str = str.replace(/^-+/g, '');
  // remove - character at the end string
  str = str.replace(/-+$/g, '');
  // return
  return str.trim();
}

function generatePDF() {

}


module.exports = { removeSpace }
