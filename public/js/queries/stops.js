second_view();

// Data for first view
function second_view(){

    var arr_drop_client = []; var arr_drop_stop = []; var arr_duration_client = []; var arr_duration_stop = [];

    //Prepare SQL for insights
    var sql_boxplot = new cartodb.SQL({ user: 'manifar92' });
    sql_boxplot.execute("SELECT * FROM vistastops1_1")
        .done(function(data) {

            console.log(data);

            for (var i = 0; i < data.total_rows; i++) {
                var object = data.rows[i];

                arr_drop_client.push(object.drop_size_per_number_of_clientes);
                arr_drop_stop.push(object.dropsize_per_stop);
                arr_duration_client.push(object.mean_duration);
                arr_duration_stop.push(object.duration_per_number_of_clients);

            }

            //Get drop size per client
            var total_drop_size_client = 0;
            $.each(arr_drop_client,function() {
                total_drop_size_client += this;
            });

            //Get drop size per stop
            var total_drop_size_stop = 0;
            $.each(arr_drop_stop,function() {
                total_drop_size_stop += this;
            });

            //Get duration per client
            var total_duration_client = 0;
            $.each(arr_duration_client,function() {
                total_duration_client += this;
            });

            //Get duration per stop
            var total_duration_stop = 0;
            $.each(arr_duration_stop,function() {
                total_duration_stop += this;
            });

            // Totals
            console.log("Total drop size client: "+total_drop_size_client);
            console.log("Total drop size stop: "+total_drop_size_stop);
            console.log("Total duration client: "+total_duration_client);
            console.log("Total duration stop: "+total_duration_stop);

            /////////////////
            // INSIGHTS
            /////////////////

            // Drop size per client
            //var total_drop_size_client_fixed = total_drop_size_client.toFixed(2) +' units';
            var average_drop_size_client = parseFloat((total_drop_size_client/arr_drop_client.length).toFixed(2)).toLocaleString() + ' Kg';
            $("#total_drop_client").html(average_drop_size_client);
            //$("#average_distance").html(average_distance);

            // Drop size per stop
            //var total_drop_size_client_fixed = total_drop_size_client.toFixed(2) +' units';
            var average_drop_size_stop = parseFloat((total_drop_size_stop/arr_drop_stop.length).toFixed(2)).toLocaleString() + ' Kg';
            $("#total_drop_stop").html(average_drop_size_stop);
            //$("#average_distance").html(average_distance);

            var average_duration_client = parseFloat((total_duration_client/arr_duration_client.length).toFixed(2)).toLocaleString() + ' min';
            $("#total_duration_client").html(average_duration_client);

            var average_duration_stop = parseFloat((total_duration_stop/arr_duration_stop.length).toFixed(2)).toLocaleString() + ' min';
            $("#total_duration_stop").html(average_duration_stop);


        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })

}