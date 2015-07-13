/*********************************************************************************************************************
 * Get median
 *********************************************************************************************************************/

function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2) {
        //console.log(values[half]);
        return values[half];
    }
    else {
        //console.log((values[half - 1] + values[half]) / 2.0);
        return (values[half - 1] + values[half]) / 2.0;
    }
}

/*********************************************************************************************************************
 * Get Min and max of array
 *********************************************************************************************************************/

// Function to get max value from array
Array.prototype.max = function() {
    return Math.max.apply(null, this);
};
// Function to get min value from array
Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

/*********************************************************************************************************************
 * Convert percent strng to float
 *********************************************************************************************************************/
function p2f(x){
    return parseFloat(x);
}