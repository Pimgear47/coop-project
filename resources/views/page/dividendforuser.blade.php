@extends('layouts.app')
@section('content')
<div id="app">
    @if(auth()->check())
        <dividend-for-user :usernow="{{ Auth::user() }}"></dividend-for-user>
    @endif
</div>
@endsection
