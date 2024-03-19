<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class PasswordController extends Controller
{
    public function showChangePasswordForm()
    {
        return view('auth.change-password');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        // Verificar si el usuario está autenticado
        if (Auth::check()) {
            $user = Auth::user();

            // Verificar si la contraseña actual proporcionada coincide con la contraseña almacenada del usuario
            if (!Hash::check($request->current_password, $user->password)) {
                return redirect()->back()->with('error', 'La contraseña actual no es válida.');
            }

            // Verificar si las contraseñas nuevas coinciden
            if ($request->new_password !== $request->new_password_confirmation) {
                return redirect()->back()->with('error', 'Las contraseñas nuevas no coinciden.');
            }

            // Actualizar la contraseña del usuario con la nueva contraseña
            $user->password = Hash::make($request->new_password);
            $user->save();

            // Redirigir al usuario a la página de inicio de sesión con un mensaje de éxito
            return redirect()->route('login')->with('success', '¡Contraseña cambiada correctamente! Por favor, inicia sesión con tu nueva contraseña.');
        } else {
            // Manejar el caso en el que el usuario no esté autenticado
            return redirect()->route('login')->with('error', 'No se pudo cambiar la contraseña.');
        }
    }
}
