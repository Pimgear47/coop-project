@extends('layouts.guest')
@section('content')
<v-app id="inspire">
    <v-layout class="justify-center">
        <v-flex xs9 sm5>
            <v-card>
                <v-card-title><h1>{{ __('Register') }}</h1></v-card-title>
                <v-card-text>
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
                        <div class="form-group row">
                            <label for="firstname" class="col-md-4 col-form-label text-md-right">{{ __('ชื่อ') }}</label>
                            <div class="col-md-6">
                                <v-text-field label="ชื่อ" id="firstname" type="text" class="form-control{{ $errors->has('firstname') ? ' is-invalid' : '' }}" name="firstname" value="{{ old('firstname') }}" required autocomplete="firstname" autofocus>
                                @if ($errors->has('firstname'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('firstname') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="lastname" class="col-md-4 col-form-label text-md-right">{{ __('นามสกุล') }}</label>
                            <div class="col-md-6">
                                <v-text-field label="นามสกุล" id="lastname" type="text" class="form-control{{ $errors->has('lastname') ? ' is-invalid' : '' }}" name="lastname" value="{{ old('lastname') }}" required autocomplete="lastname" autofocus>
                                @if ($errors->has('lastname'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('lastname') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="email" class="col-md-4 col-form-label text-md-right">{{ __('อีเมล์') }}</label>

                            <div class="col-md-6">
                                <v-text-field label="example@gmail.com" id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autocomplete="email">
                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('รหัสผ่าน') }}</label>
                            <div class="col-md-6">
                                <v-text-field label="รหัสผ่านอย่างน้อย 8 อักขระ" id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required autocomplete="new-password">
                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('รหัสผ่านอีกครั้ง') }}</label>
                            <div class="col-md-6">
                                <v-text-field label="รหัสผ่านอย่างน้อย 8 อักขระ" id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <v-btn color="success" type="submit">{{ __('Register') }}</v-btn>
                            </div>
                        </div>
                    </form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</v-app>
@endsection
