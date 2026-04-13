<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modulo3Part extends Model
{
    use HasFactory;

    protected $table = 'modulo3_parts';

    protected $fillable = [
        'slug',
        'title',
        'description',
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

    public function subtests()
    {
        return $this->hasMany(Modulo3Subtest::class, 'modulo3_part_id');
    }
}
