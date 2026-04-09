<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Admin/Dashboard', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/CreateAdmin');
    }

    public function store(Request $request)
    {
        // Validate and store the new admin user
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
            'user_type' => 'Admin',
        ]);

        return redirect('/admin')->with('success', 'Admin created successfully');
    
    }
}
