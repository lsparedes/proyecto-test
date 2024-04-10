<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExaminadorPersonaTest;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\ExaminadorPersonaTestFormRequest;
use Carbon\Carbon;
use App\Models\Test;
use App\Models\Person;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class ExaminadorPersonaTestController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('examinador-persona-test'), 403);
        $examinadorPersonaTests = ExaminadorPersonaTest::all();

        // Convertir las fechas a objetos Carbon
        $examinadorPersonaTests->transform(function ($item) {
            $item->fecha_observacion = Carbon::parse($item->fecha_observacion);
            $item->fecha_termino = Carbon::parse($item->fecha_termino);
            return $item;
        });

        return view('admin.examinador-persona-test.index', compact('examinadorPersonaTests'));
    }

    public function create()
    {
        abort_if(Gate::denies('add-examinador-persona-test'), 403);
        $users = User::all();
        $persons = Person::all();
        $tests = Test::all();
        return view('admin.examinador-persona-test.create',compact('users', 'persons', 'tests'));
    }


    public function store(ExaminadorPersonaTestFormRequest $request)
    {

        // Obtener los datos validados del formulario
        $validatedData = $request->validated();

        // Crear una nueva instancia de ExaminadorPersonaTest y asignar los valores
        $examinador_persona_test = new ExaminadorPersonaTest;
        $examinador_persona_test->users_id = $validatedData['users_id'];
        $examinador_persona_test->test_id = $validatedData['test_id'];
        $examinador_persona_test->persons_id = $validatedData['persons_id'];
        $examinador_persona_test->observacion = $validatedData['observacion'];
        $examinador_persona_test->fecha_observacion = $validatedData['fecha_observacion'];
        $examinador_persona_test->fecha_termino = $validatedData['fecha_termino']; // Nuevo campo
        $examinador_persona_test->puntuacion = $validatedData['puntuacion']; // Nuevo campo
        $examinador_persona_test->duracion = $validatedData['duracion']; // Nuevo campo

        // Guardar el modelo en la base de datos
        $examinador_persona_test->save();
        return redirect('admin/examinador-persona-test')->with('message', 'Successfully Added');
    }

    public function edit($id)
    {
        abort_if(Gate::denies('edit-examinador-persona-test'), 403);
        $examinadorPersonaTest = ExaminadorPersonaTest::findOrFail($id);
        $users = User::all();
        $persons = Person::all();
        $tests = Test::all();

        return view('admin.examinador-persona-test.edit', compact('examinadorPersonaTest', 'users', 'persons', 'tests'));
    }

    public function update(ExaminadorPersonaTestFormRequest $request, $id)
    {
        // Obtener el examinadorPersonaTest existente
        $examinadorPersonaTest = ExaminadorPersonaTest::findOrFail($id);

        // Actualizar los campos con los nuevos valores del formulario
        $examinadorPersonaTest->update([
            'users_id' => $request->input('users_id'),
            'persons_id' => $request->input('persons_id'),
            'test_id' => $request->input('test_id'),
            'observacion' => $request->input('observacion'),
            'fecha_observacion' => $request->input('fecha_observacion'),
            'fecha_termino' => $request->input('fecha_termino') ?: null, // Asignar null si no se proporciona
            'puntuacion' => $request->input('puntuacion') ?: null, // Asignar null si no se proporciona
            'duracion' => $request->input('duracion') ?: null, // Asignar null si no se proporciona
        ]);

        // Redireccionar a la vista que desees después de la actualización
        return redirect('admin/examinador-persona-test')->with('message', 'Successfully Update');
    }

    public function destroy($id)
    {
        abort_if(Gate::denies('delete-examinador-persona-test'), 403);
        // Obtener el examinadorPersonaTest existente
        $examinadorPersonaTest = ExaminadorPersonaTest::findOrFail($id);

        // Eliminar el registro de la base de datos
        $examinadorPersonaTest->delete();

        // Redireccionar a la vista que desees después de la eliminación
        return redirect('admin/examinador-persona-test')->with('message', 'Successfully Update');
    }


}
