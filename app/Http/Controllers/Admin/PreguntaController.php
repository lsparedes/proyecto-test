<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pregunta;
use App\Models\Test;
use App\Http\Requests\Admin\PreguntaFormRequest;
use Illuminate\Support\Facades\Gate;

class PreguntaController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('pregunta'), 403);
        $preguntas = Pregunta::with('test')->get();
        return view('admin.pregunta.index', compact('preguntas'));
    }

    public function create()
    {
        abort_if(Gate::denies('add-pregunta'), 403);
        $tests = Test::all(); // O cualquier lógica que necesites para recuperar los tests
        return view('admin.pregunta.create', compact('tests'));
    }


    public function destroy($id)
    {
        abort_if(Gate::denies('delete-pregunta'), 403);
        Pregunta::destroy($id);

        return redirect('admin/pregunta')->with('message', 'Pregunta eliminada exitosamente');
    }


    public function store(PreguntaFormRequest $request)
    {
        $request->validated();

        $pregunta = new Pregunta();
        $pregunta->fill($request->only([
            'texto_pregunta',
            'tipo_respuesta',
            'respuesta_correcta',
            'id_test',
        ]))->save();

        return redirect('admin/pregunta')->with('message', 'Pregunta añadida exitosamente');
    }

    public function edit($id)
    {
        abort_if(Gate::denies('edit-pregunta'), 403);
        try {
            $pregunta = Pregunta::findOrFail($id);
            return view('admin.pregunta.edit', compact('pregunta'));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect('admin/pregunta')->with('error', 'Pregunta no encontrada');
        }
    }

    public function update(PreguntaFormRequest $request, $id)
    {
        try {
            $pregunta = Pregunta::findOrFail($id);
            $pregunta->update([
                'texto_pregunta' => $request->input('texto_pregunta'),
                'tipo_respuesta' => $request->input('tipo_respuesta'),
                'respuesta_correcta' => $request->input('respuesta_correcta'),
                'id_test' => $request->input('id_test'),
            ]);

            return redirect('admin/pregunta')->with('message', 'Pregunta actualizada exitosamente');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return redirect('admin/pregunta')->with('error', 'Pregunta no encontrada');
        }
    }

    public function mostrarPreguntasYAlternativas()
    {
        abort_if(Gate::denies('preguntas-y-alternativas'), 403);
        $preguntas = Pregunta::with('alternativas')->get();
        return view('admin.preguntas-y-alternativas', compact('preguntas'));
    }
}
