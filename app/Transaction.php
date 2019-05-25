<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'idproduct', 'iduser', 'idstaff'
    ];

    public function Product(){
        return $this->belongsTo(Product::class,'idproduct');
    }

    public function User(){
        return $this->belongsTo(User::class,'idstaff');
    }

}
