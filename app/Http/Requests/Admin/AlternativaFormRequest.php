<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AlternativaFormRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'texto_alternativa' => 'required|string|max:255',
            'es_correcta' => 'nullable|boolean',
            'id_pregunta' => 'required|exists:pregunta,id',
        ];
    }
}
