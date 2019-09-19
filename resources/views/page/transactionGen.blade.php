@extends('layouts.app')
@section('content')
<div id="app">
    @if(auth()->check())
    <transaction-gen :usernow="{{ Auth::user() }}"></transaction-gen>
    @endif
</div>
@endsection
