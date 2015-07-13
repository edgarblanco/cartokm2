$("#btn-layer1").click(function() {

    //Clean buttons
    $("#btn-layer1").addClass('btn-danger');
    $("#btn-layer2").removeClass('btn-danger');

    console.log("Type 1");

    ///////////////
    // Map
    ///////////////
    map.removeLayer(map_layer2);
    map.addLayer(map_layer1);

    bool_layer1 = true;
    bool_layer2 = false;

});

$("#btn-layer2").click(function() {

    //Clean buttons
    $("#btn-layer2").addClass('btn-danger');
    $("#btn-layer1").removeClass('btn-danger');

    console.log("Type 2");

    ///////////////
    // Map
    ///////////////
    map.removeLayer(map_layer1);
    map.addLayer(map_layer2);

    bool_layer2 = true;
    bool_layer1 = false;

});