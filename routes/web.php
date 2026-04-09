<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;
use App\Models\Book;

Route::inertia('/', 'Home', [
    'books' => Book::all(),
])->name('home');

Route::get('/dashboard', function () {
    if (Auth::check()) {
        if (Auth::user()->user_type === 'Admin') {
            return redirect('/admin');
        }
        return redirect('/');
    }
    return redirect('/');
})->name('dashboard');



Route::middleware(['auth'])->group(function () {
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::get('/cart', function () {
        $cartItems = Auth::user()
        ->cartItems()
        ->with('book')
        ->get();
        
        return inertia('Books/CartPage', [
            'cartItems' => $cartItems
        ]);
    })->name('cart');
    Route::delete('/cart', [CartController::class, 'clear'])->name('cart.clear');
    Route::patch('/cart/{cartItem}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{cartItem}', [CartController::class, 'destroy'])->name('cart.destroy');

    Route::get('/checkout', function () {
        $cartItems = Auth::user()
            ->cartItems()
            ->with('book')
            ->get();

        return inertia('Books/CheckoutPage', [
            'cartItems' => $cartItems,
        ]);
    })->name('checkout');

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/admin', [AdminController::class, 'index']);
        Route::get('/admin/create', [AdminController::class, 'create']);
        Route::post('/admin/store', [AdminController::class, 'store']);
    });


});

require __DIR__ . '/settings.php';
