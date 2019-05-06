<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/index.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app">
        <v-toolbar color="pink accent-3" dark permanent fixed>
            <v-toolbar-title class="txt-title action-container"><img src="/images/elements/logo.png"
                    height="60">ระบบสหกรณ์ร้านค้า</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                @guest
                <v-btn class="txt-title" href="/login" flat>LOGIN</v-btn>
                @if (Route::has('register'))
                <v-btn class="txt-title" href="/register" flat>REGISTER</v-btn>
                @endif
                @else
                <v-btn class="txt-title" href="#" flat>{{ Auth::user()->firstname }}&nbsp{{ Auth::user()->lastname }}</v-btn>
                <v-btn class="txt-title" flat href="{{ route('logout') }}" onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();">
                    LOGOUT
                </v-btn>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
                @endguest
            </v-toolbar-items>
            <v-menu class="hidden-md-and-up">
                <v-toolbar-side-icon slot="activator"></v-toolbar-side-icon>
                <v-list>
                    <v-list-tile>
                        <v-list-tile-content>
                            @guest
                            <v-list-tile-content>
                                <v-list-tile href="/login">LOGIN</v-list-tile>
                            </v-list-tile-content>
                            @if (Route::has('register'))
                            <v-list-tile-content>
                                <v-list-tile href="/register">REGISTER</v-list-tile>
                            </v-list-tile-content>
                            @endif
                            @else
                            <v-list-tile-title class="txt-title" href="#">{{ Auth::user()->firstname }}&nbsp{{ Auth::user()->lastname }}</v-list-tile-title>
                            <v-list-tile-title class="txt-title" href="{{ route('logout') }}" onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();">
                                LOGOUT
                            </v-list-tile-title>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                @csrf
                            </form>
                            @endguest
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        <navbar :usernow="{{ Auth::user()}}"></navbar>
            @yield('content')
    </div>
</body>

</html>