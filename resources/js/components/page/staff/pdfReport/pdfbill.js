import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as moment from 'moment'
import THBText from 'thai-baht-text'

var commaNumber = require('comma-number')

async function pdfMaker(dataUser, dataOrder, dataPrice) {

    console.log('dataUser', dataUser.sex)
    console.log('dataOrder', dataOrder)
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

    let col = []
    let col2 = []
    let content = []
    let text_buttom, text_buttom2, column, column2, logo_header1, logo_header2, name_title
    let price_tb, price_tb2, price_tb_2, price_tb_22, table_bill, table_bill2
    let date = moment().date();
    let month = moment().month();
    let year = moment().year();

    let monthName = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤษจิกายน', 'ธันวาคม']

    if (dataUser.sex == "ชาย") {
        name_title = 'เด็กชาย'
    } else {
        name_title = 'เด็กหญิง'
    }

    price_tb = [{
            text: 'ลำดับที่',
            fontSize: 15,
            bold: true,
            alignment: 'center'
        },
        {
            text: 'รายการ',
            fontSize: 15,
            bold: true,

            alignment: 'center'
        },
        {
            text: 'จำนวนหน่วย',
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
    price_tb2 = [{
            text: 'ลำดับที่',
            fontSize: 15,
            bold: true,

            alignment: 'center'
        },
        {
            text: 'รายการ',
            fontSize: 15,
            bold: true,

            alignment: 'center'
        },
        {
            text: 'จำนวนหน่วย',
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
    let order_name = ' '
    let order_count = ' '
    let order_price = ' '
    let order_sumprice = ' '


    for (let index = 0; index < dataOrder.length; index++) {
        const element = dataOrder[index];
        items_number = items_number + (index + 1) + ' \n '
        order_name = order_name + element.name + ' \n '
        order_count = order_count + element.count + ' \n '
        order_price = order_price + element.price + ' \n '
        order_sumprice = order_sumprice + (element.count * element.price) + ' \n '
    }

    price_tb_2 = [{
            text: items_number,
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
    price_tb_22 = [{
            text: items_number,
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
    text_buttom = [{ text: 'ได้รับเงินจาก ผู้ปกครอง ' + name_title + dataUser.firstname + ' ' + dataUser.lastname + ' ' + dataUser.education + '\n' + ' โรงเรียนอนุบาลเชียงคำ (วัดพระธาตุสบแวน) ต.หย่วน อ.เชียงคำ จ.พะเยา', fontSize: 15, }]
    text_buttom2 = [{ text: 'ได้รับเงินจาก ผู้ปกครอง ' + name_title + dataUser.firstname + ' ' + dataUser.lastname + ' ชั้นประถมศึกษาปีที่ 1/1 \n โรงเรียนอนุบาลเชียงคำ (วัดพระธาตุสบแวน) ต.หย่วน อ.เชียงคำ จ.พะเยา', fontSize: 15, }]
    column = {
        columns: [{
            text: '\n\n\n\n\n..................................................................................................\n(______________________________________________)\nลายมือชื่อผู้รับเงิน',
            alignment: 'center'
        }, ]
    }
    column2 = {
        columns: [{
            text: '\n\n\n\n\n..................................................................................................\n(______________________________________________)\nลายมือชื่อผู้รับเงิน',
            alignment: 'center'
        }, ]
    }
    logo_header1 = {
        style: 'tableExample',
        table: {
            headerRow: 3,
            widths: [85, 135, '*'],
            body: [
                [{
                        rowSpan: 2,
                        image: 'data:image/jpeg;base64,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',
                        width: 80,
                        border: [true, true, false, true],
                        alignment: 'center',
                    },
                    {
                        text: 'สหกรณ์โรงเรียนอนุบาลเชียงคำ\n(วัดพระธาตุสบแวน)',
                        fontSize: 14,
                        alignment: 'center',
                        bold: true,
                        margin: [0, 5],
                        border: [false, true, true, false],
                    },
                    {
                        text: 'ใบเสร็จรับเงิน',
                        fontSize: 16,
                        alignment: 'center',
                        bold: true,
                        margin: [0, 20, 0, 5],
                        border: [true, false, false, false],
                    },
                ],
                [, {
                    text: 'ตำบลหย่วน อำเภอเชียงคำ\nจังหวัดพะเยา 56110',
                    fontSize: 13,
                    alignment: 'center',
                    margin: [0, 5],
                    border: [false, false, true, true],
                }, {
                    text: 'วันที่ ' + date + ' เดือน ' + monthName[month] + ' ปี ' + (year + 543),
                    fontSize: 14,
                    alignment: 'center',
                    margin: [0, 5, 0, 5],
                    border: [true, false, false, false],
                }, ]
            ]
        },
        margin: [0, 10],
    }
    logo_header2 = {
        style: 'tableExample',
        table: {
            headerRow: 3,
            widths: [85, 135, '*'],
            body: [
                [{
                        rowSpan: 2,
                        image: 'data:image/jpeg;base64,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',
                        width: 80,
                        border: [true, true, false, true],
                        alignment: 'center',
                    },
                    {
                        text: 'สหกรณ์โรงเรียนอนุบาลเชียงคำ\n(วัดพระธาตุสบแวน)',
                        fontSize: 14,
                        alignment: 'center',
                        bold: true,
                        margin: [0, 5],
                        border: [false, true, true, false],
                    },
                    {
                        text: 'ใบเสร็จรับเงิน',
                        fontSize: 16,
                        alignment: 'center',
                        bold: true,
                        margin: [0, 20, 0, 5],
                        border: [true, false, false, false],
                    },
                ],
                [, {
                    text: 'ตำบลหย่วน อำเภอเชียงคำ\nจังหวัดพะเยา 56110',
                    fontSize: 13,
                    alignment: 'center',
                    margin: [0, 5],
                    border: [false, false, true, true],
                }, {
                    text: 'วันที่ ' + date + ' เดือน ' + monthName[month] + ' ปี ' + (year + 543),
                    fontSize: 14,
                    alignment: 'center',
                    margin: [0, 5, 0, 5],
                    border: [true, false, false, false],
                }, ]
            ]
        },
        margin: [0, 10],
    }
    table_bill = {
        style: 'bill',
        table: {
            widths: [32, '*', 60, 60, 60],
            heights: ['*', 180, '*'],
            body: [
                price_tb,
                price_tb_2, [
                    { text: ['(ตัวอักษร)', { text: ' รวมเงิน ', bold: true }, THBText(dataPrice)], colSpan: 4, alignment: 'left', margin: [0, 5], fontSize: 15 },
                    '',
                    '',
                    '',
                    { text: commaNumber(dataPrice), alignment: 'right', margin: [0, 5], fontSize: 15 },
                ]
            ]
        },
        margin: [0, 8],
    }
    table_bill2 = {
        style: 'bill',
        table: {
            widths: [32, '*', 60, 60, 60],
            heights: ['*', 180, 25],
            body: [
                price_tb2,
                price_tb_22, [
                    { text: ['(ตัวอักษร)', { text: ' รวมเงิน ', bold: true }, THBText(dataPrice)], colSpan: 4, alignment: 'left', margin: [0, 5], fontSize: 15 },
                    '',
                    '',
                    '',
                    { text: commaNumber(dataPrice), fontSize: 15, alignment: 'right', margin: [0, 5], },
                ]
            ]
        },
        margin: [0, 8],
    }


    col[0] = [logo_header1, text_buttom, table_bill, column, ]
    col[1] = [logo_header2, text_buttom2, table_bill2, column2]
    col2 = [col[0], col[1]]

    content.push({
        columns: col2,
        columnGap: 10
    })
    var doc = {
        content: content,
        defaultStyle: {
            font: 'THSarabunNew'
        },
        pageSize: 'A4',
        pageOrientation: 'landscape',
        pageMargins: [10, 10, 10, 10],
    }
    pdfMake.createPdf(doc).open()
}

const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sortBuild(data, x) {
    let temp = []
    data.forEach(element => {
        if (element.buildingName == x) {
            temp.push(element)
        }
    });
    return temp
}


export default {
    pdfMaker,
    numberWithCommas
}