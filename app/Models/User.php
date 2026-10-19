<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Spatie\Permission\Traits\HasRoles;


class User extends Authenticatable
{
    use HasFactory, Notifiable;
    use HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table = 'users';

    protected $fillable = [
        'name', 'last_name', 'second_last_name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Iniciales del examinador (NAA = Nombre, Apellido, Apellido) usadas en el nombre de
     * los archivos descargados: inicial del primer nombre + inicial del primer apellido +
     * inicial del segundo apellido, en mayusculas y sin tildes (Á -> A, Ñ -> N).
     * Usuarios antiguos sin segundo apellido registrado: se usan las dos primeras palabras
     * de last_name (p. ej. "Figueroa Ulloa" -> F y U).
     */
    public function examinerInitials(): string
    {
        $nameWords = preg_split('/\s+/', trim((string) $this->name), -1, PREG_SPLIT_NO_EMPTY);
        $lastName = trim((string) $this->last_name);
        $secondLastName = trim((string) $this->second_last_name);

        if ($secondLastName !== '') {
            $surnames = [$lastName, $secondLastName];
        } else {
            $surnames = array_slice(preg_split('/\s+/', $lastName, -1, PREG_SPLIT_NO_EMPTY), 0, 2);
        }

        return collect(array_merge([$nameWords[0] ?? ''], $surnames))
            ->map(function ($part) {
                $letters = preg_replace('/[^A-Za-z]/', '', Str::ascii((string) $part));

                return $letters === '' ? '' : strtoupper($letters[0]);
            })
            ->implode('');
    }
}
