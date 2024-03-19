<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class RespuestaFormRequest extends FormRequest
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
            'texto_respuesta' => 'required|string|max:255',
            'id_pregunta' => 'required|exists:pregunta,id',
            'id_test' => 'required|exists:test,id',
        ];
    }
}
