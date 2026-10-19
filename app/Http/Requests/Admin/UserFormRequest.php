<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UserFormRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'second_last_name' => 'nullable|string|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            //'password' => 'required|string|min:8',
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'El nombre es requerido',
            'last_name.required' => 'El primer apellido es requerido',
            'last_name.string' => 'El primer apellido debe ser texto',
            'last_name.max' => 'El primer apellido no debe superar los 255 caracteres',
            'second_last_name.string' => 'El segundo apellido debe ser texto',
            'second_last_name.max' => 'El segundo apellido no debe superar los 255 caracteres',
        ];
    }
}
