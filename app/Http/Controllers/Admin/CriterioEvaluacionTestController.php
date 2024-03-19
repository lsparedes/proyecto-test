<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CriterioEvaluacionTest;
use App\Models\CriterioEvaluacion;
use App\Models\Test;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\CriterioEvaluacionTestFormRequest;
use Illuminate\Support\Facades\Gate;

class CriterioEvaluacionTestController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('criterio_evaluacion_test'), 403);
        $criterioEvaluacionTests = CriterioEvaluacionTest::all();

        return view('admin.criterio_evaluacion_test.index', compact('criterioEvaluacionTests'));
    }

    public function create()
    {
        abort_if(Gate::denies('add-criterio_evaluacion_test'), 403);
        $criteriosEvaluacion = CriterioEvaluacion::all();
        $tests = Test::all();

        return view('admin.criterio_evaluacion_test.create', compact('criteriosEvaluacion', 'tests'));
    }

    public function store(CriterioEvaluacionTestFormRequest $request)
    {
        $request->validated();

        CriterioEvaluacionTest::create($request->all());

        return redirect()->route('admin.criterio_evaluacion_test')->with('message', 'Relación creada exitosamente');
    }

    public function edit($id)
    {
        abort_if(Gate::denies('edit-criterio_evaluacion_test'), 403);
        $criterioEvaluacionTest = CriterioEvaluacionTest::findOrFail($id);
        $criteriosEvaluacion = CriterioEvaluacion::all();
        $tests = Test::all();

        return view('admin.criterio_evaluacion_test.edit', compact('criterioEvaluacionTest', 'criteriosEvaluacion', 'tests'));
    }

    public function update(CriterioEvaluacionTestFormRequest $request, $id)
    {
        $request->validated();

        $criterioEvaluacionTest = CriterioEvaluacionTest::findOrFail($id);
        $criterioEvaluacionTest->update($request->all());

        return redirect()->route('admin.criterio_evaluacion_test')->with('message', 'Relación actualizada exitosamente');
    }

    public function destroy($id)
    {
        abort_if(Gate::denies('criterio_evaluacion_test.destroy'), 403);
        $criterioEvaluacionTest = CriterioEvaluacionTest::findOrFail($id);
        $criterioEvaluacionTest->delete();

        return redirect()->route('admin.criterio_evaluacion_test')->with('message', 'Relación eliminada exitosamente');
    }
}
