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

    <!-- Policies -->
    <li class="dropdown">
        <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
            <i class="fa fa-user-plus white"></i>&nbsp;&nbsp;Policy <b class="caret"></b>
        </a>
        <ul class="dropdown-menu">
            <li class="active"><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" id="del_base"><i class="fa fa-arrow-right"></i>&nbsp;&nbsp;Delivery base</a></li>
        </ul>
    </li>

    <!-- Parking Spaces -->
    <li class="navbar-form">
        <div class="form-group has-feedback" style="margin-top:5px;">
            <label class="white"><i class="fa fa-street-view white"></i>&nbsp;&nbsp;Available delivery bays&nbsp;</label>
            <input type="number" id="p" size="2" min="1" max="25" value="1" >
            <input type="button" id="p_btn" value="update">
        </div>
    </li>

@stop

@section('content')

    <!-- Mapa -->
    <div id="map"></div>

    <!-- Insights box  -->
    <div id="km_panel_container">
        <div style="display: block;" class="km_panel" id="km_panel3">
            <div class="km_panel_header">
                <div class="km_panel_header_title">
                    Policy Evaluation <span id="no_bays"> - 1 bay</span>
                </div>
                <div class="km_panel_header_actions">
                    <a href="#" class="km_panel_header_action" id="info-3" data-toggle="modal" data-target="#infoModal">
                        <i style="color: #fff" class="fa fa-question-circle"></i>
                    </a>
                    <div class="clear"></div>
                </div>
            </div>
            <a href="#" class="km_panel_element_action" id="charts-3" data-toggle="modal" data-target="#chartModal" style="margin-right: 20px;">
                <i class="fa fa-bar-chart"></i>
            </a>
            <div class="km_panel_separator">
                <h1 style="text-align: right;" class="km_panel_separator_title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Base line &nbsp; &nbsp; Vs &nbsp; &nbsp; Scenario  &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; </h1>
            </div>
            <div class="km_panel_wrapper">

                <!-- Truck traffic -->
                <div class="km_panel_element loading full" style="border-bottom: none;">
                    <div class="km_panel_element_title">
                        Distance
                    </div>
                    <div class="km_panel_element_actions">
                        <div class="clear"></div>
                    </div>
                    <br><br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-truck fa-3x"></i>
                    <div class="km_panel_element_stat" id="truck_base_distance" style="left: 70px; width: 78px; border-right: 1px solid #000; margin-top: 10px;">
                        11,228 km
                    </div>
                    <div class="km_panel_element_unit">
                        <!--Km-->
                    </div>
                    <div class="km_panel_element_stat second" id="truck_opt_distance" style="left: 160px; width: 140px; margin-top: 10px;">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit second" id="truck_percent" style="margin-top: 10px;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <!--Km-->
                    </div>
                </div>

                <!-- Pedestrian traffic -->
                <div class="km_panel_element loading full">
                    <div class="km_panel_element_actions">
                        <div class="clear"></div>
                    </div>
                    <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="http://tecnologias.csf.itesm.mx/cartokm2/public/img/walk.png" style="color:#797979; width: 40px;">
                    <!--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-user fa-3x"></i>-->
                    <div class="km_panel_element_stat" id="pedestrian_base_distance" style="left: 70px; width: 78px; border-right: 1px solid #000;">
                        14,876 km
                    </div>
                    <div class="km_panel_element_unit">
                        <!--Km-->
                    </div>
                    <div class="km_panel_element_stat second" id="pedestrian_opt_distance" style="left: 160px; width: 140px;">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit second" id="walking_percent">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <!--Km-->
                    </div>
                </div>

                <!-- CO2 Emmisions -->
                <div class="km_panel_element loading full">
                    <div class="km_panel_element_title">CO2 Emmisions</div>
                    <div class="km_panel_element_actions">
                        <div class="clear"></div>
                    </div>
                    <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-leaf fa-3x"></i>
                    <div class="km_panel_element_stat" id="co2_base" style="left: 70px; width: 78px; border-right: 1px solid #000;">
                        6.65 kg
                    </div>
                    <div class="km_panel_element_unit">
                        <!--Kg-->
                    </div>
                    <div class="km_panel_element_stat second" id="co2_opt" style="left: 160px; width: 140px;">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit second" id="co2_percent">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <!--Kg-->
                    </div>
                </div>

                <!-- Carbon Dioxide Gas Emissions -->
                <div class="km_panel_element loading full">
                    <div class="km_panel_element_title">
                        Logistics Time
                    </div>
                    <div class="km_panel_element_actions">
                        <div class="clear"></div>
                    </div>
                    <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-clock-o fa-3x"></i>
                    <div class="km_panel_element_stat" id="time_base" style="left: 70px; width: 78px; border-right: 1px solid #000;">
                        500.57 hr
                    </div>
                    <div class="km_panel_element_unit">

                    </div>
                    <div class="km_panel_element_stat second" id="time_opt" style="left: 160px; width: 140px;">
                        125.14 hr
                    </div>
                    <div class="km_panel_element_unit second" id="time_percent">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;70%
                    </div>
                </div>
            </div>
        </div>
    </div>

@stop

