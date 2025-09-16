<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
    
            $users = User::where('id', '!=', auth()->user()->id)->get();
    
            return Inertia::render('Dashboard', compact('users'));
        } catch (\Exception $e) {
            Log::error('Error showing dashboard: ' . $e->getMessage());
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        try {
            return Inertia::render('User/Create');
        } catch (\Exception $e) {
            Log::error('Error showing create form: ' . $e->getMessage());
            return redirect()->route('dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:36',
            'email' => 'required|string|max:36',
            'password' => 'required|string|max:36',
        ]);

        try {

            $user = new User();
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->password = Hash::make($data['password']);
            $user->save();

            return redirect()->route('dashboard')->with('success', 'User created!');
        } catch (\Exception $e) {
            Log::error('Error creating task: ' . $e->getMessage());
            return redirect()->route('dashboard')->withInput()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        try {
            $user = User::findOrFail($id);

            return Inertia::render('User/Edit', [
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            Log::error("Error loading edit form for user $id: " . $e->getMessage());
            return redirect()->route('dashboard')->with('error', $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $data = $request->validate([
            'name' => 'required|string|max:36',
            'email' => 'required|string|max:36',
            'password' => 'max:36'
        ]);

        try {
            $user = User::findOrFail($id);
            $user->name = $data['name'];
            $user->email = $data['email'];

            if ($data['password'] != null ) {
                $user->password = Hash::make($data['password']);
            }

            $user->save();

            return redirect()->route('dashboard')->with('success', 'User updated successfully');
        } catch (\Exception $e) {
            Log::error("Error updating user $id: " . $e->getMessage());
            return redirect()->back()->withInput()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();            

            return redirect()->route('dashboard')->with('success', 'User deleted!');
        } catch (\Exception $e) {
            Log::error("Error deleting user $id: " . $e->getMessage());
            return redirect()->route('dashboard')->with('error', $e->getMessage());
        }
    }
}
