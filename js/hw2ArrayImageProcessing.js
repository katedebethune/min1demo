/* CSCI E-3 Introduction to Web Programming Using Javascript
 *
 *
 * Homework Unit #2A - problem 6
 *
 * Kate de Bethune, March 19, 2015
 */

 /********************************************************************
  *
  * Image processing by way of arrays:  This assignment is designed to
  * give you a chance to work with arrays. The fact that we're processing images
  * makes the example interesting, but no prior knowledge of image processing
  * or understanding of the setup for this in hw2ArrayImageProcessingSetup.js
  * is required (though you're welcome to study that if you like!).
  *
  * In each of these functions, you'll be reading the parameter 'original',
  * which is an array of pixel data.  Each array contains four numeric elements to
  * describe each pixel in the image (red, green, blue, alpha).  The
  * data looks like this:
  *   original[0];  // pixel 0 red value
  *   original[1];  // pixel 0 green value
  *   original[2];  // pixel 0 blue value
  *   original[3];  // pixel 0 alpha value
  *   original[4];  // pixel 1 red value
  *   original[5];  // pixel 1 green value
  *   original[6];  // pixel 1 blue value
  *   original[7];  // pixel 1 alpha value
  *     etc...
  *
  * Essentially, your job is to read
  * data from the original array, and copy it to the output array, making
  * certain modifications along the way. It might be a good idea to start by
  * iterating over the original array and coping its data unmodified into the
  * output array. Once you have that working, you can try the data changes
  * required to make the output correct.
  *
  ********************************************************************/


'use strict';
/*
 * makeBlue - Reads data from an image bitmap array and writes new image data to a another array object
 *            The output data contains only blue pixel data, with other color values removed (set to 0).
 *
 *            @original {array} - the source bitmap data, an array of integers from 0-255
 *                         each pixel is represented by four consecutive array elements (r, g, b, a)
 *                         (red, green, blue, alpha), so the array has 4x elements as the image has pixels
 *            @output {array} - the bitmap data array to which the output image is written.
 *
 **/


function makeBlue(original, output){
      //orignal and output arrays, counter, and limit for loop.
      var orig = original, out = output, i = 0, len = orig.length;
      //constants
      var blue = 2, alpha = 3, black = 0, num_channels = 4;
      //processing loop
      for ( ; i < len ; i++ ) {
      	//writes current value for blue and alpha channels to output array
      	if ( parseInt( (i - blue) % num_channels  ) == 0 || parseInt( (i - alpha) % num_channels ) == 0 ) {
      		out[i] = orig[i];
      	}
      	//changes value of output array to black (0) for red and green channels
      	else {
      		out[i] = black;
      	}
      }
      return out;
}



/*
 * makeReverse - Reads data from an image bitmap array and writes new image data to another array object
 *               The output data contains pixel data inverted, with every color value its opposite on the scale of 0-255.
 *
 *            @original {array} - the source bitmap data, an array of integers from 0-255
 *                         each pixel is represented by four consecutive array elements (r, g, b, a)
 *                         (red, green, blue, alpha), so the array has 4x elements as the image has pixels
 *            @output {array} - the bitmap data array to which the output image is written.
 *
 **/
function makeReverse(original, output){
      //orignal and output arrays, counter, and limit for loop.
      var orig = original, out = output, i = 0, len = orig.length;
      //constants
      var alpha = 3, white = 255, num_channels = 4;
      //main processing loop
       for ( ; i < len ; i++ ) {
      	//if alpha channel for px, write original value to output.
      	if ( parseInt( (i - alpha) % num_channels ) == 0 ) {
      		out[i] = orig[i];
      	}
      	//otherwise, reverse value by subtracting the original r, g, or b value from white.
      	else {
      		out[i] = white - orig[i];
      	}
      }
      return out;
}

/*
 * makeTransparent - Reads data from an image bitmap array and writes new image data to another array object
 *                   The output data contains pixel data with the transparency (alpha) set to a value representing 50%.
 *
 *            @original {array} - the source bitmap data, an array of integers from 0-255
 *                         each pixel is represented by four consecutive array elements (r, g, b, a)
 *                         (red, green, blue, alpha), so the array has 4x elements as the image has pixels
 *             @output {array} - the bitmap data array to which the output image is written.
 *
 **/
function makeTransparent(original, output){
      //orignal and output arrays, counter, and limit for loop.
      var orig = original, out = output, i = 0, len = orig.length;
      //variable to hold modified alpha value
      var factor = 0;
      //constants
      var alpha = 3, denom = 2, num_channels = 4;
      //processing loop
      for ( ; i < len ; i++ ) {
      	//if alpha value for px, then divide by two to create 50% transparency.
      	if ( parseInt( (i - alpha) % num_channels ) == 0 ) {
      		factor = parseInt(orig[i] / denom );
      		out[i] = factor;
      	}
      	// otherwise write original value to output array
      	else {
      		out[i] = orig[i];
      	}
      }
      return out;
}

/*
 * loadComposite - Reads data from two image bitmap arrays (one a photo, and one a text overlay)
 *                  and writes new image data to another array object
 *                 The output data contains pixel data from the two images summed.
 *                             (note that this works with simple summing because the background of this
 *                             particular second image is transparent)
 *
 *            @original {array} - the source image bitmap data, an array of integers from 0-255
 *                         each pixel is represented by four consecutive array elements (r, g, b, a)
 *                         (red, green, blue, alpha), so the array has 4x elements as the image has pixels
 *            @secondOne {array} - the source text overlay bitmap data, an array of integers from 0-255
 *                         each pixel is represented by four consecutive array elements (r, g, b, a)
 *                         (red, green, blue, alpha), so the array has 4x elements as the image has pixels
 *            @output {array} - the bitmap data array to which the output image is written.
 *
 **/
function loadComposite(original, secondOne, output){
	   //orignal, second, and output arrays, counter, and limit for loop.
       var orig = original, sec = secondOne, out = output, i = 0, len = orig.length;
       //checks to make sure both input arrays are matching lengths
       if ( orig.length == sec.length ) {
       	//processing loop, sums the r,g,b,a values for each px.
       	for ( ; i < len ; i++ ) {
      		out[i] = orig[i] + sec[i];
       	}
       }
      return out;
}
