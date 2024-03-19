<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'NeuroTest') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        crossorigin="anonymous" />
    <!-- Styles -->
    <link href="{{ asset('assets/css/styles.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/css/headers.css') }}" rel="stylesheet">



</head>

<body>
    <div id="app">
        @include('layouts.inc.frontend-navbar')

        <div>
            <main>
                @yield('content')
            </main>
        </div>

    </div>

    <!-- Scripts -->
    <script src="{{ asset('assets/js/jquery-3.6.0.min.js') }}" defer></script>
    <script src="{{ asset('assets/js/bootstrap.bundle.min.js') }}" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>


    <!-- Script de busqueda test frontpage-->
    <script>
        $(document).ready(function() {
            var testContainer = $("#testContainer");
            var originalOrder = testContainer.children('.col-md-4').clone(); // Copia del orden original

            $("#searchInput").on("keyup", function() {
                var value = $(this).val().toLowerCase();

                // Filtrar y ocultar las tarjetas que no coinciden con la búsqueda
                var visibleCards = originalOrder.filter(function() {
                    var cardText = $(this).text().toLowerCase();
                    return cardText.indexOf(value) > -1;
                }).clone();

                // Restaurar el orden original y mostrar las tarjetas coincidentes
                testContainer.empty().append(visibleCards);
            });
        });
    </script>





    <div class="global-footer">
        <!-- Pie de página -->
        <!--@include('layouts.inc.frontend-footer')-->
    </div>

</body>

</html>
