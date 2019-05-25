@extends('layouts.app')
@section('content')
<div id="app">
    @if(auth()->check())
        <report-user :usernow="{{ Auth::user() }}"></report-user>
    @endif
</div>
@endsection
