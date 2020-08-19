/* Author: Noah Rose
 * ISCT Inventory Project 2020
 */

// Wait for window to load
window.onload = function() {
    // --- Location Selection ---
    document.querySelector("#location").addEventListener('click', function(event){
        // Update arrow graphic
        let target = document.querySelector("#location").querySelector(".arrow");
        if (target.getAttribute("class") == "arrow right") {
            target.setAttribute("class", "arrow down");
        } else {
            target.setAttribute("class", "arrow right")
        }

        // Show/Hide location list
        target = document.querySelector("#locationList");
        if (target.getAttribute("style") == "display: none;") {
            target.setAttribute("style", "display: block;");
        } else {
            target.setAttribute("style", "display: none;");
        }
    });
};