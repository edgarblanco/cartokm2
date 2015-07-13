function insights_chart(){
    // Truck Distance
    $("#popup_opt_truck").html(truck_distance_opt);
    $("#popup_change_truck").html(change_truck);

    // Walking Distance
    $("#popup_opt_walking").html(walk_distance_opt);
    $("#popup_change_walking").html(change_walking);

    // Truck Distance
    $("#popup_opt_co2").html(co2_opt);
    $("#popup_change_co2").html(change_co2);
}

/*********************************************************************************************************************
 * Polices charts
 *********************************************************************************************************************/

$("#charts-3").click(function() {

    insights_chart();

    // Parking spaces
    var arr_categories = [];
    // Chart 1
    var Series_chart1 = []; var chart1_truck = []; var chart1_walking = [];
    // Chart 3
    var Series_chart3 = []; var chart3_co2 = []; var chart3_change = [];

    //Prepare SQL to fill categories array and get data
    var sql_categories = new cartodb.SQL({user: 'manifar92'});
    sql_categories.execute("SELECT * FROM optimization1_0 WHERE number_of_p!='' AND number_of_p!='Baseline'")
        .done(function (data) {

            console.log(data);

            for (var i = 0; i < data.total_rows; i++) {
                var object = data.rows[i];

                arr_categories.push(object.number_of_p);

                /////////////////////
                // Chart 1
                /////////////////////

                // Truck distance
                chart1_truck.push(parseFloat(object.truck_distance));
                // Walking distance
                chart1_walking.push(parseFloat(object.distance_walking));

                /////////////////////
                // Chart 3
                /////////////////////

                // CO2 emissions
                chart3_co2.push(parseFloat(object.c02_emission.toFixed(2)));
                // CO2 change
                chart3_change.push(p2f(object.change_co2));

            }

            console.log(arr_categories);
            console.log("Chart3");
            console.log(chart3_co2);
            console.log(chart3_change);

            /////////////////////
            // Chart 1
            /////////////////////

            // Define object for highcrats
            var serie1_chart1 = { name: 'Driving', data: chart1_truck };
            Series_chart1.push(serie1_chart1);
            var serie2_chart1 = { name: 'Walking', data: chart1_walking };
            Series_chart1.push(serie2_chart1);

            // Average
            var total_chart1 = 0;
            $.each(chart1_truck,function() {
                total_chart1 += this;
            });
            var av1 = total_chart1/chart1_truck.length;

            var total2_chart1 = 0;
            $.each(chart1_walking,function() {
                total2_chart1 += this;
            });
            var av2 = total2_chart1/chart1_walking.length;

            var average_chart1 = (av1 + av2) / 2;

            // Graph
            chart_distance(arr_categories, Series_chart1, average_chart1);

            //temporal
            chart_time(arr_categories, Series_chart1, average_chart1);

            /////////////////////
            // Chart 3
            /////////////////////
            // Define object for highcrats
            var serie1_chart3 = { name: 'CO2 emissions', type: 'column', data: chart3_co2, yAxis: 1, tooltip: {valueSuffix: ' kg'} };
            Series_chart3.push(serie1_chart3);
            var serie2_chart3 = { name: '% change co2', type: 'spline', data: chart3_change, tooltip: {valueSuffix: '%'} };
            Series_chart3.push(serie2_chart3);

            // Average
            var total_chart3 = 0;
            $.each(chart3_co2,function() {
                total_chart3 += this;
            });
            var av_co2 = total_chart3/chart3_co2.length;

            // Graph
            chart_emissions(arr_categories, Series_chart3, av_co2);


        })
        .error(function(error) {
            console.error("ERROR: "+error);
        })

});

/*********************************************************************************************************************
 * Grapg chart distance -> Chart 1
 *********************************************************************************************************************/

function chart_distance(arr_categories, Series, av){

    console.log("chart1");

    $('#chart1').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Distance',
            style: {
                fontSize: '14px'
            }
        },
        xAxis: {
            categories: arr_categories
        },
        yAxis: {
            title: {
                text: 'Total distance (m)'
            },
            plotLines: [{
                value: av,
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
            /*stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }*/
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
                /*dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }*/
            }
        },
        series: Series
    });
}

/*********************************************************************************************************************
 * Graph chart time -> Chart 2
 *********************************************************************************************************************/

function chart_time(arr_categories, Series, av){

    console.log("chart2");

    $('#chart2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Logistics Time',
            style: {
                fontSize: '14px'
            }
        },
        xAxis: {
            categories: arr_categories
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total time (hr)'
            },
            plotLines: [{
                value: av,
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
            /*stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }*/
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal'
                /*dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }*/
            }
        },
        series: Series
    });
}

/*********************************************************************************************************************
 * Graph chart emissions -> Chart 3
 *********************************************************************************************************************/

function chart_emissions(arr_categories, Series, av){

    console.log("chart3");

    $('#chart3').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'CO2 emissions ',
            style: {
                fontSize: '14px'
            }
        },
        xAxis: [{
            categories: arr_categories
        }],
        yAxis: [{ // Primary yAxis
            min: 0,
            labels: {
                format: '{value} %',
                //pointFormat: "{point.y:.2f}",
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'change %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'CO2 emissions',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} kg',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true,
            plotLines: [{
                value: av,
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
        }],
        tooltip: {
            shared: true
        },
        legend: {
            align: 'right',
            x: -80,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        series: Series
    });
}