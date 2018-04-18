const OrderDetails = require('../../model/OrderDetails');
const Order = require('../../model/Order');
let PDFDocument = require('pdfkit');

module.exports = async (req, res, next) => {
    const { id } = req.params;
    let orderDetails = new OrderDetails(undefined, id, undefined, undefined);
    let order = new Order(id);
    const doc = new PDFDocument();
    var d = new Date();
        //get current date
    const currentDate = d.getFullYear() + "-" + parseInt(d.getMonth() + 1) + "-" + d.getDate()
    var title = id;
    var filename = title + '.pdf';



    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    doc.font('Times-Roman', 18)
        .fontSize(32)
        .text('MenWatches', { align: 'center' });

    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text('--------------------' + '', { align: 'center' });



    doc.font('Times-Roman', 18)
        .fontSize(16)
        .text('Order Information', { align: 'center' })
        .text('( ' + currentDate + ' )', { align: 'center' })

    doc.font('Times-Roman', 18)
        .fontSize(24)
        .text('--------------------' + '', { align: 'center' });

    doc.font('Times-Roman', 18)
        .fontSize(16)
        .text(' ', { align: 'left' })
        .text('No. ' + id, { align: 'left' })
        .text(' ', { align: 'left' });

    doc.font('Times-Roman', 18)
        .fontSize(16)
        .text('Receiver Information' + '', { align: 'left' })
    doc.font('Times-Roman', 18)
        .fontSize(16)
        .text('---------------------------------------------------------------------------------------', { align: 'center' });

    await order.getOrderById().then(od => {
        od.forEach(info => {
            doc.font('Times-Roman', 50)
                .fontSize(12)
                .text('   * Fullname: ' + info.receiver, { align: 'left' })
                .text('  ')
            doc.font('Times-Roman', 50)
                .fontSize(12)
                .text('   * Address: ' + info.orderaddress, { align: 'left' })
                .text('  ')
            doc.font('Times-Roman', 50)
                .fontSize(12)
                .text('   * Phone: ' + info.orderphone)
                .text('  ')
        })
    })

    doc.font('Times-Roman', 18)
        .fontSize(16)
        .text('Items List' + '', { align: 'left' });

    doc.font('Times-Roman', 18)
        .fontSize(16)
        .text('', { align: 'left' });
    doc.font('Times-Roman', 18)
        .fontSize(16)
        .text('---------------------------------------------------------------------------------------', { align: 'center' });

    await OrderDetails.getPrintOrderDetailsByOrderId(id).then(odetails => {

        odetails.forEach(data => {
            doc.font('Times-Roman', 180)
                .fontSize(12)
                .text('   * ' + data.name + '        $' + data.price + ' x ' + data.quantity, { align: "left" })
                .text('  ', { align: "left" })
        })
    });



    doc.font('Times-Roman', 18)
        .fontSize(16)
        .text('', { align: 'left' });
    doc.font('Times-Roman', 18)
        .fontSize(16)
        .text('---------------------------------------------------------------------------------------', { align: 'center' });
    await order.getOrderById().then(od => {
        od.forEach(info => {
            doc.font('Times-Roman', 18)
                .fontSize(16)
                .text('Total: $' + info.total, { align: 'left' })
                .text('  ')
        })
    })

    doc.font('Times-Roman', 18)
        .fontSize(12)
        .text(' ')
        .text('Receiver signature ', { align: "right" })
        .text('............/......./....... ', { align: "right" })
        
    doc.pipe(res);
    doc.end();

}
