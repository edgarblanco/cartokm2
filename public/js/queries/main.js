/*********************************************************************************************************************
 * Global Variable
 *********************************************************************************************************************/

// Global variable for truck
var truck_id;

// Global variable for date
var date;

// Global variable for object data
var object_data;

// Global variable to query many trucks
var many_trucks;

// Global that saves trucks ids in an array
var trucks_array;

// Global chart
var global_chart = false;

/*********************************************************************************************************************
 * First view
 *********************************************************************************************************************/

first_view();

// Data for first view
function first_view(){
    //Set date to all
    date = 'All_dates';
    //Set truck to all
    truck_id = 'All';

    var arr_distance = []; var arr_duration = []; var arr_speed = []; var arr_emissions = [];

    //Prepare SQL for insights
    var sql_boxplot = new cartodb.SQL({ user: 'manifar92' });
    sql_boxplot.execute("SELECT distancia, duracion, velocidad, emissions FROM gps_stats_v7_3 order by fecha")
        .done(function(data) {

            console.log("MES");
            console.log(data);

            for (var i = 0; i < data.total_rows; i++) {
                var object = data.rows[i];

                arr_distance.push(object.distancia);
                arr_duration.push(object.duracion);
                arr_speed.push(object.velocidad);
                if(object.emissions != 'Missing information')
                    arr_emissions.push(parseFloat(object.emissions));
            }

            //Get total distance
            var total_distance = 0;
            $.each(arr_distance,function() {
                total_distance += this;
            });

            //Get total duration
            var total_duration = 0;
            $.each(arr_duration,function() {
                total_duration += this;
            });

            //Get total speed
            var total_speed = 0;
            $.each(arr_speed,function() {
                total_speed += this;
            });

            //Get total emissions
            var total_emissions = 0;
            $.each(arr_emissions,function() {
                total_emissions += this;
            });

            // Totals
            console.log("Total distance: "+total_distance);
            console.log("Total duration: "+total_duration);
            console.log("Total speed: "+total_speed);
            console.log("Total emissions: "+total_emissions);

            /////////////////
            // INSIGHTS
            /////////////////

            // Distance
            var total_distance_fixed = parseFloat(total_distance.toFixed(2)).toLocaleString() +' Km';
            var average_distance = parseFloat((total_distance/arr_distance.length)).toFixed(2).toLocaleString() +' Km';
            $("#total_distance").html(total_distance_fixed);
            $("#average_distance").html(average_distance);

            // Duration
            var total_duration_fixed = parseFloat(total_duration.toFixed(2)).toLocaleString() +' hr';
            var average_duration = parseFloat((total_duration/arr_duration.length).toFixed(2)).toLocaleString() +' hr';
            $("#total_duration").html(total_duration_fixed);
            $("#average_duration").html(average_duration);

            // Speed
            var average_speed = parseFloat(((total_speed)/arr_speed.length).toFixed(2)).toLocaleString() +' Km/hr';
            $("#speed").html(average_speed);

            // Emissions
            var total_emissions_fixed = parseFloat(total_emissions.toFixed(2)).toLocaleString() +' Kg';
            var average_emissions = parseFloat((total_emissions/arr_emissions.length).toFixed(2)).toLocaleString() +' Kg';
            $("#total_emissions").html(total_emissions_fixed);
            $("#average_emissions").html(average_emissions);

        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })

}

/*********************************************************************************************************************
 * On truck select - validation for dates
 *********************************************************************************************************************/

