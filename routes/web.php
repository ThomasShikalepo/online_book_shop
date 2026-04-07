<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CartController;
use App\Models\Book;

Route::inertia('/', 'Home', [
    'books' => Book::all(),
])->name('home');



Route::middleware(['auth'])->group(function () {
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
});

Route::get('/cart', function () {
    $cartItems = Auth::user()
    ->cartItems()
    ->with('book')
    ->get();
    
    return inertia('Books/CartPage', [
        'cartItems' => $cartItems
    ]);
})->name('cart');

require __DIR__ . '/settings.php';
