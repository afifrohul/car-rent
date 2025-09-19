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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('desc')->nullable();

            // Jenis diskon
            $table->enum('discount_type', ['percentage'])->default('percentage');
            $table->decimal('discount_value', 5, 2);

            // Syarat & periode berlaku
            $table->decimal('min_transaction', 12, 2)->default(0);
            $table->dateTime('start_date');
            $table->dateTime('end_date');

            // Status
            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discount_codes');
    }
};
