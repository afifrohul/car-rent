<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Brand;
use App\Models\City;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $cars = Car::with(['user', 'brand', 'type', 'city'])->latest()->get();
            return Inertia::render('Car/Index', compact('cars'));
        } catch (\Exception $e) {
            Log::error('Error loading cars: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to load cars.');
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $brands = Brand::get();
        $types = Type::get();
        $cities = City::get();

        return Inertia::render('Car/Create', compact('brands', 'types', 'cities'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand_id' => 'required|exists:brands,id',
            'type_id' => 'required|exists:types,id',
            'city_id' => 'required|exists:cities,id',
            'desc' => 'required|string',
            'total_seat' => 'required|integer|min:1',
            'gear_system' => 'required|string|in:Manual,Auto',
            'fuel_type' => 'required|string|in:Petrol,Diesel,Electric,Hybrid',
            'engine_hp' => 'required|integer|min:1',
            'color' => 'required|string|max:100',
            'car_number' => 'required|string|max:100',
            'rental_price' => 'required|numeric|min:0',
        ]);
        
        try {

            $validated['user_id'] = auth()->id();
            Car::create($validated);

            return redirect()->route('cars.index')->with('success', 'Car created successfully.');
        } catch (\Exception $e) {
            Log::error('Error storing car: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to create car.');
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

            $brands = Brand::get();
            $types = Type::get();
            $cities = City::get();
            
            $car = Car::findOrFail($id);
            return Inertia::render('Car/Edit', compact('car', 'brands', 'types', 'cities'));
        } catch (\Exception $e) {
            Log::error('Error loading car for edit: ' . $e->getMessage());
            return redirect()->route('cars.index')->with('error', 'Car not found.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand_id' => 'required|exists:brands,id',
            'type_id' => 'required|exists:types,id',
            'city_id' => 'required|exists:cities,id',
            'desc' => 'required|string',
            'total_seat' => 'required|integer|min:1',
            'gear_system' => 'required|string|in:Manual,Auto',
            'fuel_type' => 'required|string|in:Petrol,Diesel,Electric,Hybrid',
            'engine_hp' => 'required|integer|min:1',
            'color' => 'required|string|max:100',
            'car_number' => 'required|string|max:100',
            'rental_price' => 'required|numeric|min:0',
        ]);

        try {

            $car = Car::findOrFail($id);
            $car->update($validated);

            return redirect()->route('cars.index')->with('success', 'Car updated successfully.');
        } catch (\Exception $e) {
            Log::error('Error updating car: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update car.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $car = Car::findOrFail($id);
            $car->delete();

            return redirect()->route('cars.index')->with('success', 'Car deleted successfully.');
        } catch (\Exception $e) {
            Log::error('Error deleting car: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete car.');
        }
    }
}
