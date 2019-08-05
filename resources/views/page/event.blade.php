@extends('layouts.app')
@section('content')
<div id="app">
    <event :usernow="{{ Auth::user() }}"></event>
</div>
@endsection
