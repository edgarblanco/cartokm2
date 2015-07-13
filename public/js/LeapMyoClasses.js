/**
 * Author: Lourdes Munoz-Gomez
 * July, 2015
 * Classes for interaction with LeapMotion and Myo at the same time.
 */

/**
 * Global variables
 */
var g_myoCon;
var g_pWidth;
var g_pHeight;
var g_nextV;
var g_closeC;
var g_select;
var g_sTotal;
var g_actual;
var g_grafAbi;
var g_id_sel;
var g_datePickerInput;
var g_dateOpen;
var leapRegionArray;
var g_mes;

/**
 * LeapMyo Class
 */
/**
 * Constructor
 * panel - div in which will appear the LeapPointer
 * pWidth - width of the panel
 * pHeight - height of the panel
 * nextV - the button to switch to next view
 * actual - string containing the actual 
 *          view 3 possibilities: flows, stops, policies
 */
function LeapMyo(pWidth,pHeight,nextV,closeC,selectI,selTot,actual) { 

  g_pWidth = pWidth;
  g_pHeight = pHeight;
  g_nextV = nextV;
  g_closeC = closeC;
  g_select = selectI;
  g_sTotal = selTot;
  g_actual = actual;
  g_dateOpen = false;
  g_mes = 1;

  //Indicates if Myo is connected
  g_myoCon = false;

  //Indicates if a graph is already open
  g_grafAbi = false;

  //Indicates the selected item id for trucks or ps
  g_id_sel = 0;

  console.log("En el constructor");
}

/**
 * Set the array with the leapRegions
 */
LeapMyo.prototype.setArrayLeapRegions = function(leapRA) {
   leapRegionArray = leapRA;
   console.log("listo regiones "+leapRegionArray.length);
};

/**
 * Set the array with the leapRegions
 */
LeapMyo.prototype.setDatePickerInput = function(datePI) {
   g_datePickerInput = datePI;
   console.log("Ya esta la fecha");
};

/**
 * This method only applies for special cases:
 * 1) Flows view, for interaction with datepicker
 */
function specialCases(xco,yco){

   //Este es para el caso de las fechas y solo aplica en la vista de flows
   if(g_grafAbi == false && xco>850 && xco<950 && yco>0 && yco<25 && g_actual == "flows")
   {
      g_dateOpen = true;
      g_grafAbi = true;
      $('#daterange').data('daterangepicker').setStartDate('2014-07-01');
      $('#daterange').data('daterangepicker').setEndDate('2014-07-31');
      g_datePickerInput.click();
      console.log("fechas ABIERTO");
   }

   //ApplyButton in DatePicker
   if(g_grafAbi == true && g_dateOpen == true && xco>880  && xco<930  && yco>100  && yco<130)
   {
      //console.log("Apply");
      //$('#daterange').data('daterangepicker').clickApply();
      //g_grafAbi = false;
      //g_dateOpen = false;
   }

   //CancelButton in DatePicker
   if(g_grafAbi == true && g_dateOpen == true && xco>940  && xco<990  && yco>100  && yco<130 )
   {
      //console.log("Cancelar");
      //$('#daterange').data('daterangepicker').clickCancel();
      //g_grafAbi = false;
      //g_dateOpen = false;
   }

};


/**
 * This method activates the LeapMotion sensor.
 * Each leap.on section defines what has to be done when an event is trigerred.
 */
LeapMyo.prototype.activateLeap = function(){

  var lp = document.createElement('div');
  lp.style.position = 'absolute';
  lp.style.backgroundColor = '#FF0000';
  lp.style.margin = '0';
  lp.style.padding = '5px';
  lp.style.zIndex = '10000';


  this.leap = new Leap.Controller({enableGestures: true}); 
  this.leap.connect();

  this.leap.on('connect', function(){
        console.log('Leap connected');
      });

  this.leap.on('gesture', function(gesture) { 
     //console.log(gesture.type + " with ID " + gesture.id + " in position " + gesture.position);
     if(g_myoCon == false){
     switch (gesture.type){
         case "screenTap":
              if(g_actual == "flows" && g_grafAbi == false)
              {
                console.log("Screen Tap DURA "+gesture.duration);
                g_id_sel = (g_id_sel+1) % g_sTotal; 
                g_select.selectedIndex = g_id_sel;
              }
              if(g_actual == "policies" && g_grafAbi == false)
              {
                console.log("Screen Tap DURA "+gesture.duration);
                if(g_id_sel == 0) g_id_sel = 1;
                g_id_sel = (g_id_sel+1) % g_sTotal; 
                g_select.value = g_id_sel;
              }
              break;
         case "swipe":
              //Classify swipe as either horizontal or vertical
              var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
              if(isHorizontal && g_grafAbi == false && gesture.duration > 80000){
                  console.log("Ges swipe "+g_myoCon+" "+gesture.duration);
                  console.log("swipe");
                  g_nextV.click();
              }
              break;
         case "keyTap":
                  console.log("Tapping antes");
                  if(g_grafAbi == true && g_dateOpen == true && gesture.duration > 80000)
                  {
                    console.log("Tapping");
                    switch(g_mes) {
                       case 0:
                        $('#daterange').data('daterangepicker').setStartDate('2014-07-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-07-31');
                        break;
                       case 1:
                        $('#daterange').data('daterangepicker').setStartDate('2014-08-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-08-31');
                        break;
                       case 2:
                        $('#daterange').data('daterangepicker').setStartDate('2014-09-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-09-30');
                        break;
                       case 3:
                        $('#daterange').data('daterangepicker').setStartDate('2014-10-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-10-31');
                        break;
                       case 4:
                        $('#daterange').data('daterangepicker').setStartDate('2014-11-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-11-30');
                        break;
                       case 5:
                        $('#daterange').data('daterangepicker').setStartDate('2014-12-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-12-31');
                        break;
                    }
                    g_mes = (g_mes+1)%6;
                    $('#daterange').data('daterangepicker').updateFormInputs();
                  }
                  break;
     }
     }
  });

  this.leap.on('frame', function(frame) { 
     for (var i in frame.handsMap) {
        var hand = frame.handsMap[i];
        var indice = hand.indexFinger;
        var medio = hand.middleFinger;
        var anular = hand.ringFinger;
        var menique = hand.pinky;

        if(indice.extended == true && medio.extended == false && anular.extended == false && 
           menique.extended == false && hand.type  == 'right') {
           var pos = indice.distal.center();
           var interactionBox = frame.interactionBox;
           var normalizedPosition = interactionBox.normalizePoint(pos, true);
   
           var xco = g_pWidth * normalizedPosition[0];
           var yco = g_pHeight  * (1 - normalizedPosition[1]);
           lp.style.left = (xco+7) + 'px';
           lp.style.top = (yco+7) + 'px';

           //console.log("X "+xco+" Y "+yco);

           document.body.appendChild(lp);

           if(g_grafAbi == false)
             for (var i = 0; i < leapRegionArray.length; i++) {
              if( leapRegionArray[i].isInsideClick(xco,yco) == true)
                g_grafAbi = true;
             }

           specialCases(xco, yco);

        }//cierra if indice extendido

        if(g_grafAbi == true && hand.type == 'right' && hand.grabStrength > 0.7 
                             && g_myoCon == false && g_dateOpen == false) {
          console.log("Mano cerrada");
          g_closeC.click();
          g_grafAbi = false;
        }//cierra if si cerramos la mano

        if(g_grafAbi == true && hand.type == 'right' && hand.grabStrength > 0.9 
                             && g_myoCon == false && g_dateOpen == true) {
          console.log("Cerrando fecha");
          $('#daterange').data('daterangepicker').clickApply();
          g_grafAbi = false;
          g_dateOpen = false;
        }//cierra if si cerramos la mano

     }//cierra for de manos
  });//cierra on Frame

};


