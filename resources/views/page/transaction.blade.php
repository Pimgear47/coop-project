@extends('layouts.app')
@section('content')
<div id="app">
    @if(auth()->check())
    <transaction :usernow="{{ Auth::user() }}"></transaction>
    @endif
</div>
@endsection
