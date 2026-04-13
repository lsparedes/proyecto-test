<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Test;
use App\Http\Requests\Admin\TestFormRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\TipoTest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Schema;

class TestController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('tests'), 403);

        $test = Test::with('tipoTest')->get();

        return view('admin.test.index', compact('test'));
    }

    public function create()
    {
        abort_if(Gate::denies('add-tests'), 403);

        $tiposTest = TipoTest::all();

        return view('admin.test.create', ['tiposTest' => $tiposTest]);
    }

    public function edit($test_id)
    {
        abort_if(Gate::denies('edit-tests'), 403);

        $test = Test::findOrFail($test_id);
        $tiposTest = TipoTest::all();

        return view('admin.test.edit', compact('test', 'tiposTest'));
    }

    public function store(TestFormRequest $request)
    {
        $data = $request->validated();

        $test = new Test;

        $test->name_test = $data['name_test'];
        $test->nombre_espa = $data['nombre_espa'] ?? null;
        $test->points = $data['points'];
        $test->duracion_minutos = $data['duracion_minutos'];
        $test->tipotest_id = $data['tipotest_id'];
        if (Schema::hasColumn('test', 'modulo')) {
            $test->modulo = $data['modulo'];
        }
        $test->url_test = $data['url_test'] ?? null;
        $test->url_adicional = $data['url_adicional'] ?? null;
        $test->link_millisecond = $data['link_millisecond'] ?? null;
        $test->link_millisecond2 = $data['link_millisecond2'] ?? null;
        $test->nombre_url = $data['nombre_url'] ?? null;
        $test->nombre_url_opcional = $data['nombre_url_opcional'] ?? null;
        $test->descripcion_individual = $data['descripcion_individual'] ?? null;
        $test->save();

        return redirect('admin/tests')->with('message', 'Successfully Added');
    }

    public function update(TestFormRequest $request, $test_id)
    {
        $data = $request->validated();

        $test = Test::findOrFail($test_id);

        $updateData = [
            'name_test' => $data['name_test'],
            'nombre_espa' => $data['nombre_espa'] ?? null,
            'points' => $data['points'],
            'duracion_minutos' => $data['duracion_minutos'],
            'tipotest_id' => $data['tipotest_id'],
            'url_test' => $data['url_test'] ?? null,
            'url_adicional' => $data['url_adicional'] ?? null,
            'link_millisecond' => $data['link_millisecond'] ?? null,
            'link_millisecond2' => $data['link_millisecond2'] ?? null,
            'nombre_url' => $data['nombre_url'] ?? null,
            'nombre_url_opcional' => $data['nombre_url_opcional'] ?? null,
            'descripcion_individual' => $data['descripcion_individual'] ?? null,
        ];

        if (Schema::hasColumn('test', 'modulo')) {
            $updateData['modulo'] = $data['modulo'];
        }

        $test->update($updateData);

        return redirect('admin/tests')->with('message', 'Successfully Update');
    }

    public function destroy($test_id)
    {
        abort_if(Gate::denies('delete-tests'), 403);

        $test = Test::find($test_id);

        if ($test) {
            $test->delete();
            return redirect('admin/tests')->with('message', 'Successfully Deleted');
        } else {
            return redirect('admin/tests')->with('message', 'No Id found');
        }
    }
}
