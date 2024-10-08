<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <style>
        body {
            margin: 0 display: flex;
            align-content: center;
            justify-content: center;
            height: 100vh;
        }

        .container {
            max-width: 320px;
        }

        .card {
            overflow: hidden;
            border-radius: 1rem;
        }

        .card-title {
            padding: 1rem;
        }

        .card-title svg {
            color: #607D8B;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-auto">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title center">
                            @yield('form-title')
                        </span>
                        @yield('form-content')
                    </div>
                    <div class="card-action center">
                        @yield('form-fotter')
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

    @yield('scripts')
</body>

</html>
