@extends('layouts.app')
@section('content')
<div id="app">
    @if(auth()->check() && (auth::user()->type == 'staff'))
    <transaction :usernow="{{ Auth::user() }}"></transaction>
    @else
    <report-user :usernow="{{ Auth::user() }}"></report-user>
    @endif
</div>
@endsection
