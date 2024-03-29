<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('home', 'HomeController@index');

// Views
Route::get('/', 'WelcomeController@index');
Route::resource('traces', 'TracesController');
Route::resource('truck_stops', 'TruckStopsController');
Route::resource('optimization', 'OptimizationController');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
