$("#simple-map").click(function() {

    //Clean buttons
    $("#simple-map").addClass('btn-danger');
    $("#intensity-map").removeClass('btn-danger');
    $("#density-map").removeClass('btn-danger');
    $("#heat-map").removeClass('btn-danger');

    console.log("Changing style - simple map");

    ///////////////
    // Map
    ///////////////
    sublayers[0].setCartoCSS('#traces_watts_2{marker-fill-opacity: 0.9;marker-line-color: #FFF;marker-line-width: 1.5;' +
    'marker-line-opacity: 1;marker-placement: point;marker-type: ellipse;marker-width: 6;marker-fill: #FF6600;' +
    'marker-allow-overlap: true;}');
    return true;

});


$("#intensity-map").click(function() {

    //Clean buttons
    $("#intensity-map").addClass('btn-danger');
    $("#simple-map").removeClass('btn-danger');
    $("#density-map").removeClass('btn-danger');
    $("#heat-map").removeClass('btn-danger');

    console.log("Changing style - Intensity map");

    ///////////////
    // Map
    ///////////////
    sublayers[0].setCartoCSS('#traces_watts_2{marker-fill: #FFCC00; marker-width: 4; marker-line-color: #FFF; marker-line-width: 1.5; marker-line-opacity: 1;' +
    'marker-fill-opacity: 0.9; marker-comp-op: multiply; marker-type: ellipse; marker-placement: point; marker-allow-overlap: true; ' +
    'marker-clip: false; marker-multi-policy: largest;}');
    return true;
});

$("#density-map").click(function() {

    //Clean buttons
    $("#density-map").addClass('btn-danger');
    $("#intensity-map").removeClass('btn-danger');
    $("#simple-map").removeClass('btn-danger');
    $("#heat-map").removeClass('btn-danger');

    console.log("Changing style - Density map");

    ///////////////
    // Map
    ///////////////
    sublayers[0].setCartoCSS('#traces_watts_2{polygon-fill: #BD0026;polygon-opacity: 0.8;line-color: #FFF;line-width: 0.5;' +
    'line-opacity: 1;} #traces_watts_2{[points_density <= 0.395901575971225] { polygon-fill: #BD0026;  }' +
    '[points_density <= 0.0313527563853258] { polygon-fill: #F03B20;  }[points_density <= 0.0126579451245104] ' +
    '{ polygon-fill: #FD8D3C;  }[points_density <= 0.00447896519790368] { polygon-fill: #FECC5C;  }' +
    '[points_density <= 0.00116842570380096] { polygon-fill: #FFFFB2;  } ' +
    '}');
    return true;
});

$("#heat-map").click(function() {

    //Clean buttons
    $("#heat-map").addClass('btn-danger');
    $("#density-map").removeClass('btn-danger');
    $("#intensity-map").removeClass('btn-danger');
    $("#simple-map").removeClass('btn-danger');

    console.log("Changing style - Heat map");

    ///////////////
    // Map
    ///////////////
    sublayers[0].setCartoCSS('Map { -torque-frame-count:32; -torque-animation-duration:15; -torque-time-attribute:"fecha"; ' +
    '-torque-aggregation-function:"count(cartodb_id)"; -torque-resolution:8; -torque-data-aggregation:linear;}' +
    '#traces_watts_2{image-filters: colorize-alpha(blue, cyan, lightgreen, yellow , orange, red);' +
    'marker-file: url(http://s3.amazonaws.com/com.cartodb.assets.static/alphamarker.png);marker-fill-opacity: 0.4*[value];' +
    'marker-width: 14;}' +
    '#traces_watts_2[frame-offset=1] {marker-width:16;marker-fill-opacity:0.2;}' +
    '#traces_watts_2[frame-offset=2] {marker-width:18;marker-fill-opacity:0.1;}');
    return true;
});



