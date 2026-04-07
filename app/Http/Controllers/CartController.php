<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => ['required', 'exists:books,id'],
        ]);

        $cartItem = CartItem::where('user_id', auth()->user()->id)
            ->where('book_id', $validated['book_id'])
            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', 1);
        } else {
            CartItem::create([
                'user_id' => auth()->user()->id,
                'book_id' => $validated['book_id'],
                'quantity' => 1,
            ]);
        }

        return back()->with('success', 'Book added to cart.');
    }
}
