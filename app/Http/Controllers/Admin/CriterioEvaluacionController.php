<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CriterioEvaluacion;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\CriterioEvaluacionFormRequest;
use Illuminate\Support\Facades\Gate;

class CriterioEvaluacionController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('criterio-evaluacion'), 403);
        $criterios = CriterioEvaluacion::all();

        return view('admin.criterio-evaluacion.index', compact('criterios'));
    }

    public function create()
    {
        abort_if(Gate::denies('add-criterio-evaluacion'), 403);
        return view('admin.criterio-evaluacion.create');
    }

    public function store(CriterioEvaluacionFormRequest $request)
    {
        $request->validated();

        CriterioEvaluacion::create($request->all());

        return redirect()->route('admin.criterio-evaluacion')->with('success', 'Criterio de Evaluación creado exitosamente');
    }

    public function edit($id)
    {
        abort_if(Gate::denies('edit-criterio-evaluacion'), 403);
        $criterio = CriterioEvaluacion::findOrFail($id);

        return view('admin.criterio-evaluacion.edit', compact('criterio'));
    }

    public function update(CriterioEvaluacionFormRequest $request, $id)
    {
        $request->validated();

        $criterio = CriterioEvaluacion::findOrFail($id);
        $criterio->update($request->all());

        return redirect()->route('admin.criterio-evaluacion')->with('success', 'Criterio de Evaluación actualizado exitosamente');
    }

    public function destroy($id)
    {
        abort_if(Gate::denies('delete-criterio-evaluacion'), 403);
        $criterio = CriterioEvaluacion::findOrFail($id);
        $criterio->delete();

        return redirect()->route('admin.criterio-evaluacion')->with('success', 'Criterio de Evaluación eliminado exitosamente');
    }
}
