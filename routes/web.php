<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Models\Book;

Route::inertia('/', 'Home', [
    'books' => Book::all(),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
});

require __DIR__ . '/settings.php';
