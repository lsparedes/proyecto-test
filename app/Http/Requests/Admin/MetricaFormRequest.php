<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class MetricaFormRequest extends FormRequest
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
            'nombre_metrica' => 'required|string|max:50',
            'peso_metrica' => 'required|numeric',
            'descripcion_metrica' => 'nullable|string|max:255',
            'id_criterio_evaluacion' => 'required|exists:criterio_evaluacion,id',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'id_criterio_evaluacion.exists' => 'El criterio de evaluación seleccionado no es válido.',
        ];
    }
}
