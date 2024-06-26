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
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

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
                $imagePaths[] = $image->storeAs('images', $image->getClientOriginalName(), 'public');
            }
            $examinadorPersonaTest->image_path = json_encode($imagePaths);
        }

        // Manejo de audios
        if ($request->hasFile('audio_path')) {
            $audioPaths = [];
            foreach ($request->file('audio_path') as $audio) {
                $audioPaths[] = $audio->storeAs('audios', $audio->getClientOriginalName(), 'public');
            }
            $examinadorPersonaTest->audio_path = json_encode($audioPaths);
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

        // Manejo de audios
        if ($request->hasFile('audio_path')) {
            // Eliminar los audios anteriores si existen
            if ($examinadorPersonaTest->audio_path) {
                $oldAudioPaths = json_decode($examinadorPersonaTest->audio_path, true);
                foreach ($oldAudioPaths as $oldAudioPath) {
                    Storage::disk('public')->delete($oldAudioPath);
                }
            }

            // Guardar los nuevos audios
            $audioPaths = [];
            foreach ($request->file('audio_path') as $audio) {
                $audioPaths[] = $audio->storeAs('audios', $audio->getClientOriginalName(), 'public');
            }
            $examinadorPersonaTest->audio_path = json_encode($audioPaths);
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

        // Eliminar los audios si existen
        if ($examinadorPersonaTest->audio_path) {
            $oldAudioPaths = json_decode($examinadorPersonaTest->audio_path, true);
            foreach ($oldAudioPaths as $oldAudioPath) {
                Storage::disk('public')->delete($oldAudioPath);
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
        try {
            // Buscar el ExaminadorPersonaTest por su ID
            $examinadorPersonaTest = ExaminadorPersonaTest::findOrFail($id);

            // Verificar si existe la propiedad image_path y si es un JSON válido
            if ($examinadorPersonaTest->image_path) {
                $imagePaths = json_decode($examinadorPersonaTest->image_path, true);

                // Verificar si $imagePaths es un array válido y si la imagen solicitada está en la lista de imágenes
                if (is_array($imagePaths) && in_array("images/{$image}", $imagePaths)) {
                    // Obtener información relacionada al examinador y la imagen
                    $nombrePersona = $examinadorPersonaTest->person->name; // Nombre de la persona
                    $testName = $examinadorPersonaTest->test->name_test; // Nombre del test
                    // Obtener la fecha formateada si está presente
                    $fechaTerminoFormatted = $examinadorPersonaTest->fecha_termino ?
                        Carbon::parse($examinadorPersonaTest->fecha_termino)->format('Y-m-d_H:i:s') :
                        'sin_fecha';


                    // Construir el nombre del archivo
                    $originalFilename = "respuesta_{$nombrePersona}_{$testName}_{$fechaTerminoFormatted}_{$image}";

                    // Construir la ruta completa del archivo
                    $pathToFile = storage_path('app/public/' . "images/{$image}");

                    // Verificar si el archivo existe
                    if (file_exists($pathToFile)) {
                        $mimeType = mime_content_type($pathToFile);

                        // Descargar la imagen directamente usando response()->download()
                        return response()->download($pathToFile, $originalFilename, [
                            'Content-Type' => $mimeType,
                            'Content-Disposition' => 'attachment; filename="' . $originalFilename . '"'
                        ]);
                    } else {
                        return redirect()->back()->with('error', 'No se encontró el archivo de imagen.');
                    }
                } else {
                    return redirect()->back()->with('error', 'La imagen solicitada no pertenece a este examinador.');
                }
            } else {
                return redirect()->back()->with('error', 'No se encontraron imágenes asociadas a este examinador.');
            }
        } catch (\Exception $e) {
            // Capturar cualquier excepción que pueda ocurrir
            return redirect()->back()->with('error', 'Error al procesar la solicitud: ' . $e->getMessage());
        }
    }

    public function downloadAudio($id, $audio)
    {
        try {
            // Buscar el ExaminadorPersonaTest por su ID
            $examinadorPersonaTest = ExaminadorPersonaTest::findOrFail($id);

            // Verificar si existe la propiedad audio_path y si es un JSON válido
            if ($examinadorPersonaTest->audio_path) {
                $audioPaths = json_decode($examinadorPersonaTest->audio_path, true);

                // Verificar si $audioPaths es un array válido y si el audio solicitado está en la lista de audios
                if (is_array($audioPaths) && in_array("audios/{$audio}", $audioPaths)) {
                    // Obtener información relacionada al examinador y el audio
                    $nombrePersona = $examinadorPersonaTest->person->name; // Nombre de la persona
                    $testName = $examinadorPersonaTest->test->name_test; // Nombre del test
                    // Obtener la fecha formateada si está presente
                    $fechaTerminoFormatted = $examinadorPersonaTest->fecha_termino ?
                        Carbon::parse($examinadorPersonaTest->fecha_termino)->format('Y-m-d_H:i:s') :
                        'sin_fecha';

                    // Construir el nombre del archivo
                    $originalFilename = "respuesta_{$nombrePersona}_{$testName}_{$fechaTerminoFormatted}_{$audio}";

                    // Construir la ruta completa del archivo
                    $pathToFile = storage_path('app/public/' . "audios/{$audio}");

                    // Verificar si el archivo existe
                    if (file_exists($pathToFile)) {
                        $mimeType = mime_content_type($pathToFile);

                        // Descargar el audio directamente usando response()->download()
                        return response()->download($pathToFile, $originalFilename, [
                            'Content-Type' => $mimeType,
                            'Content-Disposition' => 'attachment; filename="' . $originalFilename . '"'
                        ]);
                    } else {
                        return redirect()->back()->with('error', 'No se encontró el archivo de audio.');
                    }
                } else {
                    return redirect()->back()->with('error', 'El audio solicitado no pertenece a este examinador.');
                }
            } else {
                return redirect()->back()->with('error', 'No se encontraron audios asociados a este examinador.');
            }
        } catch (\Exception $e) {
            // Capturar cualquier excepción que pueda ocurrir
            return redirect()->back()->with('error', 'Error al procesar la solicitud: ' . $e->getMessage());
        }
    }
}
