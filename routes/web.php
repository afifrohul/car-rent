<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\TypeController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/user/create', [DashboardController::class, 'create'])->name('user.create');
    Route::post('/user/store', [DashboardController::class, 'store'])->name('user.store');
    Route::get('/user/{id}/edit', [DashboardController::class, 'edit'])->name('user.edit');
    Route::put('/user/{id}', [DashboardController::class, 'update'])->name('user.update');
    Route::delete('/user/{id}', [DashboardController::class, 'destroy'])->name('user.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/cities', [CityController::class, 'index'])->name('cities.index');
    Route::get('/cities/create', [CityController::class, 'create'])->name('cities.create');
    Route::post('/cities', [CityController::class, 'store'])->name('cities.store');
    Route::get('/cities/{id}/edit', [CityController::class, 'edit'])->name('cities.edit');
    Route::put('/cities/{id}', [CityController::class, 'update'])->name('cities.update');
    Route::delete('/cities/{id}', [CityController::class, 'destroy'])->name('cities.destroy');

    Route::get('/brands', [BrandController::class, 'index'])->name('brands.index');
    Route::get('/brands/create', [BrandController::class, 'create'])->name('brands.create');
    Route::post('/brands', [BrandController::class, 'store'])->name('brands.store');
    Route::get('/brands/{id}/edit', [BrandController::class, 'edit'])->name('brands.edit');
    Route::put('/brands/{id}', [BrandController::class, 'update'])->name('brands.update');
    Route::delete('/brands/{id}', [BrandController::class, 'destroy'])->name('brands.destroy');

    Route::get('/types', [TypeController::class, 'index'])->name('types.index');
    Route::get('/types/create', [TypeController::class, 'create'])->name('types.create');
    Route::post('/types', [TypeController::class, 'store'])->name('types.store');
    Route::get('/types/{id}/edit', [TypeController::class, 'edit'])->name('types.edit');
    Route::put('/types/{id}', [TypeController::class, 'update'])->name('types.update');
    Route::delete('/types/{id}', [TypeController::class, 'destroy'])->name('types.destroy');

    Route::get('/cars', [CarController::class, 'index'])->name('cars.index');
    Route::get('/cars/create', [CarController::class, 'create'])->name('cars.create');
    Route::post('/cars', [CarController::class, 'store'])->name('cars.store');
    Route::get('/cars/{id}/edit', [CarController::class, 'edit'])->name('cars.edit');
    Route::put('/cars/{id}', [CarController::class, 'update'])->name('cars.update');
    Route::delete('/cars/{id}', [CarController::class, 'destroy'])->name('cars.destroy');
    Route::get('/cars', [CarController::class, 'index'])->name('cars.index');
    
    Route::get('/discounts', [DiscountController::class, 'index'])->name('discounts.index');
    Route::get('/discounts/create', [DiscountController::class, 'create'])->name('discounts.create');
    Route::post('/discounts', [DiscountController::class, 'store'])->name('discounts.store');
    Route::get('/discounts/{id}/edit', [DiscountController::class, 'edit'])->name('discounts.edit');
    Route::put('/discounts/{id}', [DiscountController::class, 'update'])->name('discounts.update');
    Route::delete('/discounts/{id}', [DiscountController::class, 'destroy'])->name('discounts.destroy');
    
    Route::get('/pending-transactions', [TransactionController::class, 'pending'])->name('transaction.pending');
    Route::get('/failed-transactions', [TransactionController::class, 'failed'])->name('transaction.failed');
    Route::get('/success-transactions', [TransactionController::class, 'success'])->name('transaction.success');
    Route::get('/transaction/{id}/show', [TransactionController::class, 'show'])->name('transaction.show');
});

require __DIR__.'/auth.php';
