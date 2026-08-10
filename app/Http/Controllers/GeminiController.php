<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GeminiController extends Controller
{
    public function generarTexto(Request $request)
    {
        $prompt = $request->input('prompt', 'Hola Gemini, ¿estás funcionando?');
        $apiKey = config('services.gemini.api_key');

        $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $prompt]
                    ]
                ]
            ]
        ]);

        if ($response->failed()) {
            return response()->json(['error' => $response->body()], 500);
        }

        $resultado = $response->json('candidates.0.content.parts.0.text');

        return response()->json(['respuesta' => $resultado]);
    }
}