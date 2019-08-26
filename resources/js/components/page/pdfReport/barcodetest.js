import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import * as moment from 'moment'
var JsBarcode = require('jsbarcode')


async function pdfMaker(productsFil) {

    console.log('productsFil', productsFil)

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

    let content = []
    let text_buttom
    let table_product
    let type = ""
    text_buttom = [{ text: 'พิมพ์วันที่ : ' + date + ' ' + monthName[month] + ' ' + (year + 543), fontSize: 15, alignment: 'right' }]

    content = [text_buttom]

    for (let j = 0; j < productsFil.length; j++) {
        if (productsFil[j].type == 'stationary') {
            type = 'อุปกรณ์เครื่องเขียน'
        } else if (productsFil[j].type == 'food') {
            type = 'อาหาร/เครื่องดื่ม'
        } else {
            type = 'เสื้อผ้า/เครื่องแต่งกาย/ชุดเครื่องนอน'
        }
        let name_title = { text: type, fontSize: 15, }
        let col = [name_title]
        let array_name = []
        let array_pic = []
        let array_price = []
        let array_barcode = []

        for (let index = 0; index < productsFil[j].data.length; index++) {
            array_name.push({ text: productsFil[j].data[index].name, fontSize: 15, alignment: 'center' })
            array_pic.push({
                image: productsFil[j].data[index].image,
                width: 100,
                height: 100,
                alignment: 'center',
            })
            array_price.push({
                text: 'ราคา ' + productsFil[j].data[index].price + ' บาท',
                alignment: 'center',
                fontSize: 15,
            })
            array_barcode.push({
                image: textToBase64Barcode(productsFil[j].data[index].product_code),
                alignment: 'center',
                width: 160,
            })
        }
        table_product = {
            table: {
                body: [
                    [...array_name],
                    [...array_pic],
                    [...array_price],
                    [...array_barcode]
                ],

            },
        }
        col.push(table_product)
        let col2 = [col]
        content.push({
            columns: col2,
            columnGap: 15,
            pageBreak: "after"
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


function textToBase64Barcode(text) {
    var canvas = document.createElement("canvas");
    JsBarcode(canvas, text, { format: "CODE39", displayValue: false });
    return canvas.toDataURL("image/png");
}

export default {
    pdfMaker,
}