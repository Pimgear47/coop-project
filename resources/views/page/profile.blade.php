@extends('layouts.app')
@section('content')
<div id="app">
    <profile :usernow="{{ Auth::user() }}"></profile>
</div>
@endsection