/**
 * This method actives de Myo sensor, is programmed using events.
 * Each myo.on section defines what has to be done when an event is trigerred.
 */
LeapMyo.prototype.activateMyo = function (){

  var myo = Myo.create(0);

  myo.on('connected', function(){
        console.log('Myo connected');
        g_myoCon = true;
        myo.vibrate();
        myo.unlock(600000);
  });

  myo.on('wave_in', function(edge){
	console.log('wave In!');
        myo.timer(edge, 300, function(){
          myo.trigger('cambiarpagina');
        });
  });

  myo.on('cambiarpagina',function(){
        if(g_grafAbi == false)
        {
          console.log("Cambias vista");
          g_nextV.click();
        }
  });

  myo.on('wave_out', function(edge){
	console.log('wave Out!');
        myo.timer(edge, 300, function(){
          myo.trigger('cambiarTruck');
        });
  });

  myo.on('cambiarTruck',function(){
        if(g_actual == "flows" && g_grafAbi == false)
        {
           console.log("Cambia camion");
           g_id_sel = (g_id_sel+1) % g_sTotal; 
           g_select.selectedIndex = g_id_sel;
        }
  });

  myo.on('fist', function(edge){
        console.log('Punio');
        myo.timer(edge, 300, function(){
          myo.trigger('cerrarpopup');
        });
  });

  myo.on('cerrarpopup',function(){
        if(g_dateOpen == false && g_grafAbi == true)
        {
          console.log('Close graph');
          g_closeC.click();
          g_grafAbi = false;
        }
  });

  myo.on('fingers_spread', function(edge){
        myo.timer(edge, 300, function(){
          myo.trigger('cambiaCal');
        });
  });

  myo.on('cambiaCal',function(){
              if(g_grafAbi == true && g_dateOpen == true)
                  {
                    console.log('Cambia Meses');
                    switch(g_mes) {
                       case 0:
                        $('#daterange').data('daterangepicker').setStartDate('2014-07-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-07-31');
                        break;
                       case 1:
                        $('#daterange').data('daterangepicker').setStartDate('2014-08-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-08-31');
                        break;
                       case 2:
                        $('#daterange').data('daterangepicker').setStartDate('2014-09-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-09-30');
                        break;
                       case 3:
                        $('#daterange').data('daterangepicker').setStartDate('2014-10-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-10-31');
                        break;
                       case 4:
                        $('#daterange').data('daterangepicker').setStartDate('2014-11-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-11-30');
                        break;
                       case 5:
                        $('#daterange').data('daterangepicker').setStartDate('2014-12-01');
                        $('#daterange').data('daterangepicker').setEndDate('2014-12-31');
                        break;
                    }
                    g_mes = (g_mes+1)%6;
                    $('#daterange').data('daterangepicker').updateFormInputs();
                  }
  });


};

/* End LeapMyo Class */

/**
 * LeapRegion Class
 * This class defines a region that will be pointable with the leapCursor
 */

function LeapRegion(elementClick,xi,xf,yi,yf,abreAlgo) {
   this.elementClick = elementClick;
   this.xi = xi;
   this.xf = xf;
   this.yi = yi;
   this.yf = yf;
   this.abreAlgo = abreAlgo;
}

LeapRegion.prototype.isInsideClick = function(xleap,yleap) {
  if(xleap > this.xi && xleap < this.xf && yleap > this.yi && yleap < this.yf) {
    console.log("Click");
    if(g_actual == "policies" && this.xi == 770 && this.xf == 820 && this.yi == 10 && this.yf == 30)
      $('#p_btn').click();
    else 
      this.elementClick.click();
    return this.abreAlgo;
  }
};

/* End LeapRegio Class */



