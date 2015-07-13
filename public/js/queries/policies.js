// Define global variables
var truck_distance_opt; var change_truck;
var walk_distance_opt; var change_walking;
var co2_opt; var change_co2;
var time_opt; var change_time;

// Value of spaces
var p_val;

second_view();

// Data for first view
function second_view(){

    //Prepare SQL for insights
    var sql_boxplot = new cartodb.SQL({ user: 'manifar92' });
    sql_boxplot.execute("SELECT * FROM optimization1_0 WHERE number_of_p='1' ")
        .done(function(data) {

            console.log(data);

            // There should be just one data
            var object = data.rows[0];

            var truck_distance = parseFloat(object.truck_distance);
            var walk_distance = parseFloat(object.distance_walking);
            var co2 = parseFloat(object.c02_emission);
            //var time = parseFloat(object.logistic_time);

            // Totals
            console.log("Truck distance: "+truck_distance);
            console.log("Walk distance: "+walk_distance);
            console.log("CO2: "+co2);

            /////////////////
            // INSIGHTS
            /////////////////

            // Truck Distance
            var truck_distance_fixed = truck_distance.toFixed(2);
            truck_distance_opt = parseFloat(truck_distance_fixed).toLocaleString() + ' Km';
            $("#truck_opt_distance").html(truck_distance_opt);

            // Walking Distance
            var walk_distance_fixed = walk_distance.toFixed(1);
            walk_distance_opt = parseFloat(walk_distance_fixed).toLocaleString() + ' Km';
            $("#pedestrian_opt_distance").html(walk_distance_opt);

            // CO2 emissions
            var co2_fixed = co2.toFixed(1);
            co2_opt = parseFloat(co2_fixed).toLocaleString() + ' Kg';
            $("#co2_opt").html(co2_opt);

            // Time
            //var time_fixed = time.toFixed(2);
            //time_opt = parseFloat(time_fixed).toLocaleString() + ' hrs';
            //$("#time_opt").html(time_opt);

            // Changes
            change_truck = object.change_truck;
            $("#truck_percent").html(change_truck);

            change_walking = object.change_walking;
            $("#walking_percent").html(change_walking);

            change_co2 = object.change_co2;
            $("#co2_percent").html(change_co2);

            //change_time = object.change_time;
            //$("#time_percent").html(change_time);


        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })

}

/*********************************************************************************************************************
 * Insights -> Changing parking spaces
 *********************************************************************************************************************/
$("#p_btn").click(function() {

    // Clean values
    $("#truck_opt_distance").html('');
    $("#pedestrian_opt_distance").html('');
    $("#co2_opt").html('');

    // Get val
    p_val = $("#p").val();

    $("#no_bays").html(' - '+p_val+' bays');
    $("#no_bays2").html(' - '+p_val+' bays');

    //Prepare SQL for insights
    var sql_boxplot = new cartodb.SQL({ user: 'manifar92' });
    sql_boxplot.execute("SELECT * FROM optimization1_0 WHERE number_of_p='"+p_val+"' ")
        .done(function(data) {

            console.log(data);

            // There should be just one data
            var object = data.rows[0];

            var truck_distance = parseFloat(object.truck_distance);
            var walk_distance = parseFloat(object.distance_walking);
            var co2 = parseFloat(object.c02_emission);
            //var time = parseFloat(object.logistic_time);

            // Totals
            console.log("Truck distance: "+truck_distance);
            console.log("Walk distance: "+walk_distance);
            console.log("CO2: "+co2);

            /////////////////
            // INSIGHTS
            /////////////////

            // Truck Distance
            var truck_distance_fixed = truck_distance.toFixed(2);
            truck_distance_opt = parseFloat(truck_distance_fixed).toLocaleString() + ' Km';
            $("#truck_opt_distance").html(truck_distance_opt);

            // Walking Distance
            var walk_distance_fixed = walk_distance.toFixed(1);
            walk_distance_opt = parseFloat(walk_distance_fixed).toLocaleString() + ' Km';
            $("#pedestrian_opt_distance").html(walk_distance_opt);

            // CO2
            var co2_fixed = co2.toFixed(1);
            co2_opt = parseFloat(co2_fixed).toLocaleString() + ' Kg';
            $("#co2_opt").html(co2_opt);

            // Time
            //var time_fixed = time.toFixed(2);
            //time_opt = parseFloat(time_fixed).toLocaleString() + ' hrs';
            //$("#time_opt").html(time_opt);

            // Changes
            change_truck = object.change_truck;
            $("#truck_percent").html(change_truck);

            change_walking = object.change_walking;
            $("#walking_percent").html(change_walking);

            change_co2 = object.change_co2;
            $("#co2_percent").html(change_co2);

            //change_time = object.change_time;
            //$("#time_percent").html(change_time);

            // Truck Distance
            $("#popup_opt_truck").html(truck_distance_opt);
            $("#popup_change_truck").html(change_truck);

            // Walking Distance
            $("#popup_opt_walking").html(walk_distance_opt);
            $("#popup_change_walking").html(change_walking);

            // Truck Distance
            $("#popup_opt_co2").html(co2_opt);
            $("#popup_change_co2").html(change_co2);

            ///////////////
            // Map
            ///////////////
            var p_string = 'P'+p_val;
            var sql_sublayer = "SELECT * FROM solution_baseline where "+p_string+"=1";
            console.log(sql_sublayer);
            sublayers[0].setSQL(sql_sublayer);
            return true;


        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })

});