<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\CartItem;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'book_id' => ['required', 'exists:books,id'],
        ]);

        $book = Book::findOrFail($validated['book_id']);

        $cartItem = CartItem::where('user_id', auth()->user()->id)
            ->where('book_id', $book->id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += 1;
            $cartItem->subtotal = $cartItem->price * $cartItem->quantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'user_id' => auth()->user()->id,
                'book_id' => $book->id,
                'quantity' => 1,
                'price' => $book->new_price,
                'subtotal' => $book->new_price,
            ]);
        }

        return back()->with('success', 'Book added to cart.');
    }

    public function clear()
    {
        CartItem::where('user_id', auth()->user()->id)->delete();
        return back()->with('success', 'Cart cleared successfully.');
    }

    public function update(Request $request, CartItem $cartItem)
    {
        // Ensure user owns this cart item
        if ($cartItem->user_id !== auth()->user()->id) {
            return abort(403);
        }

        $validated = $request->validate([
            'quantity' => ['required', 'integer', 'min:1'],
        ]);

        $cartItem->update(['quantity' => $validated['quantity']]);
        $cartItem->subtotal = $cartItem->price * $cartItem->quantity;
        $cartItem->save();

        return back()->with('success', 'Cart updated successfully.');
    }

    public function destroy(CartItem $cartItem)
    {
        // Ensure user owns this cart item
        if ($cartItem->user_id !== auth()->user()->id) {
            return abort(403);
        }

        $cartItem->delete();

        return back()->with('success', 'Item removed from cart.');
    }
}
