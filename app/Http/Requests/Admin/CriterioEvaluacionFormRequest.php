<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CriterioEvaluacionFormRequest extends FormRequest
{
    public function authorize()
    {
        return true; 
    }

    public function rules()
    {
        return [
            'Nombre_Criterio' => 'required|max:50',
            'Descripcion_Criterio' => 'required|max:255',
        ];
    }
}
