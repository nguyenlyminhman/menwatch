var PDFDocument = require('pdfkit');

module.exports = (req, res, next) => {
    const { year, month, record } = req.body;
    const doc = new PDFDocument();
    var title = year + '-' + month + '-' + record;
    var filename = title + '.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');
    doc.font('Times-Roman', 18)
        .fontSize(32)
        .text('MenWatches' + '', { align: 'center' });

    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text('--------------------' + '', { align: 'center' });

    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text('The Best Seller Product Report' + '', { align: 'center' });

    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text(year + '-' + month, { align: 'center' });

    doc.moveDown()
        .fillColor('black')
        .fontSize(12)
        .text("sàkasjfdjksl");

    doc.pipe(res);

    doc.end();

}
