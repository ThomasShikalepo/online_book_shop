<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'description',
        'category',
        'treding',
        'cover_image',
        'old_price',
        'new_price',
        'quantity',
        'stock',
    ];

    public function cartItems() {
        return $this->hasMany(CartItem::class);
    }

    public function wishlists() {
        return $this->hasMany(Wishlist::class);
    }
}
