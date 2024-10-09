<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    @viteReactRefresh
    @vite('resources/js/app_dashboard.js')
</head>

<body>
    <div id="root"></div>
    {{-- <div id="modal-root"></div> --}}

    @if (session('auth_token'))
        <script>
            window.auth_token = "{{ session('auth_token') }}";
        </script>
    @else
        <script>
            delete window.auth_token;
        </script>
    @endif
</body>

</html>
