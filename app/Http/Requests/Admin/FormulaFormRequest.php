<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class FormulaFormRequest extends FormRequest
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
            'nombre_formula' => 'required|string|max:255',
            'expresion_formula' => 'required|string|max:255',
            'peso_formula' => 'required|numeric',
            'id_criterio_evaluacion' => 'required|exists:criterio_evaluacion,id',
        ];
    }

  
}