// Every time a truck is selected
$('#truck_select').on('change', function() {

    // Clean variables
    date = '';
    truck_id = '';

    // Get array with values
    //trucks_array = $("#truck_select").select2("val");

    trucks_array = $("#truck_select").val();
    console.log("Trucks selected");
    console.log(trucks_array);

    if(trucks_array == null){
        $('#truck_select').multiselect();

        // Set number of trucks in statistics
        $("#no_trucks").html("");
        // Clean insights
        $("#total_distance").html('');
        $("#average_distance").html('');
        $("#total_duration").html('');
        $("#average_duration").html('');
        $("#speed").html('');
        $("#total_emissions").html('');
        $("#average_emissions").html('');

        // Map
        sublayers[0].setSQL("SELECT * FROM traces_watts_2 WHERE codigo='null' ");
        return true;
    }

    // Show datarangepicker
    $('#daterange').data('daterangepicker').show();

    var ids = '';
    for(var i = 0; i < trucks_array.length; i++){
        // For first value
        if(i==0){
            ids += " codigo='"+trucks_array[i]+"' ";
        }else{
            ids += "OR codigo='"+trucks_array[i]+"' ";
        }
    }

    ///////////////////////////////////////
      // 5 most representative selected
    if(trucks_array.indexOf("top5") != -1 && trucks_array.length <48){
        trucks_array = ["11FB8056", "11FB8115", "11FB5201", "11FB8093", "11FB8092"];
        console.log(trucks_array);
        ids = '';
        for(var i = 0; i < trucks_array.length; i++){
            // For first value
            if(i==0){
                ids += " codigo='"+trucks_array[i]+"' ";
            }else{
                ids += "OR codigo='"+trucks_array[i]+"' ";
            }
        }
    }
    ///////////////////////////////////////

    many_trucks = ids;

    // Get first date with data on that truck
    var sql_boxplot = new cartodb.SQL({user: 'manifar92'});
    sql_boxplot.execute("SELECT codigo, fecha FROM gps_stats_v7_3 WHERE "+ids+" order by fecha asc limit 1")
        .done(function (data) {
            for (var i = 0; i < data.total_rows ; i++) {
                var object = data.rows[i];

                console.log(object);

                var time_string = object.fecha;
                var res = time_string.split("-");
                var year = res[0];
                var month = res[1];
                var time_string2 = res[2];
                var res2 = time_string2.split("T");
                var day = res2[0];

                var startDate = year+'-'+month+'-'+day;
                console.log("Start Day: "+startDate);


                // Get last date with data on that truck
                var sql_boxplot = new cartodb.SQL({user: 'manifar92'});
                sql_boxplot.execute("SELECT codigo, fecha FROM gps_stats_v7_3 WHERE "+ids+" order by fecha desc limit 1")
                    .done(function (data) {
                        for (var i = 0; i < data.total_rows ; i++) {
                            var object = data.rows[i];

                            var time_string = object.fecha;
                            var res = time_string.split("-");
                            var year = res[0];
                            var month = res[1];
                            var time_string2 = res[2];
                            var res2 = time_string2.split("T");
                            var day = res2[0];

                            var endDate = year+'-'+month+'-'+day;
                            console.log("End Day: "+endDate);

                            var cb = function(start, end, label) {
                                console.log(start.toISOString(), end.toISOString(), label);
                                $('#reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'));
                            };

                            var optionSet = {
                                format: 'YYYY-MM-DD',
                                startDate: startDate,
                                endDate: endDate,
                                minDate: startDate,
                                maxDate: endDate,
                                buttonClasses: ['btn', 'btn-md'],
                                applyClass: 'btn-success',
                                cancelClass: 'btn-default'
                            };

                            $('#daterange').data('daterangepicker').setOptions(optionSet, cb);

                            var value = ''+startDate+' -> '+endDate;

                            $("#daterange").val(value);


                            ///////////////////////////////////////
                            // 5 most representative selected
                            if(trucks_array.indexOf("top5") != -1 ){
                                var optionSet = {
                                    format: 'YYYY-MM-DD',
                                    startDate: '2014-06-30',
                                    endDate: '2014-12-31',
                                    minDate: '2014-06-30',
                                    maxDate: '2014-12-31',
                                    buttonClasses: ['btn', 'btn-md'],
                                    applyClass: 'btn-success',
                                    cancelClass: 'btn-default'
                                };

                                $('#daterange').data('daterangepicker').setOptions(optionSet, cb);

                                var value = ''+startDate+' -> '+endDate;

                                $("#daterange").val(value);
                            }
                            ///////////////////////////////////////


                        }

                    })
                    .error(function(error){
                        console.error("ERROR: "+error);
                    })


            }

        })
        .error(function(error){
            console.error("ERROR: "+error);
        })

});

/*********************************************************************************************************************
 * On date select
 *********************************************************************************************************************/

// Global variables for initial date and end date
var start_date;
var end_date;

$('#daterange').on('apply.daterangepicker', function(ev, picker) {
    console.log(picker.startDate.format('YYYY-MM-DD'));
    console.log(picker.endDate.format('YYYY-MM-DD'));


    //map.addLayer(map_layer2, base_layer);


    date = '';
    start_date = '';
    end_date = '';

    ////////////////
    // All trucks
    ////////////////

    if(truck_id == 'All') {
        start_date = '' + picker.startDate.format('YYYY-MM-DD') + 'T00:00:00Z';
        end_date = '' + picker.endDate.format('YYYY-MM-DD') + 'T00:00:00Z';

        ///////////////
        // Insights
        ///////////////
        var arr_distance = [];
        var arr_duration = [];
        var arr_speed = [];
        var arr_emissions = [];

        //Prepare SQL
        var sql_boxplot = new cartodb.SQL({user: 'manifar92'});
        sql_boxplot.execute("SELECT distancia, duracion, velocidad, emissions FROM gps_stats_v7_3 WHERE fecha BETWEEN '"+start_date+"' AND '"+end_date+"' order by fecha")
            .done(function (data) {

                console.log("All trucks - date range");
                console.log(data);

                // No data or insufficient
                if(data.total_rows == 0 || data.total_rows < 4 ){
                    if(data.total_rows == 0)
                        alert("There is no data in that range of dates");

                    if (data.total_rows != 0 && data.total_rows < 4)
                        alert("Insufficient Data");

                    // Clean insights
                    $("#total_distance").html('');
                    $("#average_distance").html('');
                    $("#total_duration").html('');
                    $("#average_duration").html('');
                    $("#speed").html('');
                    $("#total_emissions").html('');
                    $("#average_emissions").html('');

                    date = 'insufficient';

                    return;
                }


                for (var i = 0; i < data.total_rows; i++) {
                    var object = data.rows[i];

                    arr_distance.push(object.distancia);
                    arr_duration.push(object.duracion);
                    arr_speed.push(object.velocidad);
                    if (object.emissions != 'Missing information')
                        arr_emissions.push(parseFloat(object.emissions));
                }

                //Get total distance
                var total_distance = 0;
                $.each(arr_distance, function () {
                    total_distance += this;
                });

                //Get total duration
                var total_duration = 0;
                $.each(arr_duration, function () {
                    total_duration += this;
                });

                //Get total speed
                var total_speed = 0;
                $.each(arr_speed, function () {
                    total_speed += this;
                });

                //Get total emissions
                var total_emissions = 0;
                $.each(arr_emissions, function () {
                    total_emissions += this;
                });

                // Totals
                console.log("Total distance: " + total_distance);
                console.log("Total duration: " + total_duration);
                console.log("Total speed: " + total_speed);
                console.log("Total emissions: " + total_emissions);

                // Distance
                var total_distance_fixed = total_distance.toFixed(2) + ' Km';
                var average_distance = (total_distance / arr_distance.length).toFixed(2) + ' Km';
                $("#total_distance").html(total_distance_fixed);
                $("#average_distance").html(average_distance);

                // Duration
                var total_duration_fixed = total_duration.toFixed(2) + ' hr';
                var average_duration = (total_duration / arr_duration.length).toFixed(2) + ' hr';
                $("#total_duration").html(total_duration_fixed);
                $("#average_duration").html(average_duration);

                // Speed
                var average_speed = ((total_speed) / arr_speed.length).toFixed(1) + ' Km/hr';
                $("#speed").html(average_speed);

                // Emissions
                var total_emissions_fixed = total_emissions.toFixed(1) + ' Kg';
                var average_emissions = (total_emissions / arr_emissions.length).toFixed(2) + ' Kg';
                $("#total_emissions").html(total_emissions_fixed);
                $("#average_emissions").html(average_emissions);

                ///////////////
                // Map
                ///////////////
                sublayers[0].setSQL("SELECT * FROM traces_watts_2 WHERE fecha BETWEEN '"+start_date+"' AND '"+end_date+"'");
                return true;


            })
    } // end if -> "All trucks"

    ///////////////////////////////////////////////////
    // If there is at least one truck selected
    ///////////////////////////////////////////////////

    else{

        // Get initial and end date
        start_date = '' + picker.startDate.format('YYYY-MM-DD') + 'T00:00:00Z';
        end_date = '' + picker.endDate.format('YYYY-MM-DD') + 'T23:59:00Z';

        console.log("MANY TRUCKS");
        console.log("Start date: "+start_date);
        console.log("End Date: "+end_date);

        // If there is just one day selected  ->  Define the type of chart and the type of map
        if( picker.startDate.get("date") == picker.endDate.get("date")){
            console.log("Global chart - true");
            global_chart = true;
        }else{
            global_chart = false;
        }

        // Get array with values
        trucks_array = $("#truck_select").val();
        console.log("Trucks selected");
        console.log(trucks_array);

        ///////////////////////////////////////
        // 5 most representative selected
        if(trucks_array.indexOf("top5") != -1 && trucks_array.length <48){
            trucks_array = ["11FB8056", "11FB8115", "11FB5201", "11FB8093", "11FB8092"];
            console.log(trucks_array);
        }
        ///////////////////////////////////////

        // Define query
        var query;

        ///////////////////////////////
        // Just one truck id
        if(trucks_array.length == 1){
            query = "SELECT distancia, duracion, velocidad, emissions FROM gps_stats_v7_3 WHERE codigo='"+trucks_array[0]+"' AND " +
            "fecha BETWEEN '"+start_date+"' AND '"+end_date+"' order by fecha";
            console.log("Query: "+query);
            truck_id = trucks_array[0];
            insights_one(query);

            // Set number of trucks in statistics
            $("#no_trucks").html(" - "+1+" truck");

        }

        ////////////////////////////////
        // For more than one id
        if(trucks_array.length > 1){

            var ids = '';
            for(var i = 0; i < trucks_array.length; i++){
                // For first value
                if(i==0){
                    ids += " codigo='"+trucks_array[i]+"' ";
                }else{
                    ids += "OR codigo='"+trucks_array[i]+"' ";
                }
            }

            query = "SELECT distancia, duracion, velocidad, emissions FROM gps_stats_v7_3 WHERE "+ids+"AND " +
            "fecha BETWEEN '"+start_date+"' AND '"+end_date+"' order by fecha";
            insights_many(query, ids);

            // Set number of trucks in statistics
            $("#no_trucks").html(" - "+trucks_array.length+" trucks");
        }


    }

});

