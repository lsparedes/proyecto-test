@php
    $hayPreguntas = App\Models\Pregunta::count() > 0;
@endphp


<div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark " id="sidenavAccordion" style="background-color:#292E33">
        <div class="sb-sidenav-menu">
            <div class="nav">
                <div class="sb-sidenav-menu-heading">Inicio</div>
                <a class="nav-link {{ Request::is('/') ? 'active' : '' }}" href="{{ url('/') }}">
                    <div class="sb-nav-link-icon"><i class="fas fa-house"></i></div>
                    Inicio
                </a>
                @can('dashboard')
                    <a class="nav-link {{ Request::is('admin/dashboard') ? 'active' : '' }}"
                        href="{{ route('admin.dashboard') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </a>
                @endcan

                @can('administrador')
                    <div class="sb-sidenav-menu-heading">Datos e info</div>
                    <a class="nav-link {{ Request::is('admin/administrador') ? 'active' : '' }}"
                        href="{{ route('admin.administrador') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-address-book"></i></div>
                        Administrador
                    </a>
                @endcan

                <div class="sb-sidenav-menu-heading">Administracion</div>

                @can('persons')
                    <a class="nav-link {{ Request::is('admin/persons') ? 'active' : '' }}"
                        href="{{ route('admin.persons') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-address-book"></i></div>
                        Personas
                    </a>
                @endcan

                @can('examinador-persona-test')
                    <a class="nav-link {{ Request::is('admin/examinador-persona-test') ? 'active' : '' }}"
                        href="{{ route('admin.examinador-persona-test') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
                        Examinador Persona
                    </a>
                @endcan

                @can('users')
                    <a class="nav-link {{ Request::is('admin/users') ? 'active' : '' }}"
                        href="{{ route('admin.users') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-users"></i></div>
                        Usuarios
                    </a>
                @endcan

                @can('permissions')
                    <a class="nav-link {{ Request::is('admin/permissions') ? 'active' : '' }}"
                        href="{{ route('admin.permissions') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-users-gear"></i></div>
                        Permisos
                    </a>
                @endcan

                @can('roles')
                    <a class="nav-link {{ Request::is('admin/roles') ? 'active' : '' }}"
                        href="{{ route('admin.roles') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-user-lock"></i></div>
                        Roles
                    </a>
                @endcan

                <div class="sb-sidenav-menu-heading">Aplicacion</div>

                @can('tests')
                    <a class="nav-link {{ Request::is('admin/tests') ? 'active' : '' }}"
                        href="{{ route('admin.tests') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-book"></i></div>
                        Test
                    </a>
                @endcan

                @can('tipotest')
                    <a class="nav-link {{ Request::is('admin/tipotest') ? 'active' : '' }}"
                        href="{{ route('admin.tipotest') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                        Tipo Test
                    </a>
                @endcan

                @can('pregunta')
                    <a class="nav-link {{ Request::is('admin/pregunta') ? 'active' : '' }}"
                        href="{{ route('admin.pregunta') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-circle-question"></i></div>
                        Preguntas
                    </a>
                @endcan

                @can('alternativa')
                    <a class="nav-link {{ Request::is('admin/alternativa') ? 'active' : '' }}"
                        href="{{ route('admin.alternativa') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-clipboard-list"></i></div>
                        Alternativas
                    </a>
                @endcan

                @can('preguntas-y-alternativas')
                    <a class="nav-link {{ Request::is('admin/preguntas-y-alternativas') ? 'active' : '' }}"
                        href="{{ route('admin.preguntas-y-alternativas') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-align-justify"></i></div>
                        Preguntas y Alternativas
                    </a>
                @endcan

                @can('respuesta')
                    <a class="nav-link {{ Request::is('admin/respuesta') ? 'active' : '' }}"
                        href="{{ route('admin.respuesta') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                        Respuestas
                    </a>
                @endcan

                <div class="sb-sidenav-menu-heading">Criterios</div>

                @can('criterio-evaluacion')
                    <a class="nav-link {{ Request::is('admin/criterio-evaluacion') ? 'active' : '' }}"
                        href="{{ route('admin.criterio-evaluacion') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                        Criterio Evaluación
                    </a>
                @endcan

                @can('formula')
                    <a class="nav-link {{ Request::is('admin/formula') ? 'active' : '' }}"
                        href="{{ route('admin.formula') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-calculator"></i></div>
                        Fórmula
                    </a>
                @endcan

                @can('metrica')
                    <a class="nav-link {{ Request::is('admin/metrica') ? 'active' : '' }}"
                        href="{{ route('admin.metrica') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-calculator"></i></div>
                        Métrica
                    </a>
                @endcan

                @can('criterio_evaluacion_test')
                    <a class="nav-link {{ Request::is('admin/criterio_evaluacion_test') ? 'active' : '' }}"
                        href="{{ route('admin.criterio_evaluacion_test') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                        Criterio Evaluación Test
                    </a>
                @endcan

            </div>
        </div>

        <div class="sb-sidenav-footer">
            <div class="small">Conectado como:</div>
            {{ auth()->user()->name }}
        </div>
    </nav>
</div>
