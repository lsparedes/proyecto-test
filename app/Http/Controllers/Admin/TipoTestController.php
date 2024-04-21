<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TipoTest;
use App\Http\Requests\Admin\TipoTestFormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Gate;

class TipoTestController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('tipotest'), 403);
        $tipo_test = TipoTest::all();
        return view('admin.tipotest.index', compact('tipo_test'));
    }

    public function create()
    {
        abort_if(Gate::denies('add-tipotest'), 403);
        return view('admin.tipotest.create');
    }

    public function store(TipoTestFormRequest $request)
    {
        $data = $request->validated();

        $tipo_test = new TipoTest;
        $tipo_test->num_test = $data['num_test'];
        $tipo_test->descripcion = $data['descripcion'];
        $tipo_test->descripcion_test = $data['descripcion_test'];
        $tipo_test->instruccion_test = $data['instruccion_test'];
        $tipo_test->instrucciones_adicionales = $data['instrucciones_adicionales'];
        $tipo_test->enlace_descarga = $data['enlace_descarga'];
        $tipo_test->fuente = $data['fuente'];
        $tipo_test->link_fuente = $data['link_fuente'];
        $tipo_test->icono = $data['icono'];
        $tipo_test->nombre_esp = $data['nombre_esp'];
        $tipo_test->implementacion = $data['implementacion'];

        if ($request->hasFile('audio_instruccion')) {
            $file = $request->file('audio_instruccion');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move('uploads/', $filename);
            $tipo_test->audio_instruccion = $filename;
        }

        $tipo_test->save();

        return redirect('admin/tipotest')->with('message', 'Successfully Added');
    }

    public function edit($tipo_test_id)
    {
        abort_if(Gate::denies('edit-tipotest'), 403);
        $tipo_test = TipoTest::find($tipo_test_id);
        return view('admin.tipotest.edit', compact('tipo_test'));
    }

    public function update(TipoTestFormRequest $request, $tipo_test_id)
    {
        $data = $request->validated();
        $tipo_test = TipoTest::find($tipo_test_id);

        $tipo_test->num_test = $data['num_test'];
        $tipo_test->descripcion = $data['descripcion'];
        $tipo_test->descripcion_test = $data['descripcion_test'];
        $tipo_test->instruccion_test = $data['instruccion_test'];
        $tipo_test->instrucciones_adicionales = $data['instrucciones_adicionales'];
        $tipo_test->enlace_descarga = $data['enlace_descarga'];
        $tipo_test->fuente = $data['fuente'];
        $tipo_test->link_fuente = $data['link_fuente'];
        $tipo_test->icono = $data['icono'];
        $tipo_test->nombre_esp = $data['nombre_esp'];
        $tipo_test->implementacion = $data['implementacion'];

        

        if ($request->hasFile('audio_instruccion')) {
            $destination = 'uploads/' . $tipo_test->audio_instruccion;
            if (File::exists($destination)) {
                File::delete($destination);
            }

            $file = $request->file('audio_instruccion');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move('uploads/', $filename);
            $tipo_test->audio_instruccion = $filename;
        }

        $tipo_test->save();

        return redirect('admin/tipotest')->with('message', 'Successfully Updated');
    }

    public function destroy($tipo_test_id)
    {
        abort_if(Gate::denies('delete-tipotest'), 403);
        $tipo_test = TipoTest::find($tipo_test_id);
        if ($tipo_test) {
            $destination2 = 'uploads/' . $tipo_test->audio_instruccion;
            if (File::exists($destination2)) {
                File::delete($destination2);
            }
            $tipo_test->delete();
            return redirect('admin/tipotest')->with('message', 'Successfully Deleted');
        } else {
            return redirect('admin/tipotest')->with('message', 'No Id found');
        }
    }
}
