<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $types = Type::latest()->get();
            return Inertia::render('Type/Index', compact('types'));
        } catch (\Exception $e) {
            Log::error('Error loading types: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load types.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Type/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        
        try {

            Type::create($validated);

            return redirect()->route('types.index')->with('success', 'Car type created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing car type: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create car type.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        try {
            $type = Type::findOrFail($id);
            return Inertia::render('Type/Edit', compact('type'));
        } catch (\Exception $e) {
            Log::error('Error loading car type for edit: ' . $e->getMessage());
            return redirect()->route('types.index')->with('error', 'Car type not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        try {
            $type = Type::findOrFail($id);
            $type->update($validated);

            return redirect()->route('types.index')->with('success', 'Car type updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating car type: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update car type.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $type = Type::findOrFail($id);
            $type->delete();

            return redirect()->route('types.index')->with('success', 'Car type deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting car type: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete car type.');
        }
    }
}
