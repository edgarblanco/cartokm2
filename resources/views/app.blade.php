<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">

    <title>CartoDB - KM2</title>

    <link rel="stylesheet" href="{{ asset('public/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('public/css/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('public/css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('public/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('public/css/km.css') }}">

    <!-- Date pick selector style -->
    <link rel="stylesheet" type="text/css" href="{{ asset('public/css/daterangepicker-bs3.css') }}" />
    <!-- Panel -->
    <link rel="stylesheet" href="{{ asset('public/css/km.css') }}">
    <!-- Carto Js styles -->
    <link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/3.14/themes/css/cartodb.css" />
    <!-- Multiselect jQuery Range -->
    <link rel="stylesheet" href="{{ asset('public/css/bootstrap-multiselect.css') }}" type="text/css"/>

    <style>
        /* Must be charged after cartodb js is fully load */
        .leaflet-top .leaflet-control{
            margin-top: 60px;
        }
        div.cartodb-legend-stack{
            margin-bottom: 30px;
        }
        /*rectangle buttons*/
        * {
            -webkit-border-radius: 0 !important;
            -moz-border-radius: 0 !important;
            border-radius: 0 !important;
        }
        div.cartodb-timeslider{
            width: 500px !important;
            margin-bottom: 40px !important;
        }
    </style>

</head>

<body>
<!--  Navbar
    ================================================== -->
<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <div class="navbar-icon-container">
                <a href="#" class="navbar-icon pull-right visible-xs" id="nav-btn"><i class="fa fa-bars fa-lg white"></i></a>
                <a href="#" class="navbar-icon pull-right visible-xs" id="sidebar-toggle-btn"><i class="fa fa-search fa-lg white"></i></a>
            </div>
            <a class="navbar-brand" href="#">CartoKm2</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">

                @yield('navbar')

            </ul>

            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <span class="hidden-xs">
                        @if(Auth::user())
                            {{ Auth::user()->name }}
                            {{ Auth::user()->last_name }}
                        @endif
                    </span>
                        &nbsp;&nbsp;&nbsp;<i class="fa fa-user "></i><span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li class="user-footer">
                            <a href="{{ url('auth/logout') }}" class="btn btn-default btn-flat">Sign out</a>
                        </li>
                    </ul>
                </li>
            </ul>

        </div><!--/.navbar-collapse -->
    </div>
</div>

<div id="container">

    @yield('content')

</div>

<!--  Bottom Nav bar
    ================================================== -->
<nav id="footer" class="navbar navbar-inverse navbar-fixed-bottom" role="navigation">

    @yield('footer')

</nav>

@yield('modals')

<script src="{{ asset('public/js/jQuery-2.1.3.min.js') }}"></script>
<script src="{{ asset('public/js/bootstrap.min.js') }}"></script>

<!-- Multiselect -->
<script type="text/javascript" src="{{ asset('public/js/bootstrap-multiselect.js') }}"></script>

<!-- Carto DB JS -->
<script src="http://libs.cartocdn.com/cartodb.js/v3/3.14/cartodb.js"></script>


@yield('scripts')

</body>
</html>
