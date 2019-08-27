<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width"/>

    <!-- For development, pass document through inliner -->
    <link rel="stylesheet" href="css/simple.css">

    <style type="text/css">
    /* Your custom styles go here */
    </style>
</head>
<body>
<table class="body-wrap">
    <tr>
        <td class="container">

            <!-- Message start -->
            <table>
                <tr>
                    <td align="center" class="masthead">

                        <h1>มีกำหนดการใหม่</h1>

                    </td>
                </tr>
                <tr>
                    <td class="content">

                        <h2>สวัสดี {{$data['name']}}</h2>

                        <p>ขณะนี้มีกำหนดการใหม่ถูกเพิ่มโดยเจ้าหน้าที่ของเรา เราจึงได้ทำการส่งอีเมล์แจ้งเตือนนี้สำหรับแจ้งข่าวสารให้กับท่าน</p>

                        <p>กำหนดการใหม่ : <b>{{$data['event_title']}}</b> </p>
                        <p>ดูรายละเอียดเพิ่มเติมได้ที่... <a href="http://baconipsum.com">Events</a></p>

                        <p><em>– สหกรณ์โรงเรียนอนุบาลเชียงคำ</em></p>


                    </td>
                </tr>
            </table>

        </td>
    </tr>
    <tr>
        <td class="container">
            <!-- Message start -->
            <table>
                <tr>
                    <td class="content footer" align="center">
                        <p>Sent by Anubanchiangkham's coop, 248/1 Thanon Pisarn, Tambon Yuan, Amphoe Chiang Kham, Chang Wat Phayao 56110</p>
                        <p><a href="mailto:">coop.anubanck@gmail.com</a></p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
