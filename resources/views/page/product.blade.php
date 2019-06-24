@extends('layouts.app')
@section('content')
<div id="app">
    <product :usernow="{{ Auth::user() }}"></product>
</div>
@endsection
