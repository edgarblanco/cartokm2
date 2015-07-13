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

            <!-- Trucks -->
        <li class="navbar-form">
            <div class="form-group has-feedback">
                <label class="white"><i class="fa fa-truck white"></i>&nbsp;&nbsp;Trucks&nbsp;</label>
                <select id="truck_select" class="form-control">
                </select>
            </div>
        </li>

        <!-- Dates -->
        <li class="navbar-form">
            <div class="form-group has-feedback" style="margin-top:3px;">
                <label class="white"><i class="fa fa-calendar white"></i>&nbsp;&nbsp;Select a range of dates&nbsp;</label>
                <input type="text" id="daterange" name="daterange" size="24" />
            </div>
        </li>
@stop

@section('content')

    <!--  Map
    ================================================== -->
    <div id="map"></div>

    <!--  Panel Container
    ================================================== -->
    <div id="km_panel_container">
        <div style="display: block;" class="km_panel" id="km_panel">
            <div class="km_panel_header">
                <div class="km_panel_header_title">
                    Delivery Trip Statistics <span id="no_trucks"></span>
                </div>
                <div class="km_panel_header_actions">
                    <a href="#" class="km_panel_header_action" id="info-1" data-toggle="modal" data-target="#infoModal">
                        <i style="color: #fff" class="fa fa-question-circle"></i>
                    </a>
                    <div class="clear"></div>
                </div>
            </div>

            <div class="km_panel_wrapper">

                <!-- Distance -->
                <div class="km_panel_element loading full">
                    <div class="km_panel_element_title">
                        Distance
                    </div>
                    <div class="km_panel_element_actions">
                        <a href="#" class="km_panel_element_action" id="boxplotdistance" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bars"></i>
                        </a>
                        <a href="#" class="km_panel_element_action" id="histogramdistance" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bar-chart"></i>
                        </a>
                        <div class="clear"></div>
                    </div>
                    <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-arrows-h fa-3x"></i>
                    <div class="km_panel_element_stat" id="total_distance" style="left:70px; width:82px;">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit" id="distance_dialog_total" style="left: 62px; width: 78px;">
                        Total distance
                    </div>
                    <div class="km_panel_element_stat second" id="average_distance">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit second" style="left: 155px; width: 100px; " id="distance_dialog_average">
                        Average per truck
                    </div>
                </div>

                <!-- Time -->
                <div class="km_panel_element loading full">
                    <div class="km_panel_element_title">Time</div>
                    <div class="km_panel_element_actions">
                        <a href="#" class="km_panel_element_action" id="boxplotduration" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bars"></i>
                        </a>
                        <a href="#" class="km_panel_element_action" id="histogramduration" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bar-chart"></i>
                        </a>
                        <div class="clear"></div>
                    </div>
                    <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-clock-o fa-3x"></i>
                    <div class="km_panel_element_stat" id="total_duration">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit" style="left: 62px; width: 78px;">
                        Total duration
                    </div>
                    <div class="km_panel_element_stat second" id="average_duration">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit second" style="left: 155px; width: 100px; ">
                        Average per truck
                    </div>
                </div>

                <!-- Speed -->
                <div class="km_panel_element shops full">
                    <div class="km_panel_element_title">
                        Speed
                    </div>
                    <div class="km_panel_element_actions">
                        <a href="#" class="km_panel_element_action" id="boxplotspeed" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bars"></i>
                        </a>
                        <a href="#" class="km_panel_element_action" id="histogramspeed" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bar-chart"></i>
                        </a>
                        <div class="clear"></div>
                    </div>
                    <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-tachometer fa-3x"></i>
                    <div class="km_panel_element_stat" id="speed">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit">
                        average per truck
                    </div>
                </div>

                <!-- Carbon Dioxide Gas Emissions -->
                <div class="km_panel_element loading full">
                    <div class="km_panel_element_title">
                        CO2
                    </div>
                    <div class="km_panel_element_actions">
                        <a href="#" class="km_panel_element_action" id="boxplotemissions" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bars"></i>
                        </a>
                        <a href="#" class="km_panel_element_action" id="histogramemissions" data-toggle="modal" data-target="#chartModal">
                            <i class="fa fa-bar-chart"></i>
                        </a>
                        <div class="clear"></div>
                    </div>
                    <br>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-leaf fa-3x"></i>
                    <div class="km_panel_element_stat" id="total_emissions">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit" id="emissions_dialog" style="left: 62px; width: 78px;">
                        Total co2
                    </div>
                    <div class="km_panel_element_stat second" id="average_emissions">
                        <!-- Data called from javascript -->
                    </div>
                    <div class="km_panel_element_unit second" style="left: 155px; width: 100px; ">
                        Average per truck
                    </div>
                </div>
            </div>
        </div>
    </div>

@stop

@section('footer')


    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <button class="btn navbar-btn btn-danger" id="btn-1" onclick="location.href='{{ url('traces') }}'">
        Flows
    </button>
    <button class="btn navbar-btn btn-default" id="next_view" onclick="location.href='{{ url('truck_stops') }}'" style="margin-left: -3px">
        Stops
    </button>
    <button class="btn navbar-btn btn-default" id="btn-3" onclick="location.href='{{ url('optimization') }}'" style="margin-left: -3px">
        Policies
    </button>

    <button class="btn navbar-btn btn-danger" id="btn-layer1" style="width: 100px;margin-left: 28%">
        Normal
    </button>
    <button class="btn navbar-btn btn-default" id="btn-layer2" style="width: 100px;margin-left: -3px">
        Full
    </button>

    <!--<button class="btn navbar-btn btn-primary pull-right" id="heat-map" style="margin-right: 20px;">
        Heat map
    </button>

    <button class="btn navbar-btn btn-primary pull-right" id="density-map" style="margin-right: 20px;">
        Density map
    </button>-->

    <button class="btn navbar-btn btn-default pull-right" id="simple-map">
        Animation map
    </button>

    <button class="btn navbar-btn btn-danger btn-default pull-right" id="intensity-map" >
        Intensity map
    </button>

@stop


@section('modals')
    <!--  Modal for charts
    ================================================== -->
    <div class="modal fade" id="chartModal" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button id="close_chart" class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Policy impact analysis: <span id="no_bays2"></span> of available delivery bays</h4>
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
                    - Distance: Total traveled distance per trip (Km). Average distance per truck: Average distance by number of trips (Km).<br><br>
                    - Time:Total duration of trip (Hours). Average time: Average duration by number of trips (Hours).<br><br>
                    - Average Speed: Average operating speed per trip, includes travels and stops (Km/hr).<br><br>
                    - CO2: Total CO2 Emissions per trip (Kg). CO2 Average CO2: Average CO2 emission per trip (Kg).<br>
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

        // Fo charts IMPORTANT
        var trucks_codes = [];     // Array to save trucks ids

        // Layers
        var bool_layer1 = false;
        var map_layer1 = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            zIndex: -10
        });
        var bool_layer2 = false;
        var map_layer2   = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            zIndex: -10
        });
        // Define empty layer for torque
        var torque_layer;
        var bool_torque = false;

        // Main function, called when page is loaded
        function main() {

            // Define user to execute CartoDB SQL
            var trucks = new cartodb.SQL({ user: 'manifar92' });
            trucks.execute("SELECT DISTINCT codigo FROM gps_stats_v7_3")
                    .done(function(data) {

                        console.log("Trucks");
                        console.log(data);

                        var no_rows = data.total_rows;

                        var option = $('<option />');
                        option.attr('value', "top5").text('5 more representative');
                        $('#truck_select').append(option);

                        for (var i = 0; i < data.total_rows; i++) {

                            var objeto = data.rows[i];
                            var code = objeto.codigo;

                            if (objeto.codigo != 'Total') {
                                var option = $('<option />');
                                option.attr('value', objeto.codigo).text(code);

                                trucks_codes.push(objeto.codigo);

                                $('#truck_select').append(option);
                            }
                        }

                        // After all trucks are loaded, call multiple select
                        multiple_select();

                        // Set number of trucks in statistics
                        $("#no_trucks").html(" - "+no_rows+" trucks");


                    })
                    .error(function(errors) {
                        // do nothing
                    })



            // Instantiate new map object, place it in 'map' element
            map = new L.Map('map', {
                center: [-33.439289, -70.648220],
                zoom: 16
            });

            // Set map to layer1
            map.addLayer(map_layer1);
            bool_layer1 = true;


            // Use method createLayer to change it dinamically
            cartodb.createLayer(map, 'https://manifar92.cartodb.com/api/v2/viz/af208c20-2487-11e5-afd1-0e49835281d6/viz.json')
                    .addTo(map)
                    .on('done', function(layer) {

                        //Options
                        var subLayerOptions = {
                            sql: "SELECT * FROM traces_watts_2",
                            cartocss: '#traces_watts_2{marker-fill: #FFCC00; marker-width: 4; marker-line-color: #FFF; marker-line-width: 1.5; ' +
                            'marker-line-opacity: 1;marker-fill-opacity: 0.9; marker-comp-op: multiply; marker-type: ellipse; ' +
                            'marker-placement: point; marker-allow-overlap: true; marker-clip: false; marker-multi-policy: largest;}'
                        }

                        //sublayer2 = layer.getSubLayer(2);


                        var sublayer = layer.getSubLayer(1);

                        sublayer.set(subLayerOptions);

                        sublayers.push(sublayer);

                    }).on('error', function(error) {
                        console.warn("Error: "+error);
                    });


        }
        window.onload = main;

        //Initialize the plugin multiselect
        function multiple_select(){

            // Add attribute multiple
            $("#truck_select").attr("multiple", "multiple");

            // Apply library
            $('#truck_select').multiselect({
                includeSelectAllOption: true,
                allSelectedText: 'All Selected'
            });

            // Select All
            //$('#truck_select').multiselect('multiselect-all');
            $("#truck_select").multiselect('selectAll', false);
            $("#truck_select").multiselect('updateButtonText');
        }

    </script>

    <!-- Js for queries -->
    <script src="{{ asset('public/js/functions/main.js') }}"></script>
    <script src="{{ asset('public/js/queries/main.js') }}"></script>

    <!-- Lib for quartiles -->
    <script src="{{ asset('public/js/charts/simple_statistics.js') }}"></script>

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

    <script type="text/javascript">

        $('input[name="daterange"]').daterangepicker({
            format: 'YYYY-MM-DD',
            startDate: '2014-06-30',
            endDate: '2014-12-31',
            minDate: '2014-06-30',
            maxDate: '2014-12-31',
            buttonClasses: ['btn', 'btn-md'],
            applyClass: 'btn-success',
            cancelClass: 'btn-default'
        });

        $("#daterange").val('2014-06-30 -> 2014-12-31');
    </script>

    <!-- Styles -->
    <script type="text/javascript" src="{{ asset('public/js/styles/changeStyles.js') }}"></script>
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
        var ts = document.getElementById('truck_select');
        var tt = 3;

        var zonas = new Array();
        zonas[0] = new LeapRegion(document.getElementById('histogramdistance'), pw-50, pw-36,86,100,true);
        zonas[1] = new LeapRegion(document.getElementById('boxplotdistance'), pw-30, pw-16,86,100,true);

        zonas[2] = new LeapRegion(document.getElementById('histogramduration'), pw-50, pw-36,170,184,true);
        zonas[3] = new LeapRegion(document.getElementById('boxplotduration'), pw-30, pw-16,170,184,true);

        zonas[4] = new LeapRegion(document.getElementById('histogramspeed'), pw-50, pw-36,250,264,true);
        zonas[5] = new LeapRegion(document.getElementById('boxplotspeed'), pw-30, pw-16,250,264,true);

        zonas[6] = new LeapRegion(document.getElementById('histogramemissions'), pw-50, pw-36,330,344,true);
        zonas[7] = new LeapRegion(document.getElementById('boxplotemissions'), pw-30, pw-16,330,344,true);

        zonas[8] = new LeapRegion(document.getElementById('intensity-map'), pw-200, pw-110,ph-40,ph,false);
        zonas[9] = new LeapRegion(document.getElementById('simple-map'), pw-100, pw,ph-40,ph,false);

        var lm = new LeapMyo(pw,ph,nv,cc,ts,tt,"flows");
        lm.setArrayLeapRegions(zonas);
        lm.setDatePickerInput(document.getElementById('daterange'));

        //If you have both sensors, myo has to be activated first!!!!
        lm.activateMyo();
        lm.activateLeap();

    </script>
    <!-- Fin de LeapMotion y Myo -->

@stop