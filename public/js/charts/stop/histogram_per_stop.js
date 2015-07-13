/*********************************************************************************************************************
 * Histogram stops per client
 *********************************************************************************************************************/

$("#duration_stop").click(function() {

    console.log("Duration stops");

    $('#chart').empty();

    //Data histogram
    var duration_stop = [];

    // Query
    var sql_boxplot = new cartodb.SQL({ user: 'manifar92' });
    sql_boxplot.execute("SELECT duration_per_number_of_clients FROM vistastops1_1")
        .done(function(data) {

            console.log(data);

            //If there is no data
            if(data.rows == 0){
                alert("Insufficient data");

                // Clean modal
                $('#chart').empty();
            }
            // Get data for chart
            else{
                for (var i = 0; i < data.total_rows; i++) {

                    var object = data.rows[i];
                    var d_s = object.duration_per_number_of_clients;

                    // Save distance in array
                    duration_stop.push(d_s);

                } // end for

                histogram_duration_stop(duration_stop);

            }
        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })


});

/*********************************************************************************************************************
 * Graph - Bar chart
 *********************************************************************************************************************/
function histogram_duration_stop(drops_stop){

    // Clean modal
    $('#chart').empty();

    $('#chart').highcharts({
        chart: {
            type: 'histogram'
        },
        title: {
            text: 'Histogram of costumer’s average stop duration'
        },
        xAxis: {
            crosshair: true,
            title: {
                text: 'Stops duration (min)'
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
            data: drops_stop
        }]
    });

}

