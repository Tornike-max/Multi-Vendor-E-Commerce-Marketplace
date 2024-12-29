<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Electronics',
                'meta-title' => 'Electronics',
                'meta-description' => 'Electronics',
                'slug' => Str::slug('electronics'),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Fashion',
                'meta-title' => 'Fashion',
                'meta-description' => 'Fashion',
                'slug' => Str::slug('fashion'),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Home, Garder & tools',
                'meta-title' => 'Home, Garder & tools',
                'meta-description' => 'Home, Garder & tools',
                'slug' => Str::slug('Home,Garden & Tools'),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Books & Audible',
                'meta-title' => 'Books & Audible',
                'meta-description' => 'Books & Audible',
                'slug' => Str::slug('Books & Audible'),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Health & Beauty',
                'meta-title' => 'Health & Beauty',
                'meta-description' => 'Health & Beauty',
                'slug' => Str::slug('Electronics'),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'IT & Software',
                'meta-title' => 'IT & Software',
                'meta-description' => 'IT & Software',
                'slug' => Str::slug('IT & Software'),
                'active' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        DB::table('departments')->insert($departments);
    }
}
