<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            // Relasi
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('car_id')->constrained('cars')->onDelete('cascade');

            // Snapshot data mobil
            $table->string('car_name');
            $table->string('car_brand');
            $table->string('car_type');
            $table->decimal('price_per_hour', 10, 2);

            // Booking details
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->integer('total_hours');
            $table->decimal('subtotal', 12, 2);

            // Diskon / Promo
            $table->foreignId('discount_id')->nullable()->constrained('discounts')->nullOnDelete();
            $table->string('discount_code')->nullable();
            $table->decimal('discount', 12, 2)->default(0);

            // Total harga setelah diskon
            $table->decimal('total_price', 12, 2);

            // Status booking
            $table->enum('status', ['pending', 'confirmed', 'completed', 'cancelled'])->default('pending');

            // Payment info
            $table->string('payment_method')->nullable();
            $table->enum('payment_status', ['waiting', 'success', 'failed'])->default('waiting');

            // Midtrans identifiers
            $table->string('midtrans_order_id')->nullable();
            $table->string('midtrans_transaction_id')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
