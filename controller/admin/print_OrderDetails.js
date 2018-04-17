var PDFDocument = require('pdfkit');

module.exports = (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const doc = new PDFDocument();

    var title = id;

    var content = 'This is contents ' + id;

    var publish_date = 'This is publish_date';

    var author_name = 'This is author_nam';

    var link = 'This is link';

    var filename = title + '.pdf';

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');

    res.setHeader('Content-type', 'application/pdf');

    doc.font('Times-Roman', 18)
        .fontSize(25)
        .text(title + '', 100, 50);

    doc.fontSize(15)
        .fillColor('blue')
        .text('Read Full Article', 100, 100)
        .link(100, 100, 160, 27, link);

    doc.moveDown()
        .fillColor('red')
        .text("Author: " + author_name);

    doc.moveDown()
        .fillColor('black')
        .fontSize(15)
        .text(content, {
            align: 'justify',
            indent: 30,
            height: 300,
            ellipsis: true
        });

    doc.pipe(res);

    doc.end();

}
