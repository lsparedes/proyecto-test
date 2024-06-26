@php
    $hayPreguntas = App\Models\Pregunta::count() > 0;
@endphp


<div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark " id="sidenavAccordion" style="background-color:#292E33">
        <div class="sb-sidenav-menu">
            <div class="nav">
                <div class="sb-sidenav-menu-heading" style="font-size: 16px;">Inicio</div>
                <a class="nav-link {{ Request::is('/') ? 'active' : '' }}" href="{{ url('/') }}">
                    <div class="sb-nav-link-icon"><i class="fas fa-house fa-lg"></i></div>
                    Inicio
                </a>
                @can('dashboard')
                    <a class="nav-link {{ Request::is('admin/dashboard') ? 'active' : '' }}"
                        href="{{ route('admin.dashboard') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt fa-lg"></i></div>
                        Dashboard
                    </a>
                @endcan

                @can('administrador')
                    <div class="sb-sidenav-menu-heading" style="font-size: 16px;">Datos e info</div>
                    <a class="nav-link {{ Request::is('admin/administrador') ? 'active' : '' }}"
                        href="{{ route('admin.administrador') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-address-book fa-lg"></i></div>
                        Administrador
                    </a>
                @endcan

                <div class="sb-sidenav-menu-heading" style="font-size: 16px;">Administración</div>


                @can('users')
                <a class="nav-link {{ Request::is('admin/users*') || Request::is('admin/show*') || Request::is('admin/edit-user*') || Request::is('admin/add-user') ? 'active' : '' }}" href="{{ route('admin.users') }}">
                    <div class="sb-nav-link-icon"><i class="fas fa-users fa-lg"></i></div>
                    Usuarios
                </a>
                @endcan

                @can('persons')
                    <a class="nav-link {{ Request::is('admin/persons') || Request::is('admin/add-persons') || Request::is('admin/edit-person*') ? 'active' : '' }}"
                        href="{{ route('admin.persons') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-address-book fa-lg"></i></div>
                        Personas
                    </a>
                @endcan

                @can('examinador-persona-test')
                    <a class="nav-link {{ Request::is('admin/examinador-persona-test')|| Request::is('admin/add-examinador-persona-test') || Request::is('admin/edit-examinador-persona-test*') ? 'active' : '' }}"
                        href="{{ route('admin.examinador-persona-test') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-users fa-lg"></i></div>
                        Resultados Personas
                    </a>
                @endcan

                @can('permissions')
                    <a class="nav-link {{ Request::is('admin/permissions') || Request::is('admin/permissions/show*') || Request::is('admin/permissions/edit*') || Request::is('admin/permissions/create') ? 'active' : '' }}"
                        href="{{ route('admin.permissions') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-users-gear fa-lg"></i></div>
                        Permisos
                    </a>
                @endcan

                @can('roles')
                    <a class="nav-link {{ Request::is('admin/roles') || Request::is('admin/roles/show*') || Request::is('admin/roles/edit*') || Request::is('admin/roles/create') ? 'active' : '' }}"
                        href="{{ route('admin.roles') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-user-lock fa-lg"></i></div>
                        Roles
                    </a>
                @endcan

                <div class="sb-sidenav-menu-heading" style="font-size: 16px;">Aplicación</div>

                @can('tipotest')
                    <a class="nav-link {{ Request::is('admin/tipotest') || Request::is('admin/add-tipotest') || Request::is('admin/edit-tipotest*') ? 'active' : '' }}"
                        href="{{ route('admin.tipotest') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open fa-lg fa-lg"></i></div>
                        Tipo Test
                    </a>
                @endcan

                @can('tests')
                <a class="nav-link {{ Request::is('admin/tests') || Request::is('admin/add-tests') || Request::is('admin/edit-tests*') ? 'active' : '' }}"
                    href="{{ route('admin.tests') }}">
                    <div class="sb-nav-link-icon"><i class="fas fa-book fa-lg"></i></div>
                    Test
                </a>
            @endcan

                @can('pregunta')
                    <a class="nav-link {{ Request::is('admin/pregunta') || Request::is('admin/add-pregunta') || Request::is('admin/edit-pregunta*') ? 'active' : '' }}"
                        href="{{ route('admin.pregunta') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-circle-question fa-lg"></i></div>
                        Preguntas
                    </a>
                @endcan

                @can('alternativa')
                    <a class="nav-link {{ Request::is('admin/alternativa') || Request::is('admin/edit-alternativa*') || Request::is('admin/add-alternativa') ? 'active' : '' }}"
                        href="{{ route('admin.alternativa') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-clipboard-list fa-lg"></i></div>
                        Alternativas
                    </a>
                @endcan

                @can('preguntas-y-alternativas')
                    <a class="nav-link {{ Request::is('admin/preguntas-y-alternativas') ? 'active' : '' }}"
                        href="{{ route('admin.preguntas-y-alternativas') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-align-justify fa-lg"></i></div>
                        Preguntas y Alternativas
                    </a>
                @endcan

                @can('respuesta')
                    <a class="nav-link {{ Request::is('admin/respuesta') || Request::is('admin/edit-respuesta*') || Request::is('admin/add-respuesta') ? 'active' : '' }}"
                        href="{{ route('admin.respuesta') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open fa-lg"></i></div>
                        Respuestas
                    </a>
                @endcan

                <div class="sb-sidenav-menu-heading" style="font-size: 16px;">Criterios</div>

                @can('criterio-evaluacion')
                    <a class="nav-link {{ Request::is('admin/criterio-evaluacion') || Request::is('admin/edit-criterio-evaluacion*') || Request::is('admin/add-criterio-evaluacion') ? 'active' : '' }}"
                        href="{{ route('admin.criterio-evaluacion') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open fa-lg"></i></div>
                        Criterio Evaluación
                    </a>
                @endcan

                @can('formula')
                    <a class="nav-link {{ Request::is('admin/formula') || Request::is('admin/edit-formula*') || Request::is('admin/add-formula') ? 'active' : '' }}"
                        href="{{ route('admin.formula') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-calculator fa-lg"></i></div>
                        Fórmula
                    </a>
                @endcan

                @can('metrica')
                    <a class="nav-link {{ Request::is('admin/metrica') || Request::is('admin/edit-metrica*') || Request::is('admin/add-metrica') ? 'active' : '' }}"
                        href="{{ route('admin.metrica') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-calculator fa-lg"></i></div>
                        Métrica
                    </a>
                @endcan

                @can('criterio_evaluacion_test')
                    <a class="nav-link {{ Request::is('admin/criterio_evaluacion_test') || Request::is('admin/edit-criterio_evaluacion_test*') || Request::is('admin/add-criterio_evaluacion_test') ? 'active' : '' }}"
                        href="{{ route('admin.criterio_evaluacion_test') }}">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open fa-lg"></i></div>
                        Criterio Evaluación Test
                    </a>
                @endcan

            </div>
        </div>

        <div class="sb-sidenav-footer">
            <div class="small">Conectado como:</div><i class="fas fa-user fa-fw"></i>
            {{ auth()->user()->name }}
        </div>
    </nav>
</div>
