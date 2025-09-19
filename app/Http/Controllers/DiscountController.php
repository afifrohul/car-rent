<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $discounts = Discount::latest()->get();
            return Inertia::render('Discount/Index', compact('discounts'));
        } catch (\Exception $e) {
            Log::error('Error loading discounts: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load discounts.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Discount/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:discounts,code',
            'discount_type' => 'required|string|in:percentage',
            'discount_value' => 'required|numeric|min:0',
            'desc' => 'required|string',
            'min_transaction' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date'   => 'required|date|after_or_equal:start_date',
            'is_active' => 'required',
        ]);

        try {
            Discount::create($validated);
            return redirect()->route('discounts.index')->with('success', 'Discount created successfully.');
        } catch (\Exception $e) {
            Log::error('Error creating discount: ' . $e->getMessage());
            return redirect()->back()->withInput()->with('error', 'Failed to create discount.');
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

            $discount = Discount::findOrFail($id);
            return Inertia::render('Discount/Edit', compact('discount'));
        } catch (\Exception $e) {
            Log::error('Error loading discount for edit: ' . $e->getMessage());
            return redirect()->route('discounts.index')->with('error', 'Discount not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:discounts,code',
            'discount_type' => 'required|string|in:percentage',
            'discount_value' => 'required|numeric|min:0',
            'desc' => 'required|string',
            'min_transaction' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date'   => 'required|date|after_or_equal:start_date',
            'is_active' => 'required',
        ]);

        try {

            $discount = Discount::findOrFail($id);
            $discount->update($validated);

            return redirect()->route('discounts.index')->with('success', 'Discount updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating discount: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update discount.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $discount = Discount::findOrFail($id);
            $discount->delete();

            return redirect()->route('discounts.index')->with('success', 'Discount deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting discount: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete discount.');
        }
    }
}
