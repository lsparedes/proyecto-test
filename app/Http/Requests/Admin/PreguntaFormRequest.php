<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class PreguntaFormRequest extends FormRequest
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
            'texto_pregunta' => 'required|string|max:255',
            'tipo_respuesta' => 'required|string|max:50',
            'respuesta_correcta' => 'required|string|max:255',
            'id_test' => 'required|exists:test,id',
        ];
    }
}
