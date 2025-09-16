<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $brands = Brand::latest()->get();
            return Inertia::render('Brand/Index', compact('brands'));
        } catch (\Exception $e) {
            Log::error('Error loading brands: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load brands.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Brand/Create');
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

            Brand::create($validated);

            return redirect()->route('brands.index')->with('success', 'Car brand created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing car brand: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create car brand.');
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
            $brand = Brand::findOrFail($id);
            return Inertia::render('Brand/Edit', compact('brand'));
        } catch (\Exception $e) {
            Log::error('Error loading car brand for edit: ' . $e->getMessage());
            return redirect()->route('brands.index')->with('error', 'Car brand not found.');
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
            $brand = Brand::findOrFail($id);
            $brand->update($validated);

            return redirect()->route('brands.index')->with('success', 'Car brand updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating car brand: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update car brand.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $brand = Brand::findOrFail($id);
            $brand->delete();

            return redirect()->route('brands.index')->with('success', 'Car brand deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting brand: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete car brand.');
        }
    }
}