@section('footer')

    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn navbar-btn btn-default" id="next_view" onclick="location.href='{{ url('traces') }}'">
        Flows
    </button>
    <button class="btn navbar-btn btn-default" id="btn-2" onclick="location.href='{{ url('truck_stops') }}'" style="margin-left: -3px">
        Stops
    </button>
    <button class="btn navbar-btn btn-danger" id="btn-3" onclick="location.href='{{ url('optimization') }}'" style="margin-left: -3px">
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
        <div class="modal-dialog modal-lg" style="width: 1200px;">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="close_chart" class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Policy impact analysis: <span id="no_bays2">1</span> available delivery bays</h4>
                </div>
                <div class="modal-body" style="height: 620px;">

                    <div class="row" style="margin-left: auto ; margin-right: auto">

                        <!-- Chart 1 -->
                        <div class="col-lg-4" style=" width: 575px; height: 300px;" id="chart1">

                        </div>
                        <!-- Chart 2 -->
                        <div class="col-lg-4" style=" width: 575px; height: 300px;" id="chart2">

                        </div>


                    </div>

                    <div class="row" style="margin-left: auto ; margin-right: auto">
                        <!-- Chart 3 -->
                        <div class="col-lg-4" style=" width: 575px; height: 300px;" id="chart3">

                        </div>

                        <div class="col-lg-4 table-responsive" style=" width: 575px; height: 300px;" id="popup-insights">
                            <br>
                            <center>
                                <table class="table">
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Baseline</th>
                                        <th>Scenario</th>
                                        <th>Change</th>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            Distance
                                        </td>
                                        <td><i class="fa fa-truck fa-3x"></i></td>
                                        <td id="popup_base_truck">11,228 km</td>
                                        <td id="popup_opt_truck"></td>
                                        <td id="popup_change_truck"></td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            Walking
                                        </td>
                                        <td><img src="http://tecnologias.csf.itesm.mx/cartokm2/public/img/walk.png" style="color:#797979; width: 40px;"></td>
                                        <td id="popup_base_walking">14,876 km</td>
                                        <td id="popup_opt_walking"></td>
                                        <td id="popup_change_walking"></td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            CO2 emissions
                                        </td>
                                        <td><i class="fa fa-leaf fa-3x"></i></td>
                                        <td id="popup_base_co2">6.65 kg</td>
                                        <td id="popup_opt_co2"></td>
                                        <td id="popup_change_co2"></td>
                                    </tr>
                                    <tr>
                                        <td align="center">
                                            Time
                                        </td>
                                        <td><i class="fa fa-clock-o fa-3x"></i></td>
                                        <td id="popup_base_time">500.57 hr</td>
                                        <td id="popup_opt_time">125.1425</td>
                                        <td id="popup_change_time">70%</td>
                                    </tr>
                                </table>
                            </center>
                        </div>
                    </div>



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
                    - Truck Traffic: Distance traveled by truck (Km).<br><br>
                    - Pedestrian Traffic: Distance traveled by pedestrian (Km).<br><br>
                    - CO2: CO2 emissions (Kg).<br><br>
                    - Logistic Time: Total travel time+stop time (Hrs).<br>
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
            cartodb.createLayer(map, 'https://manifar92.cartodb.com/api/v2/viz/f2812462-23dc-11e5-a8f4-0e49835281d6/viz.json')
                    .addTo(map)
                    .on('done', function(layer) {

                        //Options
                        var subLayerOptions = {
                            sql: "SELECT * FROM solution_baseline where P1=1",
                            cartocss: '#solution_baseline{marker-file: url(http://com.cartodb.users-assets.production.s3.amazonaws.com/pin-maps/pins14.svg);' +
                            'marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1.5;marker-line-opacity: 1;marker-placement: point;' +
                            'marker-type: ellipse;marker-width: 20;marker-fill: #FF5C00;marker-allow-overlap: true;}'
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
    <script src="{{ asset('public/js/functions/main.js') }}"></script>
    <script src="{{ asset('public/js/queries/policies.js') }}"></script>

    <!-- Charts -->
    <script src="{{ asset('public/js/charts/policies/all_charts.js') }}"></script>

    <!-- Highcharts libs -->
    <script src="http://code.highcharts.com/highcharts.js"></script>
    <script src="http://code.highcharts.com/highcharts-more.js"></script>
    <script src="http://code.highcharts.com/modules/exporting.js"></script>

    <!-- Range Date Picker -->
    <script type="text/javascript" src="{{ asset('public/js/datePicker/moment/moment.min.js') }}"></script>
    <script type="text/javascript" src="{{ asset('public/js/datePicker/daterangepicker.js') }}"></script>

    <script type="text/javascript" src="{{ asset('public/js/styles/changeMaps.js') }}"></script>

    <!-- Lo relacionado con el LeapMotion y el Myo -->
    <script src="{{ asset('public/js/leap-0.6.4.js') }}"></script>
    <script src="{{ asset('public/js/myo.js') }}"></script>

    <script src="{{ asset('public/js/LeapMyoClasses.js') }}"></script>

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

        var ts = document.getElementById('p');
        var tt = 26;

        var zonas = new Array();
        zonas[0] = new LeapRegion(document.getElementById('charts-3'), pw-45, pw-20,75,100, true);
        zonas[1] = new LeapRegion(document.getElementById('p-btn'), 770, 820, 10, 30, false);

        var lm = new LeapMyo(pw,ph,nv,cc,ts,tt,"policies");
        lm.setArrayLeapRegions(zonas);

        //If you have both sensors, myo has to be activated first!!!!
        lm.activateMyo();
        lm.activateLeap();


    </script>
    <!-- Fin de LeapMotion y Myo -->



@stop