<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppointmentStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('appointment_statuses')->insert([
            ['name' => 'pending', 'label' => 'Pendente', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'confirmed', 'label' => 'Confirmado', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'canceled', 'label' => 'Cancelado', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
