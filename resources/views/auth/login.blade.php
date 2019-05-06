@extends('layouts.guest')
@section('content')
<v-app id="inspire" style="
    background: #FFFFFF;">
    <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md8>
            <carousel></carousel>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
            <v-layout class="justify-center">
                <v-flex xs9 sm10 mt-5>
                    <v-card tile flat height="100%">
                        <v-card-title>
                            <img src="https://data.bopp-obec.info/emis/pic_school/1056320084.jpg" alt="" width="20%">
                            &nbsp &nbsp<h2 class="txt-thS">ระบบสหกรณ์ร้านค้า<br/>
                            โรงเรียนอนุบาลเชียงคำ (วัดพระธาตุสบแวน)</h2>
                        </v-card-title>
                        <v-card-text>
                            <form method="POST" action="{{ route('login') }}">
                                @csrf
                                <div class="form-group row">
                                    <h3 for="email"
                                        class="col-md-4 col-form-label txt-thS">{{ __('E-Mail Address') }}</h3>
                                    <div class="col-md-6">
                                        <v-text-field id="email" type="email"
                                            class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}"
                                            name="email" value="{{ old('email') }}" required autocomplete="email"
                                            autofocus>

                                            @if ($errors->has('email'))
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                            @endif
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <h3 for="password"
                                        class="col-md-4 col-form-label txt-thS">{{ __('Password') }}</h3>
                                    <div class="col-md-6">
                                        <v-text-field id="password" type="password"
                                            class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}"
                                            name="password" required autocomplete="current-password">

                                            @if ($errors->has('password'))
                                            <span class="invalid-feedback" role="alert">
                                                <strong>{{ $errors->first('password') }}</strong>
                                            </span>
                                            @endif
                                    </div>
                                </div>

                                <div class="form-group row">
                                    <div class="col-md-6 offset-md-4">
                                        <div class="form-check">
                                            <v-checkbox name="remember" id="remember" label="Remember me?"
                                                {{ old('remember') ? 'checked' : '' }}></v-checkbox>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row mb-0">
                                    <div class="col-md-8 offset-md-4">
                                        <v-btn type="submit" color="success">{{ __('Login') }}</v-btn>

                                        @if (Route::has('password.request'))
                                        <a class="btn btn-link" href="{{ route('password.request') }}">
                                            {{ __('Forgot Your Password?') }}
                                        </a>
                                        @endif
                                    </div>
                                </div>
                            </form>
                            </div>
                        </v-card-text>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
    </v-layout>
</v-app>
@endsection