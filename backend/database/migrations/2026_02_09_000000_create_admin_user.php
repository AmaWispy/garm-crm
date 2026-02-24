<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $adminEmail = 'admin@example.com';
        $accountantEmail = 'accountant@example.com';
        
        // Admin
        if (!DB::table('users')->where('email', $adminEmail)->exists()) {
            DB::table('users')->insert([
                'name' => 'Admin',
                'email' => $adminEmail,
                'password' => Hash::make('password'),
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Accountant
        if (!DB::table('users')->where('email', $accountantEmail)->exists()) {
            DB::table('users')->insert([
                'name' => 'Accountant',
                'email' => $accountantEmail,
                'password' => Hash::make('password'),
                'role' => 'accountant',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('users')->whereIn('email', ['admin@example.com', 'accountant@example.com'])->delete();
    }
};
