<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlists = Auth::user()->wishlists()->with('book')->get();
        return inertia('Books/WishlistPage', [
            'wishlistItems' => $wishlists
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['book_id' => 'required|exists:books,id']);

        $exists = Wishlist::where('user_id', Auth::id())->where('book_id', $request->book_id)->exists();

        if (!$exists) {
            Wishlist::create([
                'user_id' => Auth::id(),
                'book_id' => $request->book_id,
            ]);
            return redirect()->back()->with('success', 'Added to wishlist');
        }

        return redirect()->back()->with('success', 'Already in wishlist');
    }

    public function destroy($id)
    {
        Wishlist::where('user_id', Auth::id())->where('id', $id)->delete();
        return redirect()->back()->with('success', 'Removed from wishlist');
    }
}
