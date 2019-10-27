@extends('layouts.app')
@section('content')
<div id="app">
    @if(auth()->check() && (auth::user()->type == 'staff'))
    <main-menu :usernow="{{ Auth::user() }}"></main-menu>
    @else
    <report-user :usernow="{{ Auth::user() }}"></report-user>
    @endif
</div>
@endsection
