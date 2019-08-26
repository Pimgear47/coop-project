import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as moment from 'moment'
import THBText from 'thai-baht-text'

var commaNumber = require('comma-number')

async function pdfMaker(filteredReport, total, dateTime) {

    console.log('filteredReport', dateTime)

    pdfMake.vfs = pdfFonts.pdfMake.vfs
    pdfMake.fonts = {
        THSarabunNew: {
            normal: 'THSarabunNew.ttf',
            bold: 'THSarabunNew Bold.ttf',
            italics: 'THSarabunNew Italic.ttf',
            bolditalics: 'THSarabunNew BoldItalic.ttf'
        },
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-MediumItalic.ttf'
        }
    }

    let content = []
    let text_top, text_buttom, column
    let price_tb, price_tb_2, table_bill
    let date = moment().date();
    let month = moment().month();
    let year = moment().year();
    let monthName = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤษจิกายน', 'ธันวาคม']

    let yearShow = dateTime.substr(0, 4)
    let monthShow = parseInt(dateTime.substr(6, 7))

    text_top = [{ text: 'รายงานยอดขายประจำเดือน' + monthName[monthShow - 1] + ' ' + (parseInt(yearShow) + 543), fontSize: 18, alignment: 'center', bold: true, margin: [0, 6], }]
    price_tb = [{
            text: 'ลำดับที่',
            fontSize: 15,
            bold: true,
            alignment: 'center'
        },
        {
            text: 'รหัสสินค้า',
            fontSize: 15,
            bold: true,
            alignment: 'center'
        },
        {
            text: 'ชื่อสินค้า',
            fontSize: 15,
            bold: true,
            alignment: 'center'
        },
        {
            text: 'จำนวน',
            fontSize: 15,
            bold: true,
            alignment: 'center'
        },
        {
            text: 'ราคาต่อหน่วย',
            fontSize: 15,
            bold: true,
            alignment: 'center'
        },
        {
            text: 'จำนวนเงิน',
            fontSize: 15,
            bold: true,
            alignment: 'center'
        }
    ]

    let items_number = ' '
    let order_code = ' '
    let order_name = ' '
    let order_count = ' '
    let order_price = ' '
    let order_sumprice = ' '

    for (let index = 0; index < filteredReport.length; index++) {
        const element = filteredReport[index];
        items_number = items_number + (index + 1) + ' \n '
        order_code = order_code + element.product.product_code + ' \n '
        order_name = order_name + element.product.name + ' \n '
        order_count = order_count + element.count + ' \n '
        order_price = order_price + element.cost + ' \n '
        order_sumprice = order_sumprice + (element.count * element.cost) + ' \n '
    }

    price_tb_2 = [{
            text: items_number,
            alignment: 'center',
            fontSize: 14,
        },
        {
            text: order_code,
            alignment: 'center',
            fontSize: 14,
        },
        {
            text: order_name,
            alignment: 'left',
            fontSize: 14,
        },
        {
            text: commaNumber(order_count),
            alignment: 'right',
            fontSize: 14,
        },
        {
            text: commaNumber(order_price),
            alignment: 'right',
            fontSize: 14,
        },
        {
            text: commaNumber(order_sumprice),
            alignment: 'right',
            fontSize: 14,
        }
    ]

    text_buttom = [{ text: 'พิมพ์วันที่ : ' + date + ' ' + monthName[month] + ' ' + (year + 543), fontSize: 15, }]
    column = {
        columns: [{
            text: '\n\n\n\n\n..................................................................................................\n(______________________________________________)\nลายมือชื่อผู้รับเงิน',
            alignment: 'center'
        }, ]
    }
    table_bill = {
        style: 'bill',
        table: {
            widths: [32, 80, '*', 60, 60, 60],
            body: [
                price_tb,
                price_tb_2, [
                    { text: ['(ตัวอักษร)', { text: ' รวมเงิน ', bold: true }, THBText(total)], colSpan: 5, alignment: 'left', margin: [0, 5], fontSize: 15 },
                    '',
                    '',
                    '',
                    '',
                    { text: commaNumber(total), alignment: 'right', margin: [0, 5], fontSize: 15 },
                ]
            ]
        },
        margin: [0, 8],
    }

    content = [text_top, text_buttom, table_bill, ]

    var doc = {
        content: content,
        defaultStyle: {
            font: 'THSarabunNew'
        },
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [20, 30, 20, 20],
    }
    pdfMake.createPdf(doc).open()
}


export default {
    pdfMaker,
}