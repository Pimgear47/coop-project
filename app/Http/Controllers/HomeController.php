<?php

namespace App\Http\Controllers;
use Mail; 

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function sendMail()
    {
        $data['title'] = "Test it from HDTutu.com";
        Mail::send('emails.email', $data, function ($message) {
            $message->to('kunjanaphorn_boonmak@cmu.ac.th', 'กัญจนพร บุญมาก')
                    ->subject('HDTuto.com Mail');
        });
        dd("Mail Sent successfully");
    }
}