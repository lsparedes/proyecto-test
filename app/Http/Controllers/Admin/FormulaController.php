<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Formula;
use App\Models\CriterioEvaluacion;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\FormulaFormRequest;
use Illuminate\Support\Facades\Gate;

class FormulaController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('formula'), 403);
        $formulas = Formula::all();

        return view('admin.formula.index', compact('formulas'));
    }

    public function create()
    {
        abort_if(Gate::denies('add-formula'), 403);
        $criterios = CriterioEvaluacion::all();

        return view('admin.formula.create', compact('criterios'));
    }

    public function store(FormulaFormRequest $request)
    {
        $request->validated();

        Formula::create($request->all());

        return redirect()->route('admin.formula')->with('message', 'Formula creada exitosamente');
    }

    public function edit($id)
    {
        abort_if(Gate::denies('edit-formula'), 403);
        $formula = Formula::findOrFail($id);
        $criterios = CriterioEvaluacion::all();

        return view('admin.formula.edit', compact('formula', 'criterios'));
    }

    public function update(FormulaFormRequest $request, $id)
    {
        $request->validated();

        $formula = Formula::findOrFail($id);
        $formula->update($request->all());

        return redirect()->route('admin.formula')->with('message', 'Formula actualizada exitosamente');
    }

    public function destroy($id)
    {
        abort_if(Gate::denies('delete-formula'), 403);
        $formula = Formula::findOrFail($id);
        $formula->delete();

        return redirect()->route('admin.formula')->with('message', 'Formula eliminada exitosamente');
    }
}
