@extends('app')

@section('navbar')
    <!-- Countries -->
    <li class="dropdown">
        <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
            <i class="fa fa-globe white"></i>&nbsp;&nbsp;Country <b class="caret"></b>
        </a>
        <ul class="dropdown-menu">
            <li class="active"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="full-extent-btn"><i class="fa fa-arrow-right"></i>&nbsp;&nbsp;Chile</a></li>
        </ul>
    </li>

    <!-- Cities -->
    <li class="dropdown">
        <a class="dropdown-toggle" href="#" role="button" data-toggle="dropdown"><i class="fa fa-building white"></i>&nbsp;&nbsp;City <b class="caret"></b></a>
        <ul class="dropdown-menu">
            <li class="active"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in"><i class="fa fa-arrow-right"></i>&nbsp;&nbsp;Santiago de Chile</a></li>
        </ul>
    </li>

    @if(Auth::user()->type == 1)
        <!-- Companies -->
        <li class="dropdown">
            <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-university white"></i>&nbsp;&nbsp;Company <b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
                <li class="active"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="watts"><i class="fa fa-arrow-right"></i>&nbsp;&nbsp;Company 1</a></li>
            </ul>
        </li>
    @endif

    @if(Auth::user()->type == 2)
        <li class="dropdown">
            <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-university white"></i>&nbsp;&nbsp;Company <b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
                <li class="active"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="watts"><i class="fa fa-arrow-right"></i>&nbsp;&nbsp;{{ Auth::user()->company_name }}</a></li>
            </ul>
        </li>
    @endif
@stop

@section('content')

    <!-- Mapa -->
    <div id="map"></div>

    <div id="km_panel_container2">
        <div id="km_panel2" class="km_panel" style="display: block;">
            <div class="km_panel_header">
                <div class="km_panel_header_title">Centro, Santiago</div>
                <div class="km_panel_header_actions">
                    <a href="#" class="km_panel_header_action" id="info-2" data-toggle="modal" data-target="#infoModal">
                        <i style="color: #fff" class="fa fa-question-circle"></i>
                    </a>
                    <div class="clear"></div>
                </div>
            </div>
            <div class="km_panel_wrapper">

                <!-- Drop Size -->
                <div class="km_panel_element loading full">
                    <div class="km_panel_element_title">
                        Drop size &nbsp;(anual averages)
                    </div>
                    <div class="km_panel_element_actions">

                    </div>
                    <br>
                    &nbsp;&nbsp;&nbsp;<i class="fa fa-truck fa-3x"></i>
                    <div class="km_panel_element_stat" id="total_drop_client" style="left:70px; width:80px;">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit" style="left: 50px; width: 100px;">
                        per customer
                        <a href="#" class="km_panel_element_action" id="drop_client" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bar-chart"></i>
                        </a>
                        <div class="clear"></div>
                    </div>
                    <div class="km_panel_element_stat second" id="total_drop_stop" style="left:160px; width:100px;">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit second" style="left: 170px; width: 70px;">
                        per stop
                        <a href="#" class="km_panel_element_action" id="drop_stop" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bar-chart"></i>
                        </a>
                        <div class="clear"></div>
                    </div>
                </div>

                <!-- Stops duration -->
                <div class="km_panel_element loading full">
                    <div class="km_panel_element_title">
                        Stop time &nbsp;(anual averages)
                    </div>
                    <div class="km_panel_element_actions">

                    </div>
                    <br>
                    &nbsp;&nbsp;&nbsp;<i class="fa fa-clock-o fa-3x"></i>
                    <div class="km_panel_element_stat" id="total_duration_client" style="left:70px; width:82px;">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit" style="left: 50px; width: 100px;">
                        per customer
                        <a href="#" class="km_panel_element_action" id="duration_client" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bar-chart"></i>
                        </a>
                        <div class="clear"></div>
                    </div>
                    <div class="km_panel_element_stat second" id="total_duration_stop">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit second" style="left: 170px; width: 70px; ">
                        per stop
                        <a href="#" class="km_panel_element_action" id="duration_stop" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bar-chart"></i>
                        </a>
                        <div class="clear"></div>
                    </div>
                </div>


            </div>
        </div>
    </div>

@stop

@section('footer')

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn navbar-btn btn-default" id="btn-1" onclick="location.href='{{ url('traces') }}'">
        Flows
    </button>
    <button class="btn navbar-btn btn-danger" id="btn-2" onclick="location.href='{{ url('truck_stops') }}'" style="margin-left: -3px">
        Stops
    </button>
    <button class="btn navbar-btn btn-default" id="next_view" onclick="location.href='{{ url('optimization') }}'" style="margin-left: -3px">
        Policies
    </button>

    <button class="btn navbar-btn btn-danger" id="btn-layer1" style="width: 100px;margin-left: 28%">
        Normal
    </button>
    <button class="btn navbar-btn btn-default" id="btn-layer2" style="width: 100px;margin-left: -3px">
        Full
    </button>


@stop

@section('modals')
    <div class="modal fade" id="chartModal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="close_chart" class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Chart</h4>
                </div>
                <div class="modal-body" >
                    <center id="chart"></center>
                </div>
            </div>
        </div>
    </div>


    <!--  Modal for infowindow
        ================================================== -->
    <div class="modal fade" id="infoModal" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Infowindow</h4>
                </div>
                <div class="modal-body" >
                    - Average Drop size per customer: Average Kg delivered at a stop divided by number of customers (Kg). Average Drop size per stop: Average Kg delivered at a stop (Kg).<br><br>
                    - Stop time per customer: Average duration of a stop divided by number of clientes (Hours). Average duration of a stop (Hours)
                </div>
            </div>
        </div>
    </div>
@stop

