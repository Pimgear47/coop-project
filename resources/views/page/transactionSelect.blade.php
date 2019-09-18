@extends('layouts.app')
@section('content')
<div id="app">
    @if(auth()->check())
    <transaction-select :usernow="{{ Auth::user() }}"></transaction-select>
    @endif
</div>
@endsection