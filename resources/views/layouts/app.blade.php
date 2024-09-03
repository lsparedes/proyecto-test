<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'NeuroCogTest') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" crossorigin="anonymous" />
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
        // Búsqueda y filtrado de tarjetas
        var testContainer = $("#testContainer");
        var originalOrder = testContainer.children('.col-md-4').clone(); 

        $("#searchInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();

            var visibleCards = originalOrder.filter(function() {
                var cardText = $(this).text().toLowerCase();
                return cardText.indexOf(value) > -1;
            }).clone();

            testContainer.empty().append(visibleCards);
        });

        document.addEventListener('click', () => {
            iniciarTemporizador();
        }, { once: true });

        function iniciarTemporizador() {
            let endTimeExecution = localStorage.getItem('endTimeExecution');
            let beepPlayed = localStorage.getItem('beepPlayed'); 
            let currentTime = new Date();

            if (!beepPlayed) {
                if (endTimeExecution) {
                    endTimeExecution = new Date(endTimeExecution);
                    let timeElapsed = currentTime - endTimeExecution;

                    console.log(`Tiempo transcurrido desde el fin de la ejecución: ${timeElapsed} ms`);

                    if (timeElapsed >= 0 && timeElapsed < 30 * 1000) {
                        setTimeout(() => {
                            playBeepSound();
                            localStorage.removeItem('endTimeExecution');
                            localStorage.setItem('beepPlayed', true); 
                        }, 30 * 1000 - timeElapsed);
                    } else {
                        console.log("El tiempo ya ha pasado. Reproduciendo sonido inmediatamente.");
                        playBeepSound();
                        localStorage.removeItem('endTimeExecution');
                        localStorage.setItem('beepPlayed', true); 
                    }
                } else {
                    console.log("No se encontró 'endTimeExecution' en localStorage. Estableciendo nuevo tiempo de ejecución.");
                    endTimeExecution = new Date(currentTime.getTime() + 30 * 1000);
                    localStorage.setItem('endTimeExecution', endTimeExecution.toISOString());

                    setTimeout(() => {
                        playBeepSound();
                        localStorage.removeItem('endTimeExecution');
                        localStorage.setItem('beepPlayed', true); 
                    }, 30 * 1000);
                }
            }
        }
        function playBeepSound() {
            const beep = new Audio('{{ asset('assets/audio/beep.wav') }}');
            beep.play().catch(error => console.error("Error al reproducir el sonido:", error));
        }
    });
</script>

    <div class="global-footer">
        <!-- Pie de página -->
        <!--@include('layouts.inc.frontend-footer')-->
    </div>

</body>

</html>
