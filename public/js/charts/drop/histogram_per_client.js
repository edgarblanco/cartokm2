/*********************************************************************************************************************
 * Histogram drop size per client
 *********************************************************************************************************************/

$("#drop_client").click(function() {

    $('#chart').empty();

    //Data histogram
    var drops_client = [];

    // Query
    var sql_boxplot = new cartodb.SQL({ user: 'manifar92' });
    sql_boxplot.execute("SELECT drop_size_per_number_of_clientes FROM vistastops1_1")
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
                    var d_c = object.drop_size_per_number_of_clientes;

                    // Save distance in array
                    drops_client.push(d_c);

                } // end for

                histogram_drop_client(drops_client);

            }
        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })


});

/*********************************************************************************************************************
 * Graph - Bar chart
 *********************************************************************************************************************/
function histogram_drop_client(drops_client){

    // Clean modal
    $('#chart').empty();

    $('#chart').highcharts({
        chart: {
            type: 'histogram'
        },
        title: {
            text: 'Histogram of costumer’s annual drop size'
        },
        xAxis: {
            crosshair: true,
            title: {
                text: 'Dropsize (Kg)'
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
            data: drops_client
        }]
    });

}

