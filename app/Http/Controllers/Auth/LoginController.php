<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = RouteServiceProvider::HOME;

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Sobrescribe el método login para incluir la validación del id_participante.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        // Validar las credenciales incluyendo el id_participante
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
            'id_participante' => ['required'],
        ]);

        // Si la autenticación es exitosa, guarda el id_participante en la sesión
        if ($this->attemptLogin($request)) {
            session(['id_participante' => $request->input('id_participante')]);
            return $this->sendLoginResponse($request);
        }

        // Si falla, devuelve al usuario a la página de login con errores
        return $this->sendFailedLoginResponse($request);
    }

    /**
     * Sobrescribe el método logout para eliminar el id_participante de la sesión.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        // Borra el id_participante de la sesión
        $request->session()->forget('id_participante');
        
        // Continúa con el proceso normal de cierre de sesión
        $this->guard()->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return $this->loggedOut($request) ?: redirect('/');
    }
}