/*********************************************************************************************************************
 * Insights -> One truck
 *********************************************************************************************************************/

function insights_one(query){
    var arr_distance = [];
    var arr_duration = [];
    var arr_speed = [];
    var arr_emissions = [];

    //Prepare SQL
    var sql_boxplot = new cartodb.SQL({user: 'manifar92'});     //
    sql_boxplot.execute(query)
        .done(function (data) {

            console.log("Insights one");
            console.log(data);

            // No data or insufficient
            if (data.total_rows == 0) {
                alert("There is no data...");

                // Clean insights
                $("#total_distance").html('');
                $("#average_distance").html('');
                $("#total_duration").html('');
                $("#average_duration").html('');
                $("#speed").html('');
                $("#total_emissions").html('');
                $("#average_emissions").html('');

                date = 'insufficient';

                return;
            }

            for (var i = 0; i < data.total_rows; i++) {
                var object = data.rows[i];

                arr_distance.push(object.distancia);
                arr_duration.push(object.duracion);
                arr_speed.push(object.velocidad);
                if (object.emissions != 'Missing information')
                    arr_emissions.push(parseFloat(object.emissions));
            }

            //Get total distance
            var total_distance = 0;
            $.each(arr_distance, function () {
                total_distance += this;
            });

            //Get total duration
            var total_duration = 0;
            $.each(arr_duration, function () {
                total_duration += this;
            });

            //Get total speed
            var total_speed = 0;
            $.each(arr_speed, function () {
                total_speed += this;
            });


            // Get total emissions  ->  Exclude case of missing information
            if(arr_emissions.length > 0){
                var total_emissions = 0;
                $.each(arr_emissions, function () {
                    total_emissions += this;
                });
            }

            // Totals
            console.log("Total distance: " + total_distance);
            console.log("Total duration: " + total_duration);
            console.log("Total speed: " + total_speed);
            if(arr_emissions.length > 0)
                console.log("Total emissions: " + total_emissions);

            // Distance
            var total_distance_fixed = total_distance.toFixed(2) + ' Km';
            var average_distance = (total_distance / arr_distance.length).toFixed(2) + ' Km';
            $("#total_distance").html(total_distance_fixed);
            $("#average_distance").html(average_distance);

            // Duration
            var total_duration_fixed = total_duration.toFixed(2) + ' hr';
            var average_duration = (total_duration / arr_duration.length).toFixed(2) + ' hr';
            $("#total_duration").html(total_duration_fixed);
            $("#average_duration").html(average_duration);

            // Speed
            var average_speed = ((total_speed) / arr_speed.length).toFixed(1) + ' Km/hr';
            $("#speed").html(average_speed);

            // Emissions
            if(arr_emissions.length > 0){
                var total_emissions_fixed = total_emissions.toFixed(1) + ' Kg';
                var average_emissions = (total_emissions / arr_emissions.length).toFixed(2) + ' Kg';
                $("#total_emissions").html(total_emissions_fixed);
                $("#average_emissions").html(average_emissions);
            }else{
                $("#total_emissions").html('<font size="2">Missing!</font>');
            }


            ///////////////
            // Map
            ///////////////
            var sql_stm = "SELECT * FROM traces_watts_2 WHERE codigo='"+truck_id+"' AND " +
                "fecha BETWEEN '"+start_date+"' AND '"+end_date+"'";
            console.log(sql_stm);
            /*
            var sql_stm = "SELECT * FROM traces_watts_2 WHERE codigo='"+truck_id+"' AND " +
                "fecha BETWEEN '"+start_date+"' AND '"+end_date+"'";
            console.log(sql_stm)
            sublayers[0].setSQL(sql_stm);
            return true;
*/
            ///////////////
            // Map - Torque
            ///////////////
            sublayers[0].hide();

            if(bool_torque){
                console.log("Borrare torque");
                map.removeLayer(torque_layer);
            }

            if(bool_layer1){
                map.removeLayer(map_layer1);
                map.addLayer(map_layer1);
            }
            if(bool_layer2){
                map.removeLayer(map_layer2);
                map.addLayer(map_layer2);
            }

            cartodb.createLayer(map, {
                type: "torque",
                order: 1,
                options: {
                    query: sql_stm,
                    user_name: "manifar92",
                    tile_style: 'Map { '
                    +'  -torque-frame-count:19; '
                    +'  -torque-animation-duration:8; -torque-time-attribute:"fecha"; '
                    +'  -torque-aggregation-function:"count(cartodb_id)"; '
                    +'  -torque-resolution:4; -torque-data-aggregation:linear;'
                    +'  -torque-data-aggregation:cumulative; } '
                    +'#traces_watts_2{comp-op: lighter;marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 0;' +
                    'marker-line-opacity: 1;marker-type: ellipse;marker-width: 6;marker-fill: #0F3B82;}' +
                    '#traces_watts_2[frame-offset=1] {marker-width:8;marker-fill-opacity:0.45;}' +
                    '#traces_watts_2[frame-offset=2] {marker-width:10;marker-fill-opacity:0.225;}'
                }
            }).done(function(layer) {

                bool_torque = true;
                torque_layer = layer;

                map.addLayer(torque_layer);
            }).error(function(e){
                console.log("Error: "+e);
            })
        })
}

