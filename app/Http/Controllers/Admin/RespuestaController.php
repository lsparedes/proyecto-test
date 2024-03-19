<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Respuesta;
use App\Models\Pregunta;
use App\Models\Test;
use App\Http\Requests\Admin\RespuestaFormRequest;
use Illuminate\Support\Facades\Gate;

class RespuestaController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('respuesta'), 403);
        $respuestas = Respuesta::all();
        $preguntas = Pregunta::all();
        $tests = Test::all();

        return view('admin.respuesta.index', compact('respuestas', 'preguntas', 'tests'));
    }

    public function create()
    {
        abort_if(Gate::denies('add-respuesta'), 403);
        $preguntas = Pregunta::all();
        $tests = Test::all();

        return view('admin.respuesta.create', compact('preguntas', 'tests'));
    }

    public function store(RespuestaFormRequest $request)
    {
        $request->validated();

        Respuesta::create([
            'texto_respuesta' => $request->input('texto_respuesta'),
            'id_pregunta' => $request->input('id_pregunta'),
            'id_test' => $request->input('id_test'),
        ]);

        return redirect()->route('admin.respuesta')->with('message', 'Respuesta creada exitosamente');
    }

    public function edit($id)
    {
        abort_if(Gate::denies('edit-respuesta'), 403);
        $respuesta = Respuesta::findOrFail($id);
        $preguntas = Pregunta::all();
        $tests = Test::all();

        return view('admin.respuesta.edit', compact('respuesta', 'preguntas', 'tests'));
    }

    public function update(RespuestaFormRequest $request, $id)
    {
        $request->validated();

        $respuesta = Respuesta::findOrFail($id);
        $respuesta->update([
            'texto_respuesta' => $request->input('texto_respuesta'),
            'id_pregunta' => $request->input('id_pregunta'),
            'id_test' => $request->input('id_test'),
        ]);

        return redirect()->route('admin.respuesta')->with('message', 'Respuesta actualizada exitosamente');
    }

    public function destroy($id)
    {
        abort_if(Gate::denies('delete-respuesta'), 403);
        $respuesta = Respuesta::findOrFail($id);
        $respuesta->delete();

        return redirect()->route('admin.respuesta')->with('message', 'Respuesta eliminada exitosamente');
    }
}
