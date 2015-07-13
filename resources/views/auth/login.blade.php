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
<body class="login-page" style="background-color: #354046;">

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

        <form class="form-login" action="{{ url('auth/login') }}" method="post">

            <input type="hidden" name="_token" value="{{ csrf_token() }}">

            <div class="login-wrap">

                <h1 align="center">CartoKm2</h1><br><br>

                <input type="email" class="form-control" name="email" value="{{ old('email') }}" placeholder="email..."/>
                <br>
                <input type="password" class="form-control" id="password" name="password" placeholder="password...">
                <br><br>
                <button class="btn btn-primary btn-block btn-flat" type="submit"><i class="fa fa-lock"></i> Login</button>

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
    $.backstretch("http://tecnologias.csf.itesm.mx/cartokm2/public/img/cartodb.png", {speed: 500});
</script>

</body>
</html>