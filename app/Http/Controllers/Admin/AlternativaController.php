<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Alternativa;
use App\Models\Pregunta;
use App\Http\Requests\Admin\AlternativaFormRequest;
use Illuminate\Support\Facades\Gate;

class AlternativaController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('alternativa'), 403);
        $alternativas = Alternativa::all();
        // Puedes agregar más lógica según tus necesidades

        return view('admin.alternativa.index', compact('alternativas'));
    }

    public function create()
    {
        abort_if(Gate::denies('add-alternativa'), 403);
        $preguntas = Pregunta::all();

        return view('admin.alternativa.create', compact('preguntas'));
    }

    public function store(AlternativaFormRequest $request)
    {

        $request->validated();

        $es_correcta = $request->has('es_correcta') ? true : false;

        Alternativa::create([
            'texto_alternativa' => $request->input('texto_alternativa'),
            'es_correcta' => $es_correcta,
            'id_pregunta' => $request->input('id_pregunta'),
        ]);

        return redirect()->route('admin.alternativa')->with('message', 'Alternativa creada exitosamente');
    }

    public function edit($id)
    {
        abort_if(Gate::denies('edit-alternativa'), 403);
        $alternativa = Alternativa::findOrFail($id);
        $preguntas = Pregunta::all();

        return view('admin.alternativa.edit', compact('alternativa', 'preguntas'));
    }

    public function update(AlternativaFormRequest $request, $id)
    {
        $request->validated();

        $alternativa = Alternativa::findOrFail($id);
        $alternativa->update([
            'texto_alternativa' => $request->input('texto_alternativa'),
            'es_correcta' => $request->has('es_correcta'),
            'id_pregunta' => $request->input('id_pregunta'),
        ]);

        return redirect()->route('admin.alternativa')->with('message', 'Alternativa actualizada exitosamente');
    }

    public function destroy($id)
    {
        abort_if(Gate::denies('delete-alternativa'), 403);
        $alternativa = Alternativa::findOrFail($id);
        $alternativa->delete();

        return redirect()->route('admin.alternativa')->with('message', 'Alternativa eliminada exitosamente');
    }
}
