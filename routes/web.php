<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\Admin\ExaminadorPersonaTestController;


Auth::routes();
Route::get('/', function () {
    return redirect('/login');
});

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');



Route::get('/emails.welcome', [App\Http\Controllers\Admin\UserController::class, 'store'])->name('emails.welcome');
Route::get('/password/change', [App\Http\Controllers\Auth\PasswordController::class, 'showChangePasswordForm'])->name('password.change');
Route::post('/password/update', [App\Http\Controllers\Auth\PasswordController::class, 'updatePassword'])->name('password.update');



Route::group(['middleware' => 'auth'], function () {
    Route::get('/', [App\Http\Controllers\Frontend\FrontendController::class, 'index']);

    Route::get('/info-test/{test_id}', [App\Http\Controllers\Frontend\FrontendController::class, 'infoTest'])->name('info-test');
    Route::get('/api/user-info', [App\Http\Controllers\Frontend\FrontendController::class, 'getUserInfo'])->name('api.user.info');

    Route::get('/password/change', [App\Http\Controllers\Auth\PasswordController::class, 'showChangePasswordForm'])->name('password.change');
    Route::post('/password/update', [App\Http\Controllers\Auth\PasswordController::class, 'updatePassword'])->name('password.update');
    Route::resource('/admin/permissions', App\Http\Controllers\Admin\PermissionController::class);
    Route::get('/admin/permissions', [App\Http\Controllers\Admin\PermissionController::class, 'index'])->name('admin.permissions');
    Route::get('/admin/permissions/create', [App\Http\Controllers\Admin\PermissionController::class, 'create'])->name('admin.permissions.create');
    Route::get('/admin/permissions/edit/{permission}', [App\Http\Controllers\Admin\PermissionController::class, 'edit'])->name('admin.permissions.edit');
    Route::post('/admin/permissions/store', [App\Http\Controllers\Admin\PermissionController::class, 'store'])->name('admin.permissions.store');
    Route::get('/admin/permissions/show/{permission}', [App\Http\Controllers\Admin\PermissionController::class, 'show'])->name('admin.permissions.show');
    Route::put('/admin/permissions/update/{permission}', [App\Http\Controllers\Admin\PermissionController::class, 'update'])->name('admin.permissions.update');
    Route::get('/admin/permissions/destroy/{permission}', [App\Http\Controllers\Admin\PermissionController::class, 'destroy'])->name('admin.permissions.destroy');

    Route::resource('/admin/roles', App\Http\Controllers\Admin\RoleController::class);

    Route::get('/admin/roles', [App\Http\Controllers\Admin\RoleController::class, 'index'])->name('admin.roles');
    Route::get('/admin/roles/create', [App\Http\Controllers\Admin\RoleController::class, 'create'])->name('admin.roles.create');
    Route::get('/admin/roles/edit/{role}', [App\Http\Controllers\Admin\RoleController::class, 'edit'])->name('admin.roles.edit');
    Route::post('/admin/roles/store', [App\Http\Controllers\Admin\RoleController::class, 'store'])->name('admin.roles.store');
    Route::get('/admin/roles/show/{role}', [App\Http\Controllers\Admin\RoleController::class, 'show'])->name('admin.roles.show');
    Route::put('/admin/roles/update/{role}', [App\Http\Controllers\Admin\RoleController::class, 'update'])->name('admin.roles.update');
    Route::get('/admin/roles/destroy/{role}', [App\Http\Controllers\Admin\RoleController::class, 'destroy'])->name('admin.roles.destroy');


    Route::get('/admin/dashboard', [App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('admin.dashboard');

    Route::get('/admin/administrador', [App\Http\Controllers\Admin\AdministradorController::class, 'index'])->name('admin.administrador');

    Route::get('/admin/users', [App\Http\Controllers\Admin\UserController::class, 'index'])->name('admin.users');
    Route::get('/admin/edit-user/{user}', [App\Http\Controllers\Admin\UserController::class, 'edit'])->name('admin.edit-user');
    Route::put('/admin/update-user/{user}', [App\Http\Controllers\Admin\UserController::class, 'update'])->name('admin.update-user');
    Route::get('/admin/delete-user/{user}', [App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('admin.delete-user');
    Route::get('/admin/add-user', [App\Http\Controllers\Admin\UserController::class, 'create'])->name('admin.add-user');
    Route::post('/admin/store-user', [App\Http\Controllers\Admin\UserController::class, 'store'])->name('admin.store-user');
    Route::get('/admin/show/{user}', [App\Http\Controllers\Admin\UserController::class, 'show'])->name('admin.show-user');


    Route::get('/admin/persons', [App\Http\Controllers\Admin\PersonController::class, 'index'])->name('admin.persons');
    Route::get('/admin/add-persons', [App\Http\Controllers\Admin\PersonController::class, 'create'])->name('admin.add-persons');
    Route::post('/admin/add-persons', [App\Http\Controllers\Admin\PersonController::class, 'store'])->name('admin.store-person');
    Route::get('/admin/edit-person/{person_id}', [App\Http\Controllers\Admin\PersonController::class, 'edit'])->name('admin.edit-person');
    Route::put('/admin/update-person/{person_id}', [App\Http\Controllers\Admin\PersonController::class, 'update'])->name('admin.update-person');
    Route::get('/admin/delete-person/{person_id}', [App\Http\Controllers\Admin\PersonController::class, 'destroy'])->name('admin.delete-person');


    Route::get('/admin/tipotest', [App\Http\Controllers\Admin\TipoTestController::class, 'index'])->name('admin.tipotest');
    Route::get('/admin/add-tipotest', [App\Http\Controllers\Admin\TipoTestController::class, 'create'])->name('admin.add-tipotest');
    Route::post('/admin/add-tipotest', [App\Http\Controllers\Admin\TipoTestController::class, 'store'])->name('admin.store-tipotest');
    Route::get('/admin/edit-tipotest/{tipo_test_id}', [App\Http\Controllers\Admin\TipoTestController::class, 'edit'])->name('admin.edit-tipotest');
    Route::put('/admin/update-tipotest/{tipo_test_id}', [App\Http\Controllers\Admin\TipoTestController::class, 'update'])->name('admin.update-tipotest');
    Route::get('/admin/delete-tipotest/{tipo_test_id}', [App\Http\Controllers\Admin\TipoTestController::class, 'destroy'])->name('admin.delete-tipotest');


    Route::get('/admin/tests', [App\Http\Controllers\Admin\TestController::class, 'index'])->name('admin.tests');
    Route::get('/admin/add-tests', [App\Http\Controllers\Admin\TestController::class, 'create'])->name('admin.add-tests');
    Route::post('/admin/add-tests', [App\Http\Controllers\Admin\TestController::class, 'store'])->name('admin.store-tests');
    Route::get('/admin/edit-tests/{test_id}', [App\Http\Controllers\Admin\TestController::class, 'edit'])->name('admin.edit-tests');
    Route::put('/admin/update-tests/{test_id}', [App\Http\Controllers\Admin\TestController::class, 'update'])->name('admin.update-tests');
    Route::get('/admin/delete-tests/{test_id}', [App\Http\Controllers\Admin\TestController::class, 'destroy'])->name('admin.delete-tests');


    Route::get('admin/download-csv/{id}', 'App\Http\Controllers\Admin\ExaminadorPersonaTestController@downloadCSV')->name('download.csv');
    Route::get('admin/examinador-persona-test/download-image/{id}/{image}', 'App\Http\Controllers\Admin\ExaminadorPersonaTestController@downloadImage')->name('download.image');
    Route::get('admin/download/audio/{id}/{audio}', 'App\Http\Controllers\Admin\ExaminadorPersonaTestController@downloadAudio')->name('download.audio');




    Route::get('/admin/examinador-persona-test', [App\Http\Controllers\Admin\ExaminadorPersonaTestController::class, 'index'])->name('admin.examinador-persona-test');
    Route::get('/admin/add-examinador-persona-test', [App\Http\Controllers\Admin\ExaminadorPersonaTestController::class, 'create'])->name('admin.add-examinador-persona-test');
    Route::post('/admin/add-examinador-persona-test', [App\Http\Controllers\Admin\ExaminadorPersonaTestController::class, 'store'])->name('admin.store-examinador-persona-test');
    Route::get('/admin/edit-examinador-persona-test/{id}', [App\Http\Controllers\Admin\ExaminadorPersonaTestController::class, 'edit'])->name('admin.edit-examinador-persona-test');
    Route::put('/admin/update-examinador-persona-test/{id}', [App\Http\Controllers\Admin\ExaminadorPersonaTestController::class, 'update'])->name('admin.update-examinador-persona-test');
    Route::get('/admin/delete-examinador-persona-test/{id}', [App\Http\Controllers\Admin\ExaminadorPersonaTestController::class, 'destroy'])->name('admin.delete-examinador-persona-test');


    Route::get('/admin/pregunta', [App\Http\Controllers\Admin\PreguntaController::class, 'index'])->name('admin.pregunta');
    Route::get('/admin/add-pregunta', [App\Http\Controllers\Admin\PreguntaController::class, 'create'])->name('admin.add-pregunta');
    Route::post('/admin/add-pregunta', [App\Http\Controllers\Admin\PreguntaController::class, 'store'])->name('admin.store-pregunta');
    Route::get('/admin/edit-pregunta/{id}', [App\Http\Controllers\Admin\PreguntaController::class, 'edit'])->name('admin.update-pregunta');
    Route::put('/admin/update-pregunta/{id}', [App\Http\Controllers\Admin\PreguntaController::class, 'update'])->name('admin.update-pregunta');
    Route::get('/admin/delete-pregunta/{id}', [App\Http\Controllers\Admin\PreguntaController::class, 'destroy'])->name('admin.delete-persona');


    Route::get('/admin/preguntas-y-alternativas', [App\Http\Controllers\Admin\PreguntaController::class, 'mostrarPreguntasYAlternativas'])->name('admin.preguntas-y-alternativas');


    Route::get('/admin/alternativa', [App\Http\Controllers\Admin\AlternativaController::class, 'index'])->name('admin.alternativa');
    Route::get('/admin/add-alternativa', [App\Http\Controllers\Admin\AlternativaController::class, 'create'])->name('admin.add-alternativa');
    Route::post('/admin/add-alternativa', [App\Http\Controllers\Admin\AlternativaController::class, 'store'])->name('admin.store-alternativa');
    Route::get('/admin/edit-alternativa/{id}', [App\Http\Controllers\Admin\AlternativaController::class, 'edit'])->name('admin.edit-alternativa');
    Route::put('/admin/update-alternativa/{id}', [App\Http\Controllers\Admin\AlternativaController::class, 'update'])->name('admin.update-alternativa');
    Route::get('/admin/delete-alternativa/{id}', [App\Http\Controllers\Admin\AlternativaController::class, 'destroy'])->name('admin.delete-alternativa');


    Route::get('/admin/respuesta', [App\Http\Controllers\Admin\RespuestaController::class, 'index'])->name('admin.respuesta');
    Route::get('/admin/add-respuesta', [App\Http\Controllers\Admin\RespuestaController::class, 'create'])->name('admin.add-respuesta');
    Route::post('/admin/add-respuesta', [App\Http\Controllers\Admin\RespuestaController::class, 'store'])->name('admin.store-respuesta');
    Route::get('/admin/edit-respuesta/{id}', [App\Http\Controllers\Admin\RespuestaController::class, 'edit'])->name('admin.edit-respuesta');
    Route::put('/admin/update-respuesta/{id}', [App\Http\Controllers\Admin\RespuestaController::class, 'update'])->name('admin.update-respuesta');
    Route::get('/admin/delete-respuesta/{id}', [App\Http\Controllers\Admin\RespuestaController::class, 'destroy'])->name('admin.delete-respuesta');


    Route::get('/admin/criterio-evaluacion', [App\Http\Controllers\Admin\CriterioEvaluacionController::class, 'index'])->name('admin.criterio-evaluacion');
    Route::get('/admin/add-criterio-evaluacion', [App\Http\Controllers\Admin\CriterioEvaluacionController::class, 'create'])->name('admin.add-criterio-evaluacion');
    Route::post('/admin/add-criterio-evaluacion', [App\Http\Controllers\Admin\CriterioEvaluacionController::class, 'store'])->name('admin.store-criterio-evaluacion');
    Route::get('/admin/edit-criterio-evaluacion/{id}', [App\Http\Controllers\Admin\CriterioEvaluacionController::class, 'edit'])->name('admin.edit-criterio-evaluacion');
    Route::put('/admin/update-criterio-evaluacion/{id}', [App\Http\Controllers\Admin\CriterioEvaluacionController::class, 'update'])->name('admin.update-criterio-evaluacion');
    Route::get('/admin/delete-criterio-evaluacion/{id}', [App\Http\Controllers\Admin\CriterioEvaluacionController::class, 'destroy'])->name('admin.delete-criterio-evaluacion');


    Route::get('/admin/formula', [App\Http\Controllers\Admin\FormulaController::class, 'index'])->name('admin.formula');
    Route::get('/admin/add-formula', [App\Http\Controllers\Admin\FormulaController::class, 'create'])->name('admin.add-formula');
    Route::post('/admin/add-formula', [App\Http\Controllers\Admin\FormulaController::class, 'store'])->name('admin.store-formula');
    Route::get('/admin/edit-formula/{id}', [App\Http\Controllers\Admin\FormulaController::class, 'edit'])->name('admin.edit-formula');
    Route::put('/admin/update-formula/{id}', [App\Http\Controllers\Admin\FormulaController::class, 'update'])->name('admin.update-formula');
    Route::get('/admin/delete-formula/{id}', [App\Http\Controllers\Admin\FormulaController::class, 'destroy'])->name('admin.delete-formula');


    Route::get('/admin/metrica', [App\Http\Controllers\Admin\MetricaController::class, 'index'])->name('admin.metrica');
    Route::get('/admin/add-metrica', [App\Http\Controllers\Admin\MetricaController::class, 'create'])->name('admin.add-metrica');
    Route::post('/admin/add-metrica', [App\Http\Controllers\Admin\MetricaController::class, 'store'])->name('admin.store-metrica');
    Route::get('/admin/edit-metrica/{metrica}', [App\Http\Controllers\Admin\MetricaController::class, 'edit'])->name('admin.edit-metrica');
    Route::put('/admin/update-metrica/{metrica}', [App\Http\Controllers\Admin\MetricaController::class, 'update'])->name('admin.update-metrica');
    Route::get('/admin/delete-metrica/{metrica}', [App\Http\Controllers\Admin\MetricaController::class, 'destroy'])->name('admin.delete-metrica');


    Route::get('/admin/criterio_evaluacion_test', [App\Http\Controllers\Admin\CriterioEvaluacionTestController::class, 'index'])->name('admin.criterio_evaluacion_test');
    Route::get('/admin/add-criterio_evaluacion_test', [App\Http\Controllers\Admin\CriterioEvaluacionTestController::class, 'create'])->name('admin.add-criterio_evaluacion_test');
    Route::post('/admin/add-criterio_evaluacion_test', [App\Http\Controllers\Admin\CriterioEvaluacionTestController::class, 'store'])->name('admin.store.criterio_evaluacion_test');
    Route::get('/admin/edit-criterio_evaluacion_test/{id}', [App\Http\Controllers\Admin\CriterioEvaluacionTestController::class, 'edit'])->name('admin.edit-criterio_evaluacion_test');
    Route::put('/admin/update-criterio_evaluacion_test/{id}', [App\Http\Controllers\Admin\CriterioEvaluacionTestController::class, 'update'])->name('admin.update-criterio_evaluacion_test');
    Route::get('/admin/delete-criterio_evaluacion_test/{id}', [App\Http\Controllers\Admin\CriterioEvaluacionTestController::class, 'destroy'])->name('admin.delete-criterio_evaluacion_test');
});
