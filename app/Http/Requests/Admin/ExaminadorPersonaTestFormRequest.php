<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ExaminadorPersonaTestFormRequest extends FormRequest
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
            'users_id' => 'required|exists:users,id',
            'test_id' => 'required|exists:test,id',
            'persons_id' => 'required|exists:persons,id',
            'observacion' => 'required|string',
            'fecha_observacion' => 'required|date',
            'fecha_termino' => 'nullable|date',
            'puntuacion' => 'nullable|numeric',
            'duracion' => 'nullable|numeric',
            'csv_path' => 'nullable|file|mimes:csv,txt',
            'image_path' => 'nullable|array',
            'image_path.*' => 'file|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'audio_path' => 'nullable|array',
            'audio_path.*' => 'file|mimes:mp3,wav,ogg|max:10240', 
        ];
    }
}
