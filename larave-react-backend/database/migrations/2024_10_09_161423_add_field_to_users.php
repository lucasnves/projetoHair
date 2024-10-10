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
        Schema::table('users', function (Blueprint $table) {
            $table->integer('user_type')->after('remember_token')->nullable();
            $table->foreignId('company_id')->after('user_type')->nullable()->constrained('companies')->onDelete('cascade');
            $table->string('specialty')->after('company_id')->nullable();
            $table->string('phone_number')->after('specialty')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn([
                'user_type',
                'company_id',
                'specialty',
                'phone_number'
            ]);
        });
    }
};
