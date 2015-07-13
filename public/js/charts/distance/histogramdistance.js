/*********************************************************************************************************************
 * Histogram distance
 *********************************************************************************************************************/

$("#histogramdistance").click(function() {

    /*if(date==undefined){
     alert("Please select the range");
     return;
     }*/

    $('#chart').empty();

    //Data histogram
    var distances = [];

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
        query_sql = "SELECT distancia FROM gps_stats_v7_3 order by fecha";
        title = 'Histogram of total traveled distance for selected time period';
    }

    // Range of dates
    if(truck_id == 'All' && date != 'All_dates'){
        query_sql = "SELECT distancia FROM gps_stats_v7_3 WHERE fecha BETWEEN '"+start_date+"' AND '"+end_date+"' order by fecha"
        title = 'Histogram of total traveled distance for selected time period';
    }

    // One truck - one date
    if(truck_id != 'All' && date != 'All_dates' && global_chart == true){
        query_sql = "SELECT codigo, distancia FROM gps_stats_v7_3 WHERE "+many_trucks+" ORDER BY codigo, fecha"
        title = 'Histogram of total traveled distance of truck '+truck_id;
        console.log(query_sql);
    }

    // Range of dates - One or more trucks
    if(truck_id != 'All' && date != 'All_dates' && global_chart == false){
        query_sql = "SELECT distancia FROM gps_stats_v7_3 WHERE "+many_trucks+" AND " +
        "fecha BETWEEN '"+start_date+"' AND '"+end_date+"' order by codigo, fecha"
        title = 'Histogram of total traveled distance for selected time period';
    }

    // Query
    var sql_boxplot = new cartodb.SQL({ user: 'manifar92' });
    sql_boxplot.execute(query_sql)
        .done(function(data) {

            console.log("Histogram data: ");
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
                    var dist = object.distancia;

                    // Save distance in array
                    distances.push(dist);

                    if(dist < 1){ cont_1++; }
                    if(dist < 2 && dist > 1){ cont_2++; }
                    if(dist < 3 && dist > 2){ cont_3++; }
                    if(dist < 4 && dist > 3){ cont_4++; }
                    if(dist < 5 && dist > 4){ cont_5++; }
                    if(dist < 6 && dist > 5){ cont_6++; }
                    if(dist < 7 && dist > 6){ cont_7++; }
                    if(dist < 8 && dist > 7){ cont_8++; }
                    if(dist < 9 && dist > 8){ cont_9++; }
                    if(dist < 10 && dist > 9){ cont_10++; }

                } // end for


                //////////
                // Prepare data
                /////////

                console.log(distances);

                var categories = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];       // x axis
                var data_histogram_distance = [];                                           // Array for highcharts chart
                data_histogram_distance.push(cont_1);
                data_histogram_distance.push(cont_2);
                data_histogram_distance.push(cont_3);
                data_histogram_distance.push(cont_4);
                data_histogram_distance.push(cont_5);
                data_histogram_distance.push(cont_6);
                data_histogram_distance.push(cont_7);
                data_histogram_distance.push(cont_8);
                data_histogram_distance.push(cont_9);
                data_histogram_distance.push(cont_10);

                //histogram_distance(categories, data_histogram_distance, title);
                histogram_distance(distances, title);

            }
        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })


});

/*********************************************************************************************************************
 * Graph - Bar chart
 *********************************************************************************************************************
function histogram_distance(categories, data_histogram_distance, title){
    console.log("2");

    // Clean modal
    $('#chart').empty();

    $('#chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: title
        },
        xAxis: {
            categories: categories,
            crosshair: true,
            title: {
                text: 'Distance (Km)'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Histogram distance',
            data: data_histogram_distance
        }]
    });

}
*/

function histogram_distance(distances, title){

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
            title: {
                text: 'Distance (Km)'
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
            data: distances
        }]
    });

}
