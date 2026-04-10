<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminBookController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Models\Book;

Route::get('/', function (Illuminate\Http\Request $request) {
    $search = $request->query('search');
    $books = Book::when($search, function ($query, $search) {
        return $query->where('title', 'like', "%{$search}%");
    })->get();

    return inertia('Home', [
        'books' => $books,
        'filters' => ['search' => $search]
    ]);
})->name('home');

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

    Route::get('/wishlist', [\App\Http\Controllers\WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('/wishlist', [\App\Http\Controllers\WishlistController::class, 'store'])->name('wishlist.store');
    Route::delete('/wishlist/{id}', [\App\Http\Controllers\WishlistController::class, 'destroy'])->name('wishlist.destroy');

    Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
        // Dashboard
        Route::get('/', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

        
        Route::get('/create', [AdminController::class, 'create'])->name('admin.create');
        Route::post('/store', [AdminController::class, 'store'])->name('admin.store');

        // Books Management
        Route::get('/books', [AdminBookController::class, 'index'])->name('admin.books.index');
        Route::post('/books', [AdminBookController::class, 'store'])->name('admin.books.store');
        Route::post('/books/{book}', [AdminBookController::class, 'update'])->name('admin.books.update');
        Route::delete('/books/{book}', [AdminBookController::class, 'destroy'])->name('admin.books.destroy');

        // Orders Management
        Route::get('/orders', [AdminOrderController::class, 'index'])->name('admin.orders.index');
        Route::post('/orders/{order}/status', [AdminOrderController::class, 'updateStatus'])->name('admin.orders.update-status');

        // Users Management
        Route::get('/users', [AdminUserController::class, 'index'])->name('admin.users.index');

        // Order Item PDF Upload
        Route::post('/order-items/{orderItem}/pdf', [\App\Http\Controllers\Admin\AdminOrderItemPdfController::class, 'upload'])->name('admin.order-items.pdf');
    });


});

require __DIR__ . '/settings.php';
