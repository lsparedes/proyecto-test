@extends('layouts.master')

@section('title', 'Usuario')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#1d8eaa28">
                <h4 class=""><a href="{{ route('admin.users') }}" class="btn btn-m  mr-3"><i
                    class="fas fa-arrow-left-long"></i></a>Editar Usuario</h4>
            </div>

            <div class="card-body">
                @if (session('message'))
                    <div class="alert alert-success">{{ session('message') }}</div>
                @endif

                <form method="post" action="{{ url('admin/update-user/' . $user->id) }}">
                    @csrf
                    @method('put')

                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <input type="text" name="name" value="{{ $user->name }}" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="last_name" class="form-label">Apellido:</label>
                        <input type="text" name="last_name" value="{{ $user->last_name }}" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Correo Electrónico:</label>

                        <input type="email" class="form-control" name="email" value="{{ old('email', $user->email) }}">
                        @if ($errors->has('email'))
                            <span class="error text-danger" for="input-email">{{ $errors->first('email') }}</span>
                        @endif

                    </div>

                    <div class="mb-3">
                        <label for="roles" class="form-label">Roles:</label>

                        <div class="form-group">
                            <div class="tab-content">
                                <div class="tab-pane active" id="profile">
                                    <table class="table">
                                        <tbody>
                                            @foreach ($roles as $id => $role)
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox"
                                                                    name="roles[]" value="{{ $id }}"
                                                                    {{ $user->roles->contains($id) ? 'checked' : '' }}>
                                                                <span class="form-check-sign">
                                                                    <span class="check" value=""></span>
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {{ $role }}
                                                    </td>
                                                </tr>
                                            @endforeach
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>

                    <button type="submit" class="btn btn-m btn-primary" style="margin-top: 20px;">Guardar</button>
                </form>
            </div>
        </div>
    </div>

@endsection
