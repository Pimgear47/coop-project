<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    public function index()
    {
        $users = User::orderBy('firstname', 'asc')->get();
        return response()->json($users);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User();
        $user->firstname = $request->get('firstname');
        $user->lastname = $request->get('lastname');
        $user->code = $request->get('code');
        $user->barcode = $request->get('barcode');
        $user->type = $request->get('type');
        $user->sex = $request->get('sex');
        $user->point = $request->get('point');
        $user->education = $request->get('education');
        $user->unit = $request->get('unit');
        $user->password = bcrypt($request->get('bdate'));
        $user->save();
        return response()->json($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($request->get('total')) {
            $user = User::find($id);
            $user->total = $request->get('total');
            $user->update();
            return response()->json($user);
        } else if ($request->get('email')) {
            $user = User::find($id);
            $user->email = $request->get('email');
            $user->update();
            return response()->json($user);
        } else if ($request->get('barcode')) {
            $user = User::find($id);
            $user->barcode = $request->get('barcode');
            $user->update();
            return response()->json($user);
        } else {
            $user = User::find($id);
            $user->firstname = $request->get('firstname');
            $user->lastname = $request->get('lastname');
            $user->code = $request->get('code');
            $user->type = $request->get('type');
            $user->sex = $request->get('sex');
            $user->point = $request->get('point');
            $user->education = $request->get('education');
            $user->unit = $request->get('unit');
            $user->update();
            return response()->json($user);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
        return response()->json($user);
    }
}
