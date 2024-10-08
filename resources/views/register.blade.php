@extends('layouts.base-form')

@section('form-title')
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-person-fill-add"
        viewBox="0 0 16 16">
        <path
            d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
        <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
    </svg>
@endsection

@section('form-content')
    <form action="/register" method="POST">
        @csrf
        <div class="input-field">
            <input id="name" type="text" name="name"
                class="validate  {{ $errors->has('name') ? 'invalid' : false }}" value="{{ old('name') }}" >
            <label for="name">Nombre</label>
            @error('name')
                <small class="helper-text" id="passwordError" style="color: red">{{ $message }}</small>
            @enderror
        </div>
        <div class="input-field">
            <input id="email" type="text" name="email"
                class="validate  {{ $errors->has('email') ? 'invalid' : false }}" value="{{ old('email') }}" >
            <label for="email">Usuario</label>
            @error('email')
                <small class="helper-text" id="passwordError" style="color: red">{{ $message }}</small>
            @enderror
        </div>
        <div class="input-field">
            <input id="password" type="password" name="password"
                class="validate {{ $errors->has('password') ? 'invalid' : false }}" >
            <label for="password">Contraseña</label>
            @error('password')
                <small class="texts" style="color: red">{{ $message }}</small>
            @enderror
        </div>
        <div class="input-field">
            <input id="confirm-password" type="password" name="password_confirmation"
                class="validate {{ $errors->has('password') ? 'invalid' : false }}" >
            <label for="confirm-password">Confirmar contraseña</label>
            @error('password')
                <small class="texts" style="color: red">{{ $message }}</small>
            @enderror
        </div>

        <div class="center">
            <button class="btn waves-effect waves-light blue" type="submit" name="action">
                Registrar
            </button>
        </div>
    </form>
@endsection

@section('form-fotter')
    <span>Ya tienes una cuenta ? </span> <br>
    <a href="/login" class="blue-text">Ingresar</a>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            @if (session('error'))
                M.toast({
                    html: '{{ session('error') }}',
                    classes: 'red'
                });
            @endif
        });
    </script>
@endsection
