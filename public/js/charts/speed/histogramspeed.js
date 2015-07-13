/*********************************************************************************************************************
 * Histogram distance
 *********************************************************************************************************************/

$("#histogramspeed").click(function() {

    /*if(date==undefined){
     alert("Please select the range");
     return;
     }*/

    $('#chart').empty();

    //Data histogram
    var velocities = [];

    // Counters for kilometers
    var cont_1 = 0; var cont_2 = 0; var cont_3 = 0; var cont_4 = 0; var cont_5 = 0;
    var cont_6 = 0; var cont_7 = 0; var cont_8 = 0; var cont_9 = 0; var cont_10 = 0;

    // Define query sql and title
    var title;
    var query_sql;

    // Insufficient data
    if(date == 'insufficient'){
        alert("There is not a valid date range selected");
        return;
    }

    // All dates and all trucks
    if(date == 'All_dates' && truck_id == 'All'){
        query_sql = "SELECT velocidad FROM gps_stats_v7_3 order by fecha";
        title = 'Histogram of average speed for selected time period';
    }

    // Range of dates
    if(truck_id == 'All' && date != 'All_dates'){
        query_sql = "SELECT velocidad FROM gps_stats_v7_3 WHERE fecha BETWEEN '"+start_date+"' AND '"+end_date+"' order by fecha"
        title = 'Histogram of average speed for selected time period';
    }

    // One truck - one date
    if(truck_id != 'All' && date != 'All_dates' && global_chart == true){
        query_sql = "SELECT codigo, velocidad FROM gps_stats_v7_3 WHERE "+many_trucks+" ORDER BY codigo, fecha"
        title = 'Histogram of average speed of truck '+truck_id;
    }

    // Range of dates - One or more trucks
    if(truck_id != 'All' && date != 'All_dates' && global_chart == false){
        query_sql = "SELECT velocidad FROM gps_stats_v7_3 WHERE "+many_trucks+" AND " +
        "fecha BETWEEN '"+start_date+"' AND '"+end_date+"' order by codigo, fecha"
        title = 'Histogram of average speed for selected time period';
    }

    // Query
    var sql_boxplot = new cartodb.SQL({ user: 'manifar92' });
    sql_boxplot.execute(query_sql)
        .done(function(data) {

            console.log(data);

            //If there is no data
            if(data.rows == 0 || data.total_rows < 2){
                alert("Insufficient data");
                $('#chartModal').modal('hide');

                // Clean modal
                $('#chart').empty();
            }
            // Get data for chart
            else{
                for (var i = 0; i < data.total_rows; i++) {

                    var object = data.rows[i];
                    var dist = object.velocidad;

                    // Save distance in array
                    velocities.push(dist);

                    if(dist < 2){ cont_1++; }
                    if(dist > 2 && dist < 4){ cont_2++; }
                    if(dist > 4 && dist < 6){ cont_3++; }
                    if(dist > 6 && dist < 8){ cont_4++; }
                    if(dist > 8 && dist < 10){ cont_5++; }
                    if(dist > 10 && dist < 12){ cont_6++; }
                    if(dist > 12 && dist < 14){ cont_7++; }
                    if(dist > 14 && dist < 16){ cont_8++; }
                    if(dist > 16 && dist < 18){ cont_9++; }
                    if(dist > 18 && dist < 20){ cont_10++; }

                } // end for


                //////////
                // Prepare data
                /////////

                var categories = ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20'];       // x axis
                var data_histogram_speed = [];                             // Array for highcharts chart
                data_histogram_speed.push(cont_1);
                data_histogram_speed.push(cont_2);
                data_histogram_speed.push(cont_3);
                data_histogram_speed.push(cont_4);
                data_histogram_speed.push(cont_5);
                data_histogram_speed.push(cont_6);
                data_histogram_speed.push(cont_7);
                data_histogram_speed.push(cont_8);
                data_histogram_speed.push(cont_9);
                data_histogram_speed.push(cont_10);

                //histogram_speed(categories, data_histogram_speed, title);
                histogram_speed(velocities, title);

            }
        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })


});

/*********************************************************************************************************************
 * Graph - Bar chart
 *********************************************************************************************************************/
function histogram_speed(velocities, title){
    console.log("2");

    // Clean modal
    $('#chart').empty();

    $('#chart').highcharts({
        chart: {
            type: 'histogram'
        },
        title: {
            text: title
        },
        xAxis: {
            crosshair: true,
            title: {
                text: 'Speed (km / hr)'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Frequency'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                borderWidth: 1,
                borderColor: '#000'
            }
        },
        series: [{
            data: velocities
        }]
    });

}

