/*********************************************************************************************************************
 * Histogram distance
 *********************************************************************************************************************/

$("#histogramemissions").click(function() {

    /*if(date==undefined){
        alert("Please select the range");
        return;
    }*/

    $('#chart').empty();

    //Data histogram
    var emissions = [];

    // Counters for kilometers
    var cont_1 = 0; var cont_2 = 0; var cont_3 = 0; var cont_4 = 0; var cont_5 = 0;
    var cont_6 = 0; var cont_7 = 0; var cont_8 = 0;

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
        query_sql = "SELECT emissions FROM gps_stats_v7_3 WHERE emissions != 'Missing information' order by fecha";
        title = 'Histogram of total CO2 emissions for selected time period';
    }

    // Range of dates
    if(truck_id == 'All' && date != 'All_dates'){
        query_sql = "SELECT emissions FROM gps_stats_v7_3 WHERE fecha BETWEEN '"+start_date+"' AND '"+end_date+"' AND emissions != 'Missing information' order by fecha"
        title = 'Histogram of total CO2 emissions for selected time period';
    }

    // One truck - one date
    if(truck_id != 'All' && date != 'All_dates' && global_chart == true){
        query_sql = "SELECT codigo, emissions FROM gps_stats_v7_3 WHERE "+many_trucks+" ORDER BY codigo, fecha"
        title = 'Histogram of total CO2 emissions of truck '+truck_id;
    }

    // Range of dates - One or more trucks
    if(truck_id != 'All' && date != 'All_dates' && global_chart == false){
        query_sql = "SELECT codigo, emissions FROM gps_stats_v7_3 WHERE emissions != 'Missing information' AND "+many_trucks+" AND " +
        "fecha BETWEEN '"+start_date+"' AND '"+end_date+"' order by codigo, fecha"
        title = 'Histogram of total CO2 emissions for selected time period';
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
                    var em = parseFloat(object.emissions);

                    // Only if it is float value
                    if(!isNaN (em))  {
                        // Save distance in array
                        emissions.push(em);

                        if(em < 1){ cont_1++; }
                        if(em < 2 && em > 1){ cont_2++; }
                        if(em < 3 && em > 2){ cont_3++; }
                        if(em < 4 && em > 3){ cont_4++; }
                        if(em < 5 && em > 4){ cont_5++; }
                        if(em < 6 && em > 5){ cont_6++; }
                        if(em < 7 && em > 6){ cont_7++; }
                        if(em < 8 && em > 7){ cont_8++; }
                    }

                } // end for


                //////////
                // Prepare data
                /////////

                var categories = ['1', '2', '3', '4', '5', '6', '7', '8'];       // x axis
                var data_histogram_emissions = [];                                           // Array for highcharts chart
                data_histogram_emissions.push(cont_1);
                data_histogram_emissions.push(cont_2);
                data_histogram_emissions.push(cont_3);
                data_histogram_emissions.push(cont_4);
                data_histogram_emissions.push(cont_5);
                data_histogram_emissions.push(cont_6);
                data_histogram_emissions.push(cont_7);
                data_histogram_emissions.push(cont_8);

                //histogram_emissions(categories, data_histogram_emissions, title);
                histogram_emissions(emissions, title);

            }
        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })


});

/*********************************************************************************************************************
 * Graph - Bar chart
 *********************************************************************************************************************/
function histogram_emissions(emissions, title){
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
                text: 'Emissions (kg)'
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
            data: emissions
        }]
    });

}

