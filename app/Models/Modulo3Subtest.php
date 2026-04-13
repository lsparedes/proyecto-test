<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modulo3Subtest extends Model
{
    use HasFactory;

    protected $table = 'modulo3_subtests';

    protected $fillable = [
        'modulo3_part_id',
        'slug',
        'title',
        'subtitle',
        'description',
        'instructions',
        'status',
        'placeholder_note',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function part()
    {
        return $this->belongsTo(Modulo3Part::class, 'modulo3_part_id');
    }
}
