<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Metrica;
use App\Models\CriterioEvaluacion;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\MetricaFormRequest;
use Illuminate\Support\Facades\Gate;

class MetricaController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('metrica'), 403);
        $metricas = Metrica::all();

        return view('admin.metrica.index', compact('metricas'));
    }

    public function create()
    {
        abort_if(Gate::denies('add-metrica'), 403);
        abort_if(Gate::denies('formula'), 403);
        $criterios = CriterioEvaluacion::all();

        return view('admin.metrica.create', compact('criterios'));
    }

    public function store(MetricaFormRequest $request)
    {
        $request->validated();

        Metrica::create($request->all());

        return redirect()->route('admin.metrica')->with('message', 'Métrica creada exitosamente');
    }

    public function edit(Metrica $metrica)
    {
        abort_if(Gate::denies('edit-metrica'), 403);
        $criterios = CriterioEvaluacion::all();

        return view('admin.metrica.edit', compact('metrica', 'criterios'));
    }

    public function update(MetricaFormRequest $request, Metrica $metrica)
    {
        $request->validated();

        $metrica->update($request->all());

        return redirect()->route('admin.metrica')->with('message', 'Métrica actualizada exitosamente');
    }

    public function destroy(Metrica $metrica)
    {
        abort_if(Gate::denies('delete-metrica'), 403);
        $metrica->delete();

        return redirect()->route('admin.metrica')->with('message', 'Métrica eliminada exitosamente');
    }
}
