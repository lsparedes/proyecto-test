<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TipoTestFormRequest extends FormRequest
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
            'descripcion' => 'required|string|max:200',
            'num_test' => 'required|numeric',
            'descripcion_test' => 'required|string',
            'instruccion_test' => 'required|string',
            'audio_instruccion' => 'nullable|max:9000|mimes:mp3,mp4',
            'fuente' => 'nullable|string|max:255',
            'icono' => 'nullable|string|max:255',
        ];
    }
}
