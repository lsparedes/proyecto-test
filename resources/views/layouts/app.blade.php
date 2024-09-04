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
 <!-- Script de busqueda test frontpage-->
 <script>
        $(document).ready(function() {
            function getEndTime(key) {
                const endTime = localStorage.getItem(key);
                return endTime ? new Date(endTime) : null;
            }

            const endTimeExecution = getEndTime('endTimeExecution');
            const endTimeExecution2 = getEndTime('endTimeExecution2');
            const endTimeExecution3 = getEndTime('endTimeExecution3');

            // Duraciones en segundos
            const durationExecution = 600; // 10 minutos
            const durationExecution2 = 600; // 10 minutos
            const durationExecution3 = 1200; // 20 minutos

            // Ajusta las fechas de finalización según la duración
            const endTimes = [
                endTimeExecution ? new Date(endTimeExecution.getTime() + durationExecution * 1000) : null,
                endTimeExecution2 ? new Date(endTimeExecution2.getTime() + durationExecution2 * 1000) : null,
                endTimeExecution3 ? new Date(endTimeExecution3.getTime() + durationExecution3 * 1000) : null
            ];

            const now = new Date();

            // Determinar el mayor tiempo de espera
            const maxEndTime = endTimes.reduce((max, endTime) => {
                return endTime && (max === null || endTime > max) ? endTime : max;
            }, null);

            if (maxEndTime) {
                const timeRemaining = (maxEndTime - now) / 1000; // Tiempo restante en segundos

                if (timeRemaining > 0) {
                    setTimeout(() => {
                        playBeepSound();
                    }, timeRemaining * 1000);
                } else {
                    playBeepSound();
                }
            }

            function playBeepSound() {
                const beep = new Audio('/assets/audio/beep.wav');
                beep.addEventListener('loadedmetadata', () => {
                    beep.play().then(() => {
                        // Clear the localStorage after playing the sound
                        localStorage.removeItem('endTimeExecution');
                        localStorage.removeItem('endTimeExecution2');
                        localStorage.removeItem('endTimeExecution3');
                    }).catch(error => {
                        console.error("Error al reproducir el sonido: ", error);
                    });
                });

                beep.addEventListener('error', (e) => {
                    console.error("Error al cargar el audio: ", e);
                });
            }

            // Tu código existente para búsqueda y filtrado de tarjetas
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
        });
</script>
    <div class="global-footer">
        <!-- Pie de página -->
        <!--@include('layouts.inc.frontend-footer')-->
    </div>

</body>

</html>