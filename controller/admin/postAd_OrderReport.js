let Order = require('../../model/Order');
let { formatDate } = require('../../utils/Tools')
let PdfTable = require('voilab-pdf-table');
let PdfDocument = require('pdfkit');


module.exports = async (req, res, next) => {
    const { year, month, status, record } = req.body;
    const doc = new PdfDocument();

    var title = year + '-' + month + '-' + record + '-' + status;
    var filename = title + '.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    //Pdfkit. Chỉ dung chữ thường.
    doc.font('Times-Roman', 18)
        .fontSize(32)
        .text('MenWatches', { align: 'center' });

    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text('--------------------' + '', { align: 'center' });

    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text('The ' + status + ' Order', { align: 'center' });

    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text(year + '-' + month, { align: 'center' });
    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text('--------------------' + '', { align: 'center' });

    var i = 1;
    await Order.getPrintReportOrder(year, month, status, record).then(rs => {
        rs.forEach(data => {

            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('No. ' + i++ + '------------------------------------------', { align: "left" });

            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('     Order No. ' + data.id);
            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('     Order date: ' + formatDate(data.orderdate));
            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('     Customer: ' + data.fistname + ' ' + data.lastname);
            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('     Total: $' + data.total);
            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text(' ');

        })
    })

    doc.moveDown()
        .fillColor('black')
        .fontSize(18)
        .text("---------Finish---------", { align: "center" });
    doc.pipe(res);

    doc.end()

    /*Sử dụng cho pdfkit. nhưng vẽ hình

    let Product = require('../../model/Product');
let OrderDetails = require('../../model/OrderDetails');

var PDFDocument = require('pdfkit');

module.exports = async (req, res, next) => {
    const { year, month, record } = req.body;
    const doc = new PDFDocument();

    var title = year + '-' + month + '-' + record;
    var filename = title + '.pdf';
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    //Pdfkit. Chỉ dung chữ thường.
    doc.font('Times-Roman', 18)
        .fontSize(32)
        .text('MenWatches', { align: 'center' });

    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text('--------------------' + '', { align: 'center' });

    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text('The Best Seller Product', { align: 'center' });

    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text(year + '-' + month, { align: 'center' });
    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text('--------------------' + '', { align: 'center' });

    var i = 1;
    await Product.getReportBestSellProduct(year, month, record).then(rs => {
        rs.forEach(data => {

            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('No. ' + i++ + '------------------------------------------', { align: "left" });

            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('Product ID: ' + data.id);
            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('Product: ' + data.name);

            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('Brand: ' + data.brandname);
            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('Style: ' + data.stylename);
            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('Price: ' + data.price);
            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text('Sold quantity: ' + data.sumquantity);
            doc.font('Times-Roman', 18)
                .fontSize(12)
                .text(' ');

        })
    })

    doc.moveDown()
        .fillColor('black')
        .fontSize(18)
        .text("---------Finish---------", { align: "center" });
    doc.pipe(res);

    doc.end()

    */
}
