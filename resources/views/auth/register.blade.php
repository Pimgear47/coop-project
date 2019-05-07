@extends('layouts.guest')
@section('content')
<v-app id="inspire" style="
    background: #ff6b6b;">
    <v-layout class="justify-center" height="722px">
        <v-flex d-flex xs9 sm8>
            <v-card tile flat height="722px">
                <v-card-title p-5>
                    <img src="https://data.bopp-obec.info/emis/pic_school/1056320084.jpg" alt="" width="8%">
                    &nbsp &nbsp<h2>ระบบสหกรณ์ร้านค้า<br>โรงเรียนอนุบาลเชียงคำ (วัดพระธาตุสบแวน)</h2>
                </v-card-title>
                <v-card-text>
                    <h2 class="txt-thS">สมัครสมาชิก</h2>
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
                        <v-layout row wrap>
                            <v-flex sm5>
                                <v-text-field label="ชื่อ" id="firstname" type="text"
                                    class="{{ $errors->has('firstname') ? ' is-invalid' : '' }}" name="firstname"
                                    value="{{ old('firstname') }}" required autocomplete="firstname" autofocus>
                                    @if ($errors->has('firstname'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('firstname') }}</strong>
                                    </span>
                                    @endif
                            </v-flex>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                            <v-flex sm6>
                                <v-text-field label="นามสกุล" id="lastname" type="text"
                                    class="{{ $errors->has('lastname') ? ' is-invalid' : '' }}" name="lastname"
                                    value="{{ old('lastname') }}" required autocomplete="lastname" autofocus>
                                    @if ($errors->has('lastname'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('lastname') }}</strong>
                                    </span>
                                    @endif
                            </v-flex><br><br>
                        </v-layout>
                        <div class="form-group">
                            <select onchange="select_type(this);" name="type" class="form-control"
                                id="exampleFormControlSelect1">
                                <option value="" disabled selected>เลือกสถานะ</option>
                                <option value="student">นักเรียน</option>
                                <option value="teacher">ครู/บุคลากร</option>
                            </select>
                        </div>

                        <div id="ifStudent" style="display: none; height: 100%;">
                            <v-layout row wrap>
                                <v-flex sm5>
                                    <v-text-field label="ชั้น" type="text" name="level" />
                                </v-flex>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                                <v-flex sm6>
                                    <v-text-field label="ห้อง" type="text" name="room" />
                                </v-flex>
                            </v-layout>
                        </div>


                        <div class="col-md-6">
                            <v-text-field label="จำนวนหุ้นที่ต้องการสมัคร" id="unit" type="text" name="unit" required
                                autocomplete="unit">
                        </div>

                        <div class="col-md-6">
                            <v-text-field label="อีเมล์" id="email" type="email"
                                class="{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email"
                                value="{{ old('email') }}" required autocomplete="email">
                                @if ($errors->has('email'))
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $errors->first('email') }}</strong>
                                </span>
                                @endif
                        </div>
                        <div class="col-md-6">
                            <v-text-field label="รหัสผ่านอย่างน้อย 8 อักขระ" id="password" type="password"
                                class="{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required
                                autocomplete="new-password">
                                @if ($errors->has('password'))
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $errors->first('password') }}</strong>
                                </span>
                                @endif
                        </div>
                        <div class="col-md-6">
                            <v-text-field label="รหัสผ่านอีกครั้ง" id="password-confirm" type="password"
                                name="password_confirmation" required autocomplete="new-password">
                        </div>
                        <v-layout class="justify-end">
                            <v-btn color="success" type="submit">{{ __('สมัครสมาชิก') }}</v-btn>
                            <v-btn color="error" href="/">{{ __('ยกเลิก') }}</v-btn>
                        </v-layout>
                    </form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
    <script>
    function select_type(that) {
        document.getElementById("ifStudent").style.display = "none";
        switch (that.value) {
            case "student":
                document.getElementById("ifStudent").style.display = "block";
                break;
            default:
                document.getElementById("ifSelectNothing").style.display = "none";
                break;
        }
    }
    </script>
</v-app>
@endsection