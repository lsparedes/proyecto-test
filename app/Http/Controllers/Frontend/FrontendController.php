<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Test;
use Illuminate\Support\Facades\Schema;

class FrontendController extends Controller
{
    public function index(Request $request)
    {
        $modulo = (int) $request->get('modulo', 1);

        if (!in_array($modulo, [1, 2, 3])) {
            $modulo = 1;
        }

        // Obtener solo los tests del módulo seleccionado y ordenar por num_test
        $query = Test::with('tipoTest');

        if (Schema::hasColumn('test', 'modulo')) {
            $query->where('modulo', $modulo);
        }

        $tests = $query->get()->sortBy('tipoTest.num_test');

        $IDparticipante = session('id_participante');

        return view('frontend.index', compact('tests', 'modulo', 'IDparticipante'));
    }

    public function infotest($id)
    {
        $test = Test::find($id);

        if (!$test) {
            abort(404);
        }

        $tipoTest = $test->tipoTest;
        $IDparticipante = session('id_participante');

        return view('frontend.infotest', compact('test', 'tipoTest', 'IDparticipante'));
    }

    public function getUserInfo()
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        $fullName = trim($user->name . ' ' . $user->last_name);
        $initials = collect(preg_split('/\s+/', $fullName, -1, PREG_SPLIT_NO_EMPTY))
            ->map(function ($part) {
                return mb_strtoupper(mb_substr($part, 0, 1));
            })
            ->implode('');

        return response()->json([
            'name' => $user->name,
            'last_name' => $user->last_name,
            'initials' => $initials,
            'role' => $user->roles->pluck('name')->first(),
        ]);
    }
}
