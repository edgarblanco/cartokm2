/*********************************************************************************************************************
 * Histogram stops per client
 *********************************************************************************************************************/

$("#duration_client").click(function() {

    $('#chart').empty();

    //Data histogram
    var duration_client = [];

    // Query
    var sql_boxplot = new cartodb.SQL({ user: 'manifar92' });
    sql_boxplot.execute("SELECT mean_duration FROM vistastops1_1")
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
                    var d_c = object.mean_duration;

                    // Save distance in array
                    duration_client.push(d_c);

                } // end for

                histogram_duration_client(duration_client);

            }
        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })


});

/*********************************************************************************************************************
 * Graph - Bar chart
 *********************************************************************************************************************/
function histogram_duration_client(drops_client){

    // Clean modal
    $('#chart').empty();

    $('#chart').highcharts({
        chart: {
            type: 'histogram'
        },
        title: {
            text: 'Histogram of stop’s average duration'
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
            showInLegend: false,
            name: '',
            data: drops_client
        }]
    });

    /*var chart = $('#chart').highcharts();

    chart.setTitle({text: "New title"});*/

}

