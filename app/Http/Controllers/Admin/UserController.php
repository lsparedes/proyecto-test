<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\Admin\UserFormRequest;
use App\Http\Requests\Admin\UserEditRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('users'), 403);
        $users = User::all();
        return view('admin.user.index', compact('users'));
    }

    public function edit(User $user)
    {
        abort_if(Gate::denies('edit-user'), 403);
        $roles = Role::all()->pluck('name', 'id');
        $user->load('roles');

        return view('admin.user.edit', compact('user', 'roles'));
    }

    public function update(UserEditRequest $request, User $user)
    {
        $data = $request->only('name', 'last_name', 'email');
        $password = $request->input('password');
        if ($password) {
            $data['password'] = bcrypt($password);
        }

        $user->update($data);

        $roles = $request->input('roles', []);
        $user->syncRoles($roles);

        return redirect()->route('admin.show-user', $user->id)->with('success', 'Usuario actualizado correctamente');
    }

    public function store(UserFormRequest $request)
    {
        $password = $this->generateRandomPassword();

        $user = User::create([
            'name' => $request->input('name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => bcrypt($password),
        ]);

        $roles = $request->input('roles', []);
        $user->syncRoles($roles);

        $this->sendWelcomeEmail($user, $password);

        return redirect()->route('admin.users')->with('message', 'Usuario creado exitosamente');
    }

    public function create()
    {
        abort_if(Gate::denies('add-user'), 403);
        $roles = Role::all()->pluck('name', 'id');

        return view('admin.user.create', compact('roles'));
    }

    public function show(User $user)
    {
        abort_if(Gate::denies('show-user'), 403);
        $user->load('roles');
        return view('admin.user.show', compact('user'));
    }

    public function destroy(User $user)
    {
        abort_if(Gate::denies('delete-user'), 403);
        if (auth()->user()->id == $user->id) {
            return redirect()->route('admin.users')->with('error', 'No puedes eliminar tu propia cuenta');
        }

        $user->delete();
        return back()->with('success', 'Usuario eliminado correctamente');
    }

    private function generateRandomPassword($length = 8)
    {
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    private function sendWelcomeEmail($user, $password)
    {
        Mail::send('emails.welcome', ['email' => $user->email, 'password' => $password], function ($message) use ($user) {
            $message->to($user->email)->subject('¡Bienvenido a la plataforma!');
        });
    }
}
