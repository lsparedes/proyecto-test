@extends('layouts.master')

@section('title', 'Agregar Usuario')

@section('content')

    <div class="container-fluid px-4">

        <div class="card mt-4">
            <div class="card-header" style="background-color:#e1ecec">
                <h4 class="">Agregar Usuario</h4>
            </div>

            <div class="card-body">
                @if (session('message'))
                    <div class="alert alert-success">{{ session('message') }}</div>
                @endif

                <form action="{{ route('admin.store-user') }}" method="post">
                    @csrf
                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre:</label>
                        <input type="text" name="name" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="col-sm-2 col-form-label">Correo</label>

                            <input type="email" class="form-control" name="email"
                                value="{{ old('email') }}">
                            @if ($errors->has('email'))
                                <span class="error text-danger" for="input-email">{{ $errors->first('email') }}</span>
                            @endif

                    </div>



                    <div class="mb-3">
                        <label for="roles" class="form-label">Roles:</label>
                        <div class="col-sm-7">
                            <div class="form-group">
                                <div class="tab-content">
                                    <div class="tab-pane active">
                                        <table class="table">
                                            <tbody>
                                                @foreach ($roles as $id => $role)
                                                <tr>
                                                    <td>
                                                        <div class="form-check">
                                                            <label class="form-check-label">
                                                                <input class="form-check-input" type="checkbox" name="roles[]"
                                                                value="{{ $id }}" {{ is_array(old('roles')) && in_array($id, old('roles')) ? 'checked' : '' }}>
                                                                <span class="form-check-sign">
                                                                    <span class="check"></span>
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
                    </div>


                    <button type="submit" class="btn btn-sm btn-primary">Guardar</button>
                </form>
            </div>
        </div>
    </div>

@endsection
