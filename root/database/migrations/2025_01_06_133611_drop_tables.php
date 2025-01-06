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
        Schema::dropIfExists('variation_types');
        Schema::dropIfExists('variation_type_options');
        Schema::dropIfExists('product_variations');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