/*********************************************************************************************************************
 * Insights -> Many trucks
 *********************************************************************************************************************/

function insights_many(query, ids){
    var arr_distance = [];
    var arr_duration = [];
    var arr_speed = [];
    var arr_emissions = [];

    //Prepare SQL
    var sql_boxplot = new cartodb.SQL({user: 'manifar92'});
    sql_boxplot.execute(query)
        .done(function (data) {

            console.log("Trucks selected - date range");
            console.log(data);

            // No data or insufficient
            if (data.total_rows == 0 || data.total_rows < 4) {
                if (data.total_rows == 0)
                    alert("There is no data in that range of dates");

                if (data.total_rows != 0 && data.total_rows < 4)
                    alert("Insufficient Data");

                // Clean insights
                $("#total_distance").html('');
                $("#average_distance").html('');
                $("#total_duration").html('');
                $("#average_duration").html('');
                $("#speed").html('');
                $("#total_emissions").html('');
                $("#average_emissions").html('');

                date = 'insufficient';

                return;
            }

            for (var i = 0; i < data.total_rows; i++) {
                var object = data.rows[i];

                arr_distance.push(object.distancia);
                arr_duration.push(object.duracion);
                arr_speed.push(object.velocidad);
                if (object.emissions != 'Missing information')
                    arr_emissions.push(parseFloat(object.emissions));
            }

            //Get total distance
            var total_distance = 0;
            $.each(arr_distance, function () {
                total_distance += this;
            });

            //Get total duration
            var total_duration = 0;
            $.each(arr_duration, function () {
                total_duration += this;
            });

            //Get total speed
            var total_speed = 0;
            $.each(arr_speed, function () {
                total_speed += this;
            });

            //Get total emissions
            var total_emissions = 0;
            $.each(arr_emissions, function () {
                total_emissions += this;
            });

            // Totals
            console.log("Total distance: " + total_distance);
            console.log("Total duration: " + total_duration);
            console.log("Total speed: " + total_speed);
            console.log("Total emissions: " + total_emissions);

            // Distance
            var total_distance_fixed = total_distance.toFixed(2) + ' Km';
            var average_distance = (total_distance / arr_distance.length).toFixed(2) + ' Km';
            $("#total_distance").html(total_distance_fixed);
            $("#average_distance").html(average_distance);

            // Duration
            var total_duration_fixed = total_duration.toFixed(2) + ' hr';
            var average_duration = (total_duration / arr_duration.length).toFixed(2) + ' hr';
            $("#total_duration").html(total_duration_fixed);
            $("#average_duration").html(average_duration);

            // Speed
            var average_speed = ((total_speed) / arr_speed.length).toFixed(1) + ' Km/hr';
            $("#speed").html(average_speed);

            // Emissions
            var total_emissions_fixed = total_emissions.toFixed(1) + ' Kg';
            var average_emissions = (total_emissions / arr_emissions.length).toFixed(1) + ' Kg';
            $("#total_emissions").html(total_emissions_fixed);
            $("#average_emissions").html(average_emissions);

            ///////////////
            // Map
            ///////////////
            var query_many = "SELECT * FROM traces_watts_2 WHERE "+ids+"AND fecha BETWEEN '"+start_date+"' AND '"+end_date+"'";
            console.log(query_many);

            if(bool_torque){

                bool_torque = false;
                sublayers = [];

                //$("#map").empty();

                map.removeLayer(torque_layer);

                if(bool_layer1){
                    console.log("Limpio mapa - removeLayer1");
                    map.removeLayer(map_layer1);
                    map.addLayer(map_layer1);
                }
                if(bool_layer2){
                    console.log("Limpio mapa - removeLayer2");
                    map.removeLayer(map_layer2);
                    map.addLayer(map_layer2);
                }


                // Use method createLayer to change it dinamically
                cartodb.createLayer(map, 'https://manifar92.cartodb.com/api/v2/viz/af208c20-2487-11e5-afd1-0e49835281d6/viz.json')
                    .addTo(map)
                    .on('done', function(layer) {

                        //Options
                        var subLayerOptions = {
                            sql: query_many,
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

            }else{
                console.log("Query map: "+ids);

                sublayers[0].setSQL(query_many);
                return true;
            }

        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })
}