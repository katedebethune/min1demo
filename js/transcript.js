/* transcript.js */

/********************************************************************
  *
  * Canvas clear function
  * http://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
  *
  ********************************************************************/

CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }           
};

/********************************************************************
  *
  * Canvas clear function - Usage examples
  * http://stackoverflow.com/questions/2142535/how-to-clear-the-canvas-for-redrawing
  *
  ********************************************************************/

/*
window.onload = function () {
  var canvas = document.getElementById('canvasId');
  var context = canvas.getContext('2d');

  // do some drawing
  context.clear();

  // do some more drawing
  context.setTransform(-1, 0, 0, 1, 200, 200);
  // do some drawing with the new transform
  context.clear(true);
  // draw more, still using the preserved transform
};
*/

/********************************************************************
  *
  * Music Overlay object to help organize info related to music image,
  * coordinates and timing for video interaction
  *
  ********************************************************************/
  function musicOverlay(img_src, img_width, img_height, coord_timings) {
  this.img_src = img_src;         //string
  this.img_width = img_width;   //number
  this.img_height = img_height; //number
  this.coord_timings = coord_timings; //array of objects holding coordinates and timing for each clip
  
  //functions
  /* this.duration = function() {
    var a = Math.floor((Date.parse(this.end) - Date.parse(this.start)) / (24*3600*1000));
    return a + " days";
  };
  
  this.info = function() {
    return "THe SS "+ this.vessel.name + " which is " + this.vessel.length + " long will sail from " + this.ports[0] 
      + " on " + this.start + ". The cruise will be " + this.duration() + " long."
  }; */
 }
  
function inspect(obj) {
  for (var p in obj) {
    console.log(p + " = " + obj[p] + " and is of type " + typeof(obj[p]));
  }   
}

var overlay1 = new musicOverlay("img/min1.png", 500, 234, 
    [
      {clip: 0, x1: 15, x2: 150, y1: 5, y2: 50, start: "0", end: "9.50"}, 
      {clip: 1, x1: 190, x2: 330, y1: 5, y2: 50, start: "9.50", end: "16.50"},
      {clip: 2, x1: 340, x2: 490, y1: 5, y2: 50, start: "16.50", end: "21.5"},
      {clip: 3, x1: 15, x2: 135, y1: 70, y2: 110, start: "22.0", end: "27.00"},
      {clip: 4, x1: 145, x2: 270, y1: 70, y2: 110, start: "28.00", end: "33.00"},
      {clip: 5, x1: 280, x2: 415, y1: 70, y2: 110, start: "34.00", end: "40.00"},
      {clip: 6, x1: 420, x2: 495, y1: 70, y2: 110, start: "50.00", end: "55.00"},
      {clip: 7, x1: 65, x2: 185, y1: 135, y2: 175, start: "55.00", end: "58.00"},
      {clip: 8, x1: 260, x2: 440, y1: 135, y2: 175, start: "60.00", end: "65.00"},
      {clip: 9, x1: 15, x2: 495, y1: 190, y2: 234, start: "70.00", end: "90.00"}
    ]
  );



var counter = 0;

(function($){

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *          NOTE - READ THIS ENTIRE FILE BEFORE YOU START DOING ANYTHING
     *            MUCH OF WHAT IS DESCRIBED HERE IS ALREADY DONE FOR YOU!
     *
     *          THE GOAL IS TO HELP YOU UNDERSTAND AND RECOGNIZE THE
     *            STRUCTURE AND DESIGN OF JQUERY PLUGINS, AS WELL AS TO
     *            HELP YOU UNDERSTAND JWPLAYER AND VIDEO APPLICATION APIs
     *
     *  Our jQuery Collections plugin, 'playerConnect', acts on a collection
     *  of HTML elements that represent the transcript to be the selection
     *  passed by jQuery. It also expects one argument - the jwplayer object
     *  that represents the player that's been initialized in the page.
     *
     *  Each HTML element must have
     *  two attributes: data-start and data-dur. These are numbers (floats)
     *  which reflect the matching time range (in seconds) from the
     *  video.
     *
     *  HTML Example:
     *  <span class="words" data-start="17.869" data-dur="3.82">Hey this is
          Dwayne Johnson. While playing astronaut Chuck Baker in the film Planet</span>
        <span class="words" data-start="21.689" data-dur="0.701">51</span>
        <span class="words" data-start="22.39" data-dur="3.56">I gained a lot of
          respect for our nation's space program. NASA makes new</span>
     *
     *  This plugin will do two things.
     *
     *      1) It will attach an onTime handler
                 (http://support.jwplayer.com/customer/portal/articles/1413089-javascript-api-reference#seek)
     *         to the player which
     *         iterates over the selected transcript elements, and
     *         applies the 'hilite' class if the time position of the player
     *         is within the time range defined by the data-start and
     *         data-dur attributes of the element. Accordingly, if the
     *         element is not in the specified range, we remove any
     *         'hilite' class.
     *
     *      2) It will attach a click hander to each transcript element
     *         which gets that element's start time from data-start and
     *         calls player.seek() with that time as its argument.
     *
     *     The result is that as the video plays, the part of the transcript
     *     that's being spoken will highlight, and a user clicking on any
     *     transcript text will cause the video to play the relevant segment.
     *
     *
     */
    $.fn.playerConnect = function(player){
        //console.log("calling inspect from line 94");
        //inspect(overlay1);
        //console.log(parseFloat(overlay1.coord_timings[0].start));

        var canvas = document.getElementById("overlayCanvas");
        var ctx = document.getElementById("overlayCanvas").getContext("2d");
        canvas.width = overlay1.img_width;
        canvas.height = overlay1.img_height;

        // Here, 'this' is the collection selected by jQuery. Let's
        //  assign it to a local variable so we have access to it
        //  from other functions and handlers inside this plugin.
        //var transcriptElements = this;
        
        // Here we define our function that will run every time the player
        //  updates its "position" property. 'onTime' is an event that is triggered
        //  by the player continually as the video plays. This will happen many times
        //  per second while the video is playing.
        player.onTime(function(evt){

                /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                 *
                 *  Follow the prompts in these comments to structure your code. Read them carefully.
                 */

                 /* Get the current time of the video playback and assign it to the variable 'time'.
                  *  It is a property of the player's evt object. Refer to the classroom lecture, or use the
                  *  documentation of onTime at
                  *     http://support.jwplayer.com/customer/portal/articles/1413089-javascript-api-reference#seek
                  *  to see the properties available within this event object. (Note that the 'duration' property
                  *  of the JWPlayer onTime event is not related to the duration described by the transcript element
                  *  in our HTML, and you will not need to use it.)
                  *
                  * */
                //var time =  ''; //YOUR CODE TO ADD #2 - replace the empty quotes with your code
                
                /******************************************************************/
                /* Code to set the time variable equal to the current position    */
                 /*****************************************************************/
                
                var time = evt.position;
                //console.log(time);       // see if it's working
                
                
                /***********************************************************************/
                /* END: Code to set the time variable equal to the current position    */
                /***********************************************************************/


                /*  Next you need to iterate over the transcriptElements (using a 'for' loop or
                 *   transcriptElements.each()), and for each one, see if the 'time' is greater
                 *   than the element's data-start and less than the end
                 *   ('end' being equal to data-start plus data-dur).  The jquery .attr() function
                 *   will be useful here.
                 *
                 *  If the player time is in range use jQuery's addClass() to add the "hilite" class
                 *   to the element. Otherwise, use removeClass() to remove it. ".hilite" is already defined
                 *   in the stylesheet, so you don't have to manipulate the element styles themselves.
                 *
                 *  Remember that the attribute values are going to come to you as Strings
                 *   and you'll need to change them into Floats or Integers (parseFloat(), parseInt()).
                 *   Don't worry about non-numeric data or missing attributes - it's OK to assume that
                 *   the data in the HTML is valid.
                 *
                 *   in pseudo-code it's something like this:
                 *      for each transcript element
                 *          if (time >= element_start_time && time <=element_end_time)
                 *             add "hilight" class
                 *          else
                 *             remove "hilite" class
                 *
                 *   Note that the 'transcriptElements' array variable is already defined (line 43) and
                 *   contains the array of <SPAN> elements. You just have to iterate and do the rest
                 */

                // YOUR for() loop or transcriptElements.each() goes here...
                // YOUR CODE TO ADD #3
				
				/***************************************************/
                /* Code to implement hilite class added here       */
                /***************************************************/
				
                /*
				transcriptElements.each(function( index ) {
  					var start = parseFloat(($ (this ).attr( "data-start")));
  					var dur = parseFloat(($ (this ).attr( "data-dur")));
  					if ( time >= start && time <= ( start + dur ) ) {
  						$( this ).addClass( "hilite" );
  					}
  					else {
  						$( this ).removeClass( "hilite" );
  					}
				}); */

                //overlay1.coord_timings[0].start
                //overlay1.coord_timings[0].duration
                
                
                $.each(overlay1, function( ) {
                    //console.log("iterating over jquery function");
                    //console.log(start);
                    var start = parseFloat(overlay1.coord_timings[counter].start);
                    //console.log("start = " + start);
                    var end = parseFloat(overlay1.coord_timings[counter].end);
                    //console.log("start = " + end);
                    if ( time >= start && time <= end ) {
                        //$( this ).addClass( "hilite" );
                        //console.log("Inside the first clip");
                        //contexts['orig'].strokeStyle = 'rgba(0,153,255,1)';
                        /* contexts['orig'].strokeRect(overlay1.coord_timings[counter].x1, overlay1.coord_timings[counter].y1, 
                            overlay1.coord_timings[counter].x2, overlay1.coord_timings[counter].y2 ); */

                        console.log(counter + " " + overlay1.coord_timings[counter].x1 + " " + overlay1.coord_timings[counter].x2);
                        /*
                        ctx.strokeRect(overlay1.coord_timings[counter].x1, overlay1.coord_timings[counter].y1, 
                            overlay1.coord_timings[counter].x2, overlay1.coord_timings[counter].y2 ); */
                       
                        

                        
                        ctx.beginPath();
                        ctx.moveTo(overlay1.coord_timings[counter].x1, overlay1.coord_timings[counter].y1);
                        ctx.lineTo(overlay1.coord_timings[counter].x2, overlay1.coord_timings[counter].y1);
                        ctx.lineTo(overlay1.coord_timings[counter].x2, overlay1.coord_timings[counter].y2);
                        ctx.lineTo(overlay1.coord_timings[counter].x1, overlay1.coord_timings[counter].y2);
                        ctx.lineTo(overlay1.coord_timings[counter].x1, overlay1.coord_timings[counter].y1);
                        ctx.stroke();
                        
                    }
                    else if ( time > end ) {
                        
                        ctx.clear();

                        /* contexts['orig'].strokeRect(overlay1.coord_timings[counter].x1, overlay1.coord_timings[counter].y1, 
                            overlay1.coord_timings[counter].x2, overlay1.coord_timings[counter].y2 ); */

                        //contexts['orig'].restore();
                        //contexts['orig'].clear(true);
                        //contexts['orig'].getContext('2d');
                        //contexts['orig'].drawImage(overlay1.img_src, 0,0);
                        /*
                        $("originalCanvas")[0].onload( {
                            canvases['orig'].width = overlay1.img_width;
                            canvases['orig'].height = overlay1.img_height;
                            contexts['orig'] = canvases['orig'].getContext('2d');
                            
                            contexts['orig'].drawImage('overlay1.img_src', 0, 0);
                        });
                        */
                        //contexts['orig'].restore();
                        /* var image_obj1 = new Image();
                        image_obj1.src = overlay1.img_src;

                        canvases['orig'].width = overlay1.img_width;
                        canvases['orig'].height = overlay1.img_height;
                        contexts['orig'] = canvases[key].getContext('2d');
                        newImageData['orig'] = contexts['orig'].createImageData(canvases['orig'].width, canvases['orig'].height);
                        image_obj.onload = function(){ 

                            contexts['orig'].drawImage('overlay1.img_src', 0, 0);
                        }; */
                       
                        
                        counter = counter + 1;
                        console.log("counter inside increment block" + counter);
                    }
                });

                /*
                 transcriptElements.each(function( index ) {
                    //var start = parseFloat(($ (this ).attr( "data-start")));
                    var start = parseFloat(overlay1.coord_timings[0].start);
                    var dur = parseFloat(overlay1.coord_timings[0].duration);
                    if ( time >= start && time <= ( start + dur ) ) {
                        //$( this ).addClass( "hilite" );
                        console.log("Inside the first clip");
                    }
                    else {
                        //$( this ).removeClass( "hilite" );
                        console.log("Outside the first clip");
                    }
                }); */
				
				/***************************************************/
                /* END: Code to implement hilite class             */
                /***************************************************/
        });

        /*
         * Here we attach a click handler to each HTML object that jQuery has provided to us
         * The handler will be a function that calls player.seek(), passing the
         * the start time from the data-start attribute
         *
         * And of course we return it, so our plugin is chainable
         * */
        return this.click(function(evt){

                // YOUR CODE TO ADD #4
                //   Get the value of the data-start attribute (the jQuery .attr() function could help here)
                //   and call player.seek([your value goes here])
                
                /***************************************************/
                /* Code to implement seek functionality added here */
                /***************************************************/
                
                var start = parseFloat(($ (this ).attr( "data-start")));
                player.seek(start);
                
                /***************************************************/
                /* END: Code to implement seek functionality       */
                /***************************************************/
       });
   };

})(jQuery);


// We always use $(document).ready() to be sure the DOM has loaded
//  before we execute any JS that references the DOM
$(document).ready(function(){

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  YOUR CODE TO ADD #1
     *
     *  Add the media player here and assign it to the 'player' variable.
     *  A few details about the player config:
     *      * Use the DIV with id="playerDiv" as the target for your player
     *      * make your width 640 and your height 480
     *      * set controls to true
     *      * the media file is at http://www.people.fas.harvard.edu/~lbouthillier/nasa-spinoffs.mp4
     *      *   You will be able to access it via the URL, even if you're running your
     *      *   code from the local filesystem. There's no need to download it.
     *      *
     *   Documentation of basic player embedding is described in Step 2 on the page at
     *   http://support.jwplayer.com/customer/portal/articles/1406723-mp4-video-embed
     *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

   //add the media player
   //  YOUR CODE TO ADD #1 (already done for you)
   var player = jwplayer("playerDiv").setup({
                    //file: "http://www.people.fas.harvard.edu/~lbouthillier/nasa-spinoffs.mp4",
                    //file: "///Users/katedebethune/movies/Mac Video Library/take3.mp4",
                    file: "https://s3-us-west-2.amazonaws.com/katedebethune/studio-assets/take3.mp4",
                    //height: 360,
                    height: 234,
                    //width: 640,
                    width: 500,
                    controls:true,
                });

    // Like with $(document).ready(), we use player.onReady to be sure the
    //   player is loaded before we try to do anything with it
   player.onReady(function(){

        //  Here we call our jQuery plugin, playerConnect, which expects the
        //   collection of HTML elements that contains the transcript. In this
        //   case it's all the SPANs with class="words"
        //$('.words').playerConnect(player);
        $('.overlayCanvas').playerConnect(player);


    });

});
