<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
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
});

require __DIR__.'/auth.php';
