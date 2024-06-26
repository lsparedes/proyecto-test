<head>
    <!-- Otros elementos head... -->
    <link rel="stylesheet" href="{{ asset('ruta/a/tu/styles.css') }}">
</head>



<nav class="sb-topnav-fixed navbar navbar-expand navbar-dark bg-dark fixed-top">
    <div class="container px-5">
        <a class="navbar-brand " href="{{ url('/') }}">
            <img src="{{ asset('assets/logo/logo3.png') }}" alt="Logo" width="220" height="42"
                class="d-inline-block align-top"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span
                class="navbar-toggler-icon"></span></button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item"><a class="nav-link active" aria-current="page"
                        href="{{ url('/') }}" style="font-size: 17px;">Inicio</a></li>

                @guest
                    @if (Route::has('login'))
                        <li class="nav-item ">
                            <a class="nav-link btn btn-secondary" href="{{ route('login') }}" style="font-size: 18px;">{{ __('Iniciar sesión') }}</a>

                        </li>
                    @endif
                @else
                    <li class="nav-item dropdown" >
                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre style="font-size: 17px;"><i class="fas fa-user fa-fw"></i>
                            {{ Auth::user()->name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            @can('dashboard')
                                <li> <a class="dropdown-item" href="{{ url('/admin/dashboard') }}">
                                        {{ __('Dashboard') }}
                                    </a>
                                </li>
                            @endcan
                            <li> <a class="dropdown-item" href="{{ route('password.change') }}">
                                    {{ __('Cambiar Contraseña') }}
                                </a>
                            </li>
                            <li><a class="dropdown-item" href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                             document.getElementById('logout-form').submit();">
                                    {{ __('Cerrar sesión') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                            </li>
                        </ul>
                    </li>
                @endguest
            </ul>
        </div>
    </div>
</nav>
