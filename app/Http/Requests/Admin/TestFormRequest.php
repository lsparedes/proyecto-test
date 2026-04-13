<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TestFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name_test' => ['required', 'string', 'max:255'],
            'nombre_espa' => ['nullable', 'string', 'max:255'],
            'points' => ['required', 'integer'],
            'duracion_minutos' => ['required', 'integer'],
            'tipotest_id' => ['required', 'exists:tipo_test,id'],
            'modulo' => ['required', 'integer', 'in:1,2,3'],
            'url_test' => ['nullable', 'string', 'max:255'],
            'url_adicional' => ['nullable', 'string', 'max:255'],
            'link_millisecond' => ['nullable', 'string', 'max:255'],
            'link_millisecond2' => ['nullable', 'string', 'max:255'],
            'nombre_url' => ['nullable', 'string', 'max:255'],
            'nombre_url_opcional' => ['nullable', 'string', 'max:255'],
            'descripcion_individual' => ['nullable', 'string'],
        ];
    }
}
