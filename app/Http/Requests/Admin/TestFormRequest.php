<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TestFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name_test' => 'required|string|max:255',
            'nombre_espa' => 'nullable|string|max:255',
            'points' => 'required|numeric',
            'duracion_minutos' => 'required|numeric',
            'tipotest_id' => 'required|exists:tipo_test,id',
            'url_test' => 'nullable|string',
            'url_adicional'=> 'nullable|string',
            'link_millisecond'=> 'nullable|string|max:255',
            'link_millisecond2'=> 'nullable|string|max:255',
        ];
    }
}
