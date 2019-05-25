<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'price', 'type','image','product_code'
    ];

    public function Transaction(){
        return $this->hasMany(Transaction::class,'idproduct');
    }
}
