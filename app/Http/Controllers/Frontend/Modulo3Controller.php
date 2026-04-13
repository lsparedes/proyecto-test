<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Modulo3Part;
use App\Models\Modulo3Subtest;

class Modulo3Controller extends Controller
{
    public function index()
    {
        $parts = Modulo3Part::query()
            ->where('is_active', true)
            ->withCount(['subtests' => function ($query) {
                $query->where('is_active', true);
            }])
            ->orderBy('sort_order')
            ->get();

        return view('frontend.modulo3.index', compact('parts'));
    }

    public function showPart(Modulo3Part $part)
    {
        abort_unless($part->is_active, 404);

        $part->load(['subtests' => function ($query) {
            $query->where('is_active', true)->orderBy('sort_order');
        }]);

        return view('frontend.modulo3.part', compact('part'));
    }

    public function showSubtest(Modulo3Subtest $subtest)
    {
        $subtest->load('part');

        abort_unless($subtest->is_active && $subtest->part && $subtest->part->is_active, 404);

        return view('frontend.modulo3.subtest', compact('subtest'));
    }
}
