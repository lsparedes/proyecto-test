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
use Illuminate\Support\Facades\Storage;

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
        return view('admin.examinador-persona-test.create', compact('users', 'persons', 'tests'));
    }


    public function store(ExaminadorPersonaTestFormRequest $request)
    {
        // Validar los datos del formulario
        $validatedData = $request->validated();

        // Crear una instancia de ExaminadorPersonaTest y asignar los valores validados
        $examinadorPersonaTest = new ExaminadorPersonaTest([
            'users_id' => $validatedData['users_id'],
            'test_id' => $validatedData['test_id'],
            'persons_id' => $validatedData['persons_id'],
            'observacion' => $validatedData['observacion'],
            'fecha_observacion' => $validatedData['fecha_observacion'],
            'fecha_termino' => $validatedData['fecha_termino'] ?: null,
            'puntuacion' => $validatedData['puntuacion'] ?: null,
            'duracion' => $validatedData['duracion'] ?: null,
        ]);

        // Manejo de archivo CSV
        if ($request->hasFile('csv_path')) {
            $examinadorPersonaTest->csv_path = $request->file('csv_path')->store('csv_files', 'public');
        }

        // Manejo de imágenes
        if ($request->hasFile('image_path')) {
            $imagePaths = [];
            foreach ($request->file('image_path') as $image) {
                $imagePaths[] = $image->store('images', 'public');
            }
            $examinadorPersonaTest->image_path = json_encode($imagePaths);
        }

        // Guardar el modelo en la base de datos
        $examinadorPersonaTest->save();

        return redirect('admin/examinador-persona-test')->with('success', 'Successfully Added');
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
        $examinadorPersonaTest->fill([
            'users_id' => $request->input('users_id'),
            'persons_id' => $request->input('persons_id'),
            'test_id' => $request->input('test_id'),
            'observacion' => $request->input('observacion'),
            'fecha_observacion' => $request->input('fecha_observacion'),
            'fecha_termino' => $request->input('fecha_termino') ?: null,
            'puntuacion' => $request->input('puntuacion') ?: null,
            'duracion' => $request->input('duracion') ?: null,
        ]);

        // Manejo de archivo CSV
        if ($request->hasFile('csv_path')) {
            // Eliminar el archivo CSV anterior si existe
            if ($examinadorPersonaTest->csv_path) {
                Storage::disk('public')->delete($examinadorPersonaTest->csv_path);
            }
            $examinadorPersonaTest->csv_path = $request->file('csv_path')->store('csv_files', 'public');
        }

        // Manejo de imágenes
        if ($request->hasFile('image_path')) {
            // Eliminar las imágenes anteriores si existen
            if ($examinadorPersonaTest->image_path) {
                $oldImagePaths = json_decode($examinadorPersonaTest->image_path, true);
                foreach ($oldImagePaths as $oldImagePath) {
                    Storage::disk('public')->delete($oldImagePath);
                }
            }

            // Guardar las nuevas imágenes
            $imagePaths = [];
            foreach ($request->file('image_path') as $image) {
                $imagePaths[] = $image->store('images', 'public');
            }
            $examinadorPersonaTest->image_path = json_encode($imagePaths);
        }

        // Guardar los cambios en la base de datos
        $examinadorPersonaTest->save();

        // Redireccionar a la vista que desees después de la actualización
        return redirect('admin/examinador-persona-test')->with('success', 'Successfully Updated');
    }


    public function destroy($id)
    {
        abort_if(Gate::denies('delete-examinador-persona-test'), 403);
        // Obtener el examinadorPersonaTest existente
        $examinadorPersonaTest = ExaminadorPersonaTest::findOrFail($id);

        // Eliminar el archivo CSV si existe
        if ($examinadorPersonaTest->csv_path) {
            Storage::disk('public')->delete($examinadorPersonaTest->csv_path);
        }

        // Eliminar las imágenes si existen
        if ($examinadorPersonaTest->image_path) {
            $oldImagePaths = json_decode($examinadorPersonaTest->image_path, true);
            foreach ($oldImagePaths as $oldImagePath) {
                Storage::disk('public')->delete($oldImagePath);
            }
        }

        // Eliminar el registro de la base de datos
        $examinadorPersonaTest->delete();

        // Redireccionar a la vista que desees después de la eliminación
        return redirect('admin/examinador-persona-test')->with('message', 'Successfully Deleted');
    }

    public function downloadCSV($id)
    {
        $examinadorPersonaTest = ExaminadorPersonaTest::findOrFail($id);

        // Verificar si existe un archivo CSV asociado
        if ($examinadorPersonaTest->csv_path) {
            $pathToFile = storage_path('app/public/' . $examinadorPersonaTest->csv_path);

            // Obtener la fecha formateada si está presente
            $fechaTerminoFormatted = $examinadorPersonaTest->fecha_termino ?
                Carbon::parse($examinadorPersonaTest->fecha_termino)->format('Y-m-d_H:i:s') :
                'sin_fecha';

            // Construir el nombre del archivo CSV con información del modelo
            $fileName = 'resultados_' . $examinadorPersonaTest->person->name . '_' .
                $examinadorPersonaTest->test->name_test . '_' .
                $fechaTerminoFormatted .
                '.csv';

            return response()->download($pathToFile, $fileName, [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment'
            ]);
        }

        // Redireccionar o mostrar mensaje de error si no hay archivo CSV
        return redirect()->back()->with('error', 'No se encontró el archivo CSV.');
    }

    public function downloadImage($id, $image)
    {
        $examinadorPersonaTest = ExaminadorPersonaTest::findOrFail($id);

        if ($examinadorPersonaTest->image_path) {
            $imagePaths = json_decode($examinadorPersonaTest->image_path, true);

            if (in_array($image, $imagePaths)) {
                $pathToFile = storage_path('app/public/' . $image);

                if (file_exists($pathToFile)) {
                    $mimeType = mime_content_type($pathToFile);
                    $originalFilename = basename($pathToFile);

                    // Construir la URL pública usando Storage::url()
                    $url = Storage::url('public/' . $image);

                    return response()->download($pathToFile, $originalFilename, [
                        'Content-Type' => $mimeType,
                        'Content-Disposition' => 'attachment; filename="' . $originalFilename . '"',
                        'url' => $url // Incluir la URL en las opciones de descarga si es necesario
                    ]);
                }
            }
        }

        return redirect()->back()->with('error', 'No se encontró la imagen solicitada.');
    }


}
