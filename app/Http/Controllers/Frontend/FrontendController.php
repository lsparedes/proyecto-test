<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Test;

class FrontendController extends Controller
{
    public function index()
    {
        // Obtener la colección de tests con la relación tipoTest cargada y ordenar por num_test
        $tests = Test::with('tipoTest')->get()->sortBy('tipoTest.num_test');

        // Obtener los IDs de los tests en el orden deseado
        $testIds = $tests->pluck('id')->toArray();

        // Renderizar la vista y pasar la colección de tests y la lista de IDs
        return view('frontend.index', compact('tests', 'testIds'));
    }

    public function infotest($id)
    {
        // Obtener el test desde la base de datos usando el ID
        $test = Test::find($id);

        // Comprobar si el test existe
        if (!$test) {
            abort(404); 
        }

        // Obtener información adicional si es necesario, por ejemplo, el tipo de test
        $tipoTest = $test->tipoTest;

        // Pasar los datos a la vista
        return view('frontend.infotest', compact('test', 'tipoTest'));
    }
}
