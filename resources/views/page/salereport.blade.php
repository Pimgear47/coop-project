@extends('layouts.app')
@section('content')
<div id="app">
    @if(auth()->check())
        <sale-report :usernow="{{ Auth::user() }}"></sale-report>
    @endif
</div>
@endsection
