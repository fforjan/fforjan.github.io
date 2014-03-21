/** from here : 
http://www.javascriptkit.com/javatutors/touchevents2.shtml
*/

var SwipeDirection = {
    Left: 1,
    Right: 2,
    Up: 3,
    Down: 4
};

if (Object.freeze) {
    Object.freeze(SwipeDirection);
}

/**
    Hello documenation
 */
function addSwipeListener(el, callback) {

    "use strict";
    var touchsurface = el, swipedir, startX, startY, distX, distY;
    var threshold = 150; //required min distance traveled to be considered swipe
    var restraint = 100; // maximum distance allowed at the same time in perpendicular direction
    var allowedTime = 300; // maximum time allowed to travel that distance
    var elapsedTime, startTime;
    var handleswipe = callback || function (dummy) { };

    touchsurface.addEventListener('touchstart', function (e) {
        var touchobj = e.changedTouches[0];
        swipedir = 'none';
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime(); // record time when finger first makes contact with surface
        e.preventDefault();

    }, false);

    touchsurface.addEventListener('touchmove', function (e) {
        e.preventDefault();// prevent scrolling when inside DIV
    }, false);

    touchsurface.addEventListener('touchend', function (e) {
        var touchobj = e.changedTouches[0];
        distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime; // get time elapsed
        if (elapsedTime <= allowedTime) { // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                swipedir = (distX < 0) ? SwipeDirection.Left : SwipeDirection.Right; // if dist traveled is negative, it indicates left swipe
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                swipedir = (distY < 0) ? SwipeDirection.Up : SwipeDirection.Down; // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir);
        e.preventDefault();
    }, false);
}

//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
 swipedir contains either "none", "left", "right", "top", or "down"
 if (swipedir =='left')
   alert('You just swiped left!')
})
*/
