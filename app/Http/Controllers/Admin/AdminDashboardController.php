<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Book;
use App\Models\Order;
use App\Models\OrderItem;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $totalUsers = User::where('user_type', '!=', 'Admin')->count();
        $totalBooks = Book::count();
        $totalOrders = Order::count();
        $totalSales = Order::where('status', 'completed')->sum('total_price');

        // Optional: Get recent orders
        $recentOrders = Order::with('user')->orderBy('created_at', 'desc')->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'metrics' => [
                'totalUsers' => $totalUsers,
                'totalBooks' => $totalBooks,
                'totalOrders' => $totalOrders,
                'totalSales' => $totalSales,
            ],
            'recentOrders' => $recentOrders,
        ]);
    }
}
