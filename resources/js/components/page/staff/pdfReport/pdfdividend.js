import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as moment from 'moment'
import THBText from 'thai-baht-text'

var commaNumber = require('comma-number')

async function pdfMaker(dataForReport, total) {

    console.log('dataForReport', dataForReport)
    console.log('total', total)

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


    let date = moment().date();
    let month = moment().month();
    let year = moment().year();
    let monthName = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤษจิกายน', 'ธันวาคม']

    let yearEd = ''

    if ((moment().month() + 1) >= 5) {
        yearEd = (moment().year()) + 543;
    } else {
        yearEd = (moment().year() - 1) + 543;
    }

    let content = []
    let text_top, text_buttom, column
    let price_tb, price_tb_2, table_bill




    text_top = [{ text: 'รายงานสรุปยอดเงินปันผลสมาชิก ประจำปีปันผล ' + parseInt(yearEd), fontSize: 18, alignment: 'center', bold: true, margin: [0, 6], }]
    text_buttom = [{ text: 'พิมพ์วันที่ : ' + date + ' ' + monthName[month] + ' ' + (year + 543), fontSize: 15, }]

    content = [text_top, text_buttom]
    for (let j = 0; j < dataForReport.length; j++) {
        price_tb = [{
                text: 'ลำดับ',
                fontSize: 15,
                bold: true,
                alignment: 'center'
            },
            {
                text: 'รหัสสมาชิก',
                fontSize: 15,
                bold: true,
                alignment: 'center'
            },
            {
                text: 'ชื่อ-สกุล',
                fontSize: 15,
                bold: true,
                alignment: 'center'
            },
            {
                text: 'จำนวนหุ้น',
                fontSize: 15,
                bold: true,
                alignment: 'center'
            },
            {
                text: 'ยอดซื้อ',
                fontSize: 15,
                bold: true,
                alignment: 'center'
            },
            {
                text: 'ปันหุ้น',
                fontSize: 15,
                bold: true,
                alignment: 'center'
            },
            {
                text: 'เฉลี่ยคืน',
                fontSize: 15,
                bold: true,
                alignment: 'center'
            },
            {
                text: 'เงินปันผล',
                fontSize: 15,
                bold: true,
                alignment: 'center'
            }
        ]
        let index_of_P = j
        let name_title = { text: dataForReport[j].name, fontSize: 15, }
        let items_number = ' '
        let order_code = ' '
        let order_name = ' '
        let order_count = ' '
        let order_total = ' '
        let order_calUnit = ' '
        let order_calTotal = ' '
        let order_sum = ' '
        let calSum = 0
        let nametitle = ''
        for (let index = 0; index < dataForReport[j].data.length; index++) {
            const element = dataForReport[j].data[index];
            if (element.sex == "ชาย") {
                nametitle = 'เด็กชาย'
            } else {
                nametitle = 'เด็กหญิง'
            }
            items_number = items_number + (index + 1) + ' \n '
            order_code = order_code + element.code + ' \n '
            order_name = order_name + (nametitle + element.firstname + ' ' + element.lastname) + ' \n '
            order_count = order_count + element.unit + ' \n '
            order_total = order_total + element.total + ' \n '
            order_calUnit = order_calUnit + Math.round(element.unit * 10 * 0.1) + ' \n '
            order_calTotal = order_calTotal + Math.round(element.total * 0.02) + ' \n '
            order_sum = order_sum + (Math.round(element.unit * 10 * 0.1) + Math.round(element.total * 0.02)) + ' \n '
            calSum = calSum + (Math.round(element.unit * 10 * 0.1) + Math.round(element.total * 0.02))
        }
        price_tb_2 = [{
                text: items_number,
                alignment: 'center',
                fontSize: 15,
            },
            {
                text: order_code,
                alignment: 'center',
                fontSize: 15,
            },
            {
                text: order_name,
                alignment: 'left',
                fontSize: 15,
            },
            {
                text: commaNumber(order_count),
                alignment: 'right',
                fontSize: 15,
            },
            {
                text: commaNumber(order_total),
                alignment: 'right',
                fontSize: 15,
            },
            {
                text: commaNumber(order_calUnit),
                alignment: 'right',
                fontSize: 15,
            },
            {
                text: commaNumber(order_calTotal),
                alignment: 'right',
                fontSize: 15,
            },
            {
                text: commaNumber(order_sum),
                alignment: 'right',
                fontSize: 15,
            }
        ]
        console.log('index_of_P', index_of_P)
        table_bill = {
            style: 'bill',
            table: {
                widths: [32, 50, '*', 50, 50, 50, 50, 50],
                body: [
                    price_tb,
                    price_tb_2, [
                        { text: ['(ตัวอักษร)', { text: ' รวมเงิน ', bold: true }, THBText(calSum)], colSpan: 7, alignment: 'left', margin: [0, 5], fontSize: 15 },
                        '',
                        '',
                        '',
                        '',
                        '',
                        '',
                        { text: commaNumber(calSum), alignment: 'right', margin: [0, 5], fontSize: 15 },
                    ]
                ]
            },
            margin: [0, 8],
            pageBreak: "after"
        }

        let col = [name_title, table_bill, {
            text: '\n',
        }]

        let col2 = [col]

        content.push({
            columns: col2,
            columnGap: 10,
        })

    }

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