@extends('layouts.master')

@section('title', 'Persona')

@section('content')

<div class="container-fluid px-4">

    <div class="card mt-4">
        <div class="card-header" style="background-color:#1d8eaa28">
            <h4 class=""><a href="{{ route('admin.persons') }}" class="btn btn-m  mr-3"><i
                class="fas fa-arrow-left-long"></i></a>Añadir Persona </h4>
        </div>
        <div class="card-body">


            <form action= "{{ url('admin/add-persons') }}" method="POST" enctype="multipart/form-data" novalidate>
                @csrf

                <div class="mb-3" >
                    <label for="name">Nombre</label>
                    <input type="text" name="name" id="name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="last_name">Apellido</label>
                    <input type="text" name="last_name" id="last_name" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="age">Edad</label>
                    <input type="text" name="age" id="age" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="genre">Genero</label>
                    <input type="text" name="genre" id="genre" class="form-control">
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-m btn-primary" style="margin-top: 20px;">Guardar</button>
                    </div>
                </div>


            </form>

        </div>

    </div>
</div>

@endsection
