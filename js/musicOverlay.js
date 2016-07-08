'use strict';

/* 
 * Music Overlay
 * Kate de Bethune, April 26, 2016
 */

/* 
 * CUSTOM OBJECTS
 * 
 * Part 1:
 * 
 * Create a function that can create instances of custom objects.
 * The subject matter will be a png of a musical score that will be highlighted dynamically while a video plays.
 * The function will create properties for the following pieces of data:
 * 		-- img_src //string
 *  	-- img_width //number
 *    -- img_height //number
 * 		-- px_coord //array of numbers (ints)
 *		-- timings //array of numbers (floats)
 *
 * You will also create one or two function of your choosing within the function. 
 * For example, perform calculations on object properties or read out a 
 * concatenated string of properties.
 * 
 * Finally, you will create a separate "object inspector" function which
 * will display the name, value, and variable type for each property of your object.
 *
 */
 
 function musicOverlay(img_src, img_width, img_height, coord_timings) {
 	this.img_src = img_src; 				//string
 	this.img_width = img_width;		//number
 	this.img_height = img_height;	//number
 	this.coord_timings = coord_timings; //object holding coordinates and timing for each clip
 	
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

  


 
	
 /*
  * CUSTOM OBJECTS 
  *
  * Part 2
  * 
  * Instantiate two examples of your custom object, populated with dummy data
  * of your choosing.
  *
  */
  
  var overlay1 = new musicOverlay("img/min1.png", 500, 234, 
  	{ clip1: {x1: 15, x2: 180, y1: 5, y2: 50, start: "3.50", duration: "5.30"}, 
    clip2: {x1: 185, x2: 335, y1: 5, y2: 50, start: "6.3", duration: "4.0"},
    clip3: {x1: 340, x2: 500, y1: 5, y2: 50, start: "10.00", duration: "4.25"},
    clip4: {x1: 15, x2: 135, y1: 70, y2: 110, start: "15.00", duration: "4.00"},
    clip5: {x1: 145, x2: 270, y1: 70, y2: 110, start: "19.00", duration: "3.25"},
    clip6: {x1: 280, x2: 415, y1: 70, y2: 110, start: "22.25", duration: "4.25"}
    }
  );

  /*
   * CUSTOM OBJECTS
   *
   * Part 3
   *
   * 3.1 Iterate over all of the properties in one of your objects.
   * 3.2 For one of your objects, write each of your simple variables 
   * 	(string, number, boolean) to console.log.
   * 3.3 Select your array from the set of properties and iterate over it, writing
   * 	 the results to console.log
   * 3.4 Select your object from the set of properties and iterate over it, writing the 
   * 	 results to console.log
   * 3.5 Call your custom function(s) and write the output to console.log
   * 3.6 Call your "object inspector" function and write the output to console.log
   *
   */
   
   //3.1
   
    console.log("3.1 - iterating over all properties");
    for ( var a in overlay1 ) {
       console.log(overlay1[a]);
    }   	

    //3.2
   
   	
   	//3.3
   
   	
   	//3.4
   	

    console.log("3.4 - iterating over the properties of an object");
    for ( var b in overlay1.coord_timings ) {
      console.log(overlay1.coord_timings[b].x1);
      console.log(overlay1.coord_timings[b].x2);
    }
    
   	
   
   //3.5
   
   
   //3.6
   
   console.log("3.6 - calling object inspector");
   inspect(overlay1);
   


   
   