<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CriterioEvaluacionTestFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // Puedes personalizar la lógica de autorización si es necesario
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id_criterio_evaluacion' => 'required|exists:criterio_evaluacion,id',
            'id_test' => 'required|exists:test,id',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'id_criterio_evaluacion.required' => 'El campo Criterio de Evaluación es obligatorio.',
            'id_criterio_evaluacion.exists' => 'El Criterio de Evaluación seleccionado no es válido.',
            'id_test.required' => 'El campo Test Asociado es obligatorio.',
            'id_test.exists' => 'El Test Asociado seleccionado no es válido.',
        ];
    }
}
