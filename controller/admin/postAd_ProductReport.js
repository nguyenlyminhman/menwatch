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




    /*Sử dụng cho pdfkit. nhưng vẽ hình

    doc.lineCap('butt')
        .moveTo(20, 300)
        .lineTo(20, 330)
        .stroke()
    row(doc, 300);
    row(doc, 320);
    row(doc, 340);
    row(doc, 360);
    row(doc, 380);
    row(doc, 400);
    row(doc, 420);

    textInRowFirst(doc, 'Nombre o razón social', 300);
    textInRowFirst(doc, 'RUT', 320);
    textInRowFirst(doc, 'Dirección', 340);
    textInRowFirst(doc, 'Comuna', 360);
    textInRowFirst(doc, 'Ciudad', 380);
    textInRowFirst(doc, 'Telefono', 400);
    textInRowFirst(doc, 'e-mail', 420);
    function textInRowFirst(doc, text, heigth) {
        doc.y = heigth;
        doc.x = 30;
        doc.fillColor('black')
        doc.text(text, {
            paragraphGap: 5,
            indent: 5,
            align: 'justify',
            columns: 1,
        });
        return doc
    }


    function row(doc, heigth) {
        doc.lineJoin('miter')
            .rect(30, heigth, 500, 20)
            .stroke()
        return doc
    }
    */
}
