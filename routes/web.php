<?php

use Illuminate\Support\Facades\Route;
use App\Models\Book;

Route::inertia('/', 'Home', [
    'books' => Book::all(),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
