<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Book;
use App\Models\Order;
use App\Models\User;

class OrderItem extends Model
{
    protected $fillable = [
        'user_id',
        'order_id',
        'book_id',
        'quantity',
        'price',
        'subtotal',
        'total',
        'pdf_path',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
