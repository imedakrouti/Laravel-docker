<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\MainController;
use App\Http\Controllers\RulesController;
use App\Http\Controllers\AccountsController;
use App\Http\Controllers\DigitalAccountController;
use App\Http\Controllers\ProfilsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::get('/', [UserController::class, 'index']);
Route::post('/login', [UserController::class, 'login'])->name('login');
Route::get('/logout', [UserController::class, 'logout'])->name('logout');
Route::middleware(['auth'])->group(function () {
    Route::get('/main', [MainController::class, 'index'])->name('main');
    Route::middleware(['admin'])->group(function () {
        Route::get('/accounts/manager', [AccountsController::class, 'manager'])->name('manager');
        Route::get('/accounts/parent', [AccountsController::class, 'parent'])->name('parent');
        Route::get('/accounts/child', [AccountsController::class, 'child'])->name('child');
        Route::get('/digital/responsable', [DigitalAccountController::class, 'responsable'])->name('responsable');
        Route::get('/digital/revendeur', [DigitalAccountController::class, 'revendeur'])->name('revendeur');
        Route::get('/digital/salarie', [DigitalAccountController::class, 'salarie'])->name('salarie');
    });

    Route::middleware(['admingp'])->group(function () {
        Route::get('/profils', [ProfilsController::class, 'index'])->name('profiles');
        Route::get('/profils/details/{id}', [ProfilsController::class, 'detail_profil'])->name('detail_profil');
        Route::get('/profils/add/{id}', [ProfilsController::class, 'add_profil'])->name('add_profil');
    });
    Route::middleware(['admingr'])->group(function () {
        Route::get('/rules', [RulesController::class, 'rules'])->name('rules');
        Route::get('/rules/clauses', [RulesController::class, 'clauses'])->name('rules_clauses');
        Route::get('/rules/concept', [RulesController::class, 'concept'])->name('rules_concept');
        Route::get('/rules/formule', [RulesController::class, 'formule'])->name('rules_formule');
        Route::get('/rules/echantillons', [RulesController::class, 'echantillons'])->name('rules_echantillons');
        Route::get('/rules/application', [RulesController::class, 'application'])->name('rules_application');
        Route::get('/rules/complex', [RulesController::class, 'complexRules'])->name('rules_complex');
    });
    Route::middleware(['admings'])->group(function () {
        Route::get('/support', [SupportController::class, 'support'])->name('support');
        Route::get('/coordoonee', [SupportController::class, 'coordoonee'])->name('coordoonee');
        Route::get('/contact', [SupportController::class, 'contact'])->name('contact');
    });
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
