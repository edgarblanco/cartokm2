/*********************************************************************************************************************
 * Box plot distance
 *********************************************************************************************************************/

$("#boxplotdistance").click(function() {

    //console.log(truck_id);
    //console.log(date);

    /*if(date==undefined){
     alert("Please select the range");
     return;
     }*/

    // Clean chart and object_data
    $('#chart').empty();
    object_data = {};

    // Define query sql and title
    var title;
    var query_sql;

    // If there is no date selected
    if(trucks_array == null && truck_id != 'All'){
        $('#chartModal').modal('hide');
        return;
    }

    // Insufficient data
    if(date == 'insufficient'){
        alert("There is not a valid date range selected");
        return;
    }

    // All dates and all trucks
    if(date == 'All_dates' && truck_id == 'All'){
        query_sql = "SELECT codigo, distancia FROM gps_stats_v7_3 order by codigo, fecha"
        title = 'Total traveled distance per truck for selected time period';
    }

    // Range of dates
    if(truck_id == 'All' && date != 'All_dates'){
        query_sql = "SELECT codigo, distancia FROM gps_stats_v7_3 WHERE fecha BETWEEN '"+start_date+"' AND '"+end_date+"' order by codigo, fecha"
        title = 'Total traveled distance per truck for selected time period';
    }

    // One truck - One date
    if(truck_id != 'All' && date != 'All_dates' && global_chart == true){
        query_sql = "SELECT codigo, distancia FROM gps_stats_v7_3 WHERE "+many_trucks+" ORDER BY codigo, fecha"
        title = 'Total traveled distance per truck of truck '+truck_id;
    }

    // Range of dates - One or more trucks
    if(truck_id != 'All' && date != 'All_dates' && global_chart == false){
        query_sql = "SELECT codigo, distancia FROM gps_stats_v7_3 WHERE "+many_trucks+" AND " +
        "fecha BETWEEN '"+start_date+"' AND '"+end_date+"' order by codigo, fecha"
        title = 'Total traveled distance per truck for selected time period';
    }

    // Query
    var sql_boxplot = new cartodb.SQL({ user: 'manifar92' });
    sql_boxplot.execute(query_sql)
        .done(function(data) {

            //If there is no data
            if(data.rows == 0){
                alert("Insufficient data");
                // Clean modal
                $('#chart').empty();
            }
            // Get data for chart
            else {

                // Save all data
                object_data = data.rows;

                if(truck_id == 'All') {
                    // Process data
                    boxplotdistance_all(title);
                }

                if(truck_id != 'All' && global_chart == true){
                    // Process data
                    boxplotdistance_one(title);
                }

                if(truck_id != 'All' && global_chart == false){
                    // Process data
                    boxplotdistance_many(title);
                }

            }

        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })

});

/*********************************************************************************************************************
 * All
 *********************************************************************************************************************/

function boxplotdistance_all(title){
   // console.log(trucks_codes);
    //console.log(object_data);

    // Arrays to graph
    var categories = [];     // Trucks ids
    var series = [];         // Data to graph
    var array_boxes = [];    // Array for one box to graph
    var array_meds = [];     // Array for median values

    // Begin with first truck id
    for(var i = 0; i < trucks_codes.length; i++){

        var arr = [];                         // Array to save all distance data

        // Save all distances from this truck in an array
        for(var j = 0; j < object_data.length; j++) {

            var obj_data = object_data[j];

            if(trucks_codes[i] == obj_data.codigo){
                arr.push(obj_data.distancia);
            }
        }

        // Once the data of the truck was saved
        if(arr.length < 5){
            // do anything
            // Insuficient Data
            //console.log("Truck "+trucks_codes[i]+" has less than than five values");

        }else {

            ///////
            // Prepare data
            //////

            categories.push(trucks_codes[i]);     // Save this truck id categories array (for x axis)

            //console.log(arr);

            // Sort array
            arr = arr.sort( function(a,b) {return a - b;} );
            //console.log(arr);

            //Set minvalue for total
            var min = arr.min();
            //Set maxvalue for total
            var max = arr.max();
            // Set value for median
            var med = median(arr);
            array_meds.push(med);
            // Set 25%
            var twenty_five = arr[Math.floor(arr.length/4)];
            // Set 75%
            var seventy_five = arr[Math.floor((arr.length/4)*3)];

            // Set array as highcharts demand it
            var new_array = [min, twenty_five, med, seventy_five, max];
            // Save box plot
            array_boxes.push(new_array);

            //console.log("Array Boxes");
            //console.log(array_boxes);

        }

        // Last element
        if((i + 1) == trucks_codes.length){
            // Now graph
            //console.log("Now, graph");

            if(array_boxes.length < 1){
                //There is no box
                $('#chartModal').modal('hide');
                alert("There is not enough data to make the chart");
                return;
            }

            var total_meds = 0;
            $.each(array_meds,function() {
                total_meds += this;
            });

            var median_average = total_meds/array_meds.length;

            // Define object for highcrats
            var serie_n = { name: 'Distance', data: array_boxes };
            series.push(serie_n);
            //console.log(series);

            graph_distance(categories, series, title, median_average);
        }
    }
}

/*********************************************************************************************************************
 * One truck - one date
 *********************************************************************************************************************/

