<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class StaticUserDataServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        config(['static_users' => [
            'admin' => ['password' => 'kaisens.2021!', 'role' => 'admin'],
            'admingp' => ['password' => 'kaisens.2022!', 'role' => 'admingp'],
            'admingr' => ['password' => 'kaisens.2023!', 'role' => 'admingr'],
            'admings' => ['password' => 'kaisens.2024!', 'role' => 'admings'],
            // Add more users as needed
        ]]);
    }
}
