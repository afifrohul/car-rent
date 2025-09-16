<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $cities = City::latest()->get();
            return Inertia::render('City/Index', compact('cities'));
        } catch (\Exception $e) {
            Log::error('Error loading cities: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load cities.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('City/Create');
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

            City::create($validated);

            return redirect()->route('cities.index')->with('success', 'City created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing city: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create city.');
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
            $city = City::findOrFail($id);
            return Inertia::render('City/Edit', compact('city'));
        } catch (\Exception $e) {
            Log::error('Error loading city for edit: ' . $e->getMessage());
            return redirect()->route('cities.index')->with('error', 'City not found.');
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
            $city = City::findOrFail($id);
            $city->update($validated);

            return redirect()->route('cities.index')->with('success', 'City updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating city: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update city.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $city = City::findOrFail($id);
            $city->delete();

            return redirect()->route('cities.index')->with('success', 'City deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting city: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete city.');
        }
    }
}