function boxplotdistance_one(title){

    console.log("Box plot distance one truck one day");
    console.log(object_data);
    console.log("Trucks array "+trucks_array.length);

    // Arrays to graph
    var categories = [];     // Trucks ids
    var series = [];         // Data to graph
    var array_boxes = [];    // Array for one box to graph
    var array_meds = [];     // Array for median values

    // Begin with first truck id
    for(var i = 0; i < trucks_array.length; i++) {

        var arr = [];                         // Array to save all distance data

        console.log("Before loop: "+object_data.length);

        // Save all distances from this truck in an array
        for(var j = 0; j < object_data.length; j++) {

            var obj_data = object_data[j];

            if(trucks_array[i] == obj_data.codigo){
                arr.push(obj_data.distancia);
            }
        }

        console.log("After loop (arr): "+arr.length);

        // Once the data of the truck was saved
        if(arr.length < 5){

            // Insuficient Data
            console.warn("The truck "+trucks_array[i]+' has insufficient data to graph');

        }else {

            ///////
            // Prepare data
            //////

            //console.log(arr);

            categories.push(trucks_array[i]);     // Save this truck id categories array (for x axis)

            // Sort array
            arr = arr.sort( function(a,b) {return a - b;} );
            console.log(arr);

            //Set minvalue for total
            var min = arr.min();
            //Set maxvalue for total
            var max = arr.max();
            // Set value for median
            var med = median(arr);
            array_meds.push(med);

            // Set 25%
            var twenty_five = ss.quantile(arr, 0.25);
            console.log(twenty_five);
            var twenty_five2 = arr[Math.floor(arr.length/4)];
            console.log(twenty_five2);

            // Set 75%
            var seventy_five = ss.quantile(arr, 0.75);
            //var seventy_five = arr[Math.floor((arr.length/4)*3)];

            // Set array as highcharts demand it
            var new_array = [min, twenty_five, med, seventy_five, max];
            // Save box plot
            array_boxes.push(new_array);

            console.log("Array Boxes");
            console.log(array_boxes);

        }

        // Last element
        if((i + 1) == trucks_array.length) {
            if (array_boxes.length < 1) {
                //There is no box
                $('#chartModal').modal('hide');
                alert("There is not enough data to make the chart");
                return;
            }

            var total_meds = 0;
            $.each(array_meds, function () {
                total_meds += this;
            });

            var median_average = total_meds / array_meds.length;

            // Define object for highcrats
            var serie_n = {name: 'Distance', data: array_boxes};
            series.push(serie_n);
            console.log(series);

            graph_distance(categories, series, title, median_average);
        }

    }


}

/*********************************************************************************************************************
 * Many trucks - range of dates
 *********************************************************************************************************************/

function boxplotdistance_many(title){

    console.log(object_data);
    console.log("Trucks array "+trucks_array.length);

    // Arrays to graph
    var categories = [];     // Trucks ids
    var series = [];         // Data to graph
    var array_boxes = [];    // Array for one box to graph
    var array_meds = [];     // Array for median values

    // Begin with first truck id
    for(var i = 0; i < trucks_array.length; i++) {

        var arr = [];                         // Array to save all distance data

        console.log("Before loop: "+object_data.length);

        // Save all distances from this truck in an array
        for(var j = 0; j < object_data.length; j++) {

            var obj_data = object_data[j];

            if(trucks_array[i] == obj_data.codigo){
                arr.push(obj_data.distancia);
            }
        }

        console.log("After loop (arr): "+arr.length);

        // Once the data of the truck was saved
        if(arr.length < 5){
            // do anything
            // Insuficient Data
            alert("Not enough data to graph "+trucks_array[i]+' boxplot');

        }else {

            ///////
            // Prepare data
            //////

            //console.log(arr);

            categories.push(trucks_array[i]);     // Save this truck id categories array (for x axis)

            // Sort array
            arr = arr.sort( function(a,b) {return a - b;} );
            console.log(arr);

            //Set minvalue for total
            var min = arr.min();
            //Set maxvalue for total
            var max = arr.max();
            // Set value for median
            var med = median(arr);
            array_meds.push(med);

            // Set 25%
            var twenty_five = ss.quantile(arr, 0.25);
            //console.log(twenty_five);
            //var twenty_five2 = arr[Math.floor(arr.length/4)];
            //console.log(twenty_five2);

            // Set 75%
            var seventy_five = ss.quantile(arr, 0.75);
            //console.log(seventy_five);
            //var seventy_five2 = arr[Math.floor((arr.length/4)*3)];
            //console.log(seventy_five2);

            // Set array as highcharts demand it
            var new_array = [min, twenty_five, med, seventy_five, max];
            // Save box plot
            array_boxes.push(new_array);

            console.log("Array Boxes");
            console.log(array_boxes);

        }

        // Last element
        if((i + 1) == trucks_array.length) {
            if (array_boxes.length < 1) {
                //There is no box
                $('#chartModal').modal('hide');
                alert("There is not enough data to make the chart");
                return;
            }

            var total_meds = 0;
            $.each(array_meds, function () {
                total_meds += this;
            });

            var median_average = total_meds / array_meds.length;

            // Define object for highcrats
            var serie_n = {name: 'Distance', data: array_boxes};
            series.push(serie_n);
            console.log(series);

            graph_distance(categories, series, title, median_average);
        }

    }


}

/*********************************************************************************************************************
 * Graph
 *********************************************************************************************************************/
function graph_distance(categories, series, title, median){
    $('#chart').highcharts({

        chart: {
            type: 'boxplot'
        },

        title: {
            text: title
        },

        legend: {
            enabled: false
        },

        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Distance (Km)'
            },
            plotLines: [{
                value: median,
                color: 'red',
                width: 1,
                label: {
                    text: '',
                    align: 'center',
                    style: {
                        color: 'gray'
                    }
                }
            }]
        },
        series: series
    });
}
