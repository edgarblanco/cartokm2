<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>

    <title>CartoKm2</title>

    <!-- Bootstrap -->
    <link href="{{ asset('public/css/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />
    <!-- Font Awesome Icons -->
    <link href="{{ asset('public/css/font-awesome.min.css') }}" rel="stylesheet" type="text/css" />
    <!-- Custom styles for this template -->
    <link href="{{ asset('public/css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('public/css/style-responsive.css') }}" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->

</head>
<body class="login-page">

<!-- MAIN CONTENT -->

<div id="login-page">
    <div class="container">

        @if (count($errors) > 0)
            <div class="alert alert-danger">
                <strong>Whoops!</strong> There was a problem with the login<br><br>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif


        <form class="form-login" role="form" method="POST" action="{{ url('auth/register') }}">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <br>
            <h4> &nbsp;&nbsp;&nbsp; Register:</h4>

            <div class="login-wrap">
                <input type="text" class="form-control" name="name" placeholder="Name...">
                <br>
                <input type="text" class="form-control" name="last_name" placeholder="Last name..." >
                <br>
                <input type="text" class="form-control" name="company_name" placeholder="Company name..." >
                <br>
                <input type="text" class="form-control" name="email" placeholder="Email...">
                <br>
                <input type="password" class="form-control" name="password" placeholder="Password...">
                <br>
                <input type="password" class="form-control" name="password_confirmation" placeholder="Confirm password...">
                <br>
                <button class="btn btn-primary btn-block" type="submit"><i class="fa fa-check"></i> Register</button>
                <br>
                <a href="{{ url('auth/login') }}">Return</a>

            </div>
        </form>

    </div>
</div>


<!-- jQuery 2.1.3 -->
<script src="{{ asset('public/js/jQuery-2.1.3.min.js') }}"></script>
<!-- Bootstrap 3.3.2 JS -->
<script src="{{ asset('public/js/bootstrap.min.js') }}" type="text/javascript"></script>

<!--BACKSTRETCH-->
<!-- You can use an image of whatever size. This script will stretch to fit in any screen size.-->
<script type="text/javascript" src="{{ asset('public/js/jquery.backstretch.min.js') }}"></script>
<script>
    $.backstretch("http://tecnologias.csf.itesm.mx/feria-ingenieria/proyectos/public/img/bg_login.jpg", {speed: 500});
</script>

</body>
</html>