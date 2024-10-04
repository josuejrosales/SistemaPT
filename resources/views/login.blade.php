<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    LOGIN view (example)
    <form action="{{ route('LoginIn') }}" method="POST">
        @csrf
        <input type="text" name="email" value="{{ old('email') }}">
        @error('email')
            <p>{{ $message }}</p>
        @enderror
        <input type="password" name="password">
        @error('password')
            <p>{{ $message }}</p>
        @enderror
        <input type="submit" value="login">
    </form>


</body>

</html>