@section('scripts')

    <script>
        // Gloabl variables
        var sublayers = [];        // Array for layers IMPORTANT to change layer dinamically
        var map;                   // Define variable for map

        var map_layer1 = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            zIndex: -10
        });
        var map_layer2   = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            zIndex: -10
        });

        function main() {

            // Instantiate new map object, place it in 'map' element
            map = new L.Map('map', {
                center: [-33.439289, -70.648220],
                zoom: 16
            });

            // Pull tiles from OpenStreetMap
            /*L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             }).addTo(map);*/

            map.addLayer(map_layer1);

            // Use method createLayer to change it dinamically
            cartodb.createLayer(map, 'https://manifar92.cartodb.com/api/v2/viz/adfa1fe8-17ba-11e5-8923-0e9d821ea90d/viz.json', {
                legends: true
            })
                    .addTo(map)
                    .on('done', function(layer) {

                        //Options
                        var subLayerOptions = {
                            sql: "SELECT * FROM stopsfinal",
                            cartocss: '#stopsfinal{marker-fill-opacity: 0.9;marker-line-color: #000000;marker-line-width: 1.5;' +
                            'marker-line-opacity: 1;marker-placement: point;marker-multi-policy: largest;marker-type: ellipse;' +
                            'marker-fill: #D6301D;marker-allow-overlap: true;marker-clip: false;}' +
                            '#stopsfinal [ mean_duration <= 47] {marker-width: 25.0;}#stopsfinal [ mean_duration <= 34] {' +
                            'marker-width: 23.3;}#stopsfinal [ mean_duration <= 32] {marker-width: 21.7;}' +
                            '#stopsfinal [ mean_duration <= 25] {marker-width: 20.0;}#stopsfinal [ mean_duration <= 24] {' +
                            'marker-width: 18.3;}#stopsfinal [ mean_duration <= 21] {marker-width: 16.7;}' +
                            '#stopsfinal [ mean_duration <= 19] {marker-width: 15.0;}#stopsfinal [ mean_duration <= 18] {' +
                            'marker-width: 13.3;}#stopsfinal [ mean_duration <= 16] {marker-width: 11.7;}' +
                            '#stopsfinal [ mean_duration <= 14] {marker-width: 10.0;}'
                        }

                        var sublayer = layer.getSubLayer(2);

                        sublayer.set(subLayerOptions);

                        sublayers.push(sublayer);

                    }).on('error', function(error) {
                        console.warn("Error: "+error);
                    });

        }
        window.onload = main;
    </script>

    <!-- Js for queries -->
    <script src="{{ asset('public/js/queries/stops.js') }}"></script>

    <!-- Charts -->
    <script src="{{ asset('public/js/charts/drop/histogram_per_client.js') }}"></script>
    <script src="{{ asset('public/js/charts/drop/histogram_per_stop.js') }}"></script>
    <script src="{{ asset('public/js/charts/stop/histogram_per_client.js') }}"></script>
    <script src="{{ asset('public/js/charts/stop/histogram_per_stop.js') }}"></script>

    <!-- Charts -->
    <script src="{{ asset('public/js/charts/distance/boxplotdistance.js') }}"></script>
    <script src="{{ asset('public/js/charts/distance/histogramdistance.js') }}"></script>
    <script src="{{ asset('public/js/charts/duration/boxplotduration.js') }}"></script>
    <script src="{{ asset('public/js/charts/duration/histogramduration.js') }}"></script>
    <script src="{{ asset('public/js/charts/speed/boxplotspeed.js') }}"></script>
    <script src="{{ asset('public/js/charts/speed/histogramspeed.js') }}"></script>
    <script src="{{ asset('public/js/charts/emissions/boxplotemissions.js') }}"></script>
    <script src="{{ asset('public/js/charts/emissions/histogramemissions.js') }}"></script>

    <!-- Highcharts libs -->
    <script src="http://code.highcharts.com/highcharts.js"></script>
    <script src="http://code.highcharts.com/highcharts-more.js"></script>
    <script src="http://code.highcharts.com/modules/exporting.js"></script>
    <script src="{{ asset('public/js/charts/highcharts-histogram.js') }}"></script>

    <!-- Range Date Picker -->
    <script type="text/javascript" src="{{ asset('public/js/datePicker/moment/moment.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('public/js/datePicker/daterangepicker.js') }}"></script>

    <script type="text/javascript" src="{{ asset('public/js/styles/changeMaps.js') }}"></script>

    <!-- Lo relacionado con el LeapMotion y el Myo -->
    <script src="{{ asset('public/js/leap-0.6.4.js') }}"></script>
    <script src="{{ asset('public/js/myo.js') }}"></script>

    <script src="{{ asset('public/js/LeapMyoClasses.js') }}"></script>

    <script>
        var pw = document.body.offsetWidth - 20;
        var ph = document.body.offsetHeight - 20;

        console.log("Ancho "+pw+" alto "+ph);

        var nv = document.getElementById('next_view');
        var cc = document.getElementById('close_chart');

        var zonas = new Array();
        zonas[0] = new LeapRegion(document.getElementById('drop_client'), pw-120, pw-105,136,150,true);
        zonas[1] = new LeapRegion(document.getElementById('drop_stop'), pw-25, pw-10,136,150,true);

        zonas[2] = new LeapRegion(document.getElementById('duration_client'), pw-120, pw-105,220,234,true);
        zonas[3] = new LeapRegion(document.getElementById('duration_stop'), pw-25, pw-10,220,234,true);

        var lm = new LeapMyo(pw,ph,nv,cc,null,0,"stops");
        lm.setArrayLeapRegions(zonas);

        //If you have both sensors, myo has to be activated first!!!!
        lm.activateMyo();
        lm.activateLeap();

    </script>
    <!-- Fin de LeapMotion y Myo -->


@stop