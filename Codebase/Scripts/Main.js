/* Author: Noah Rose
 * ISCT Inventory Project 2020
 */

// File read function
function fetchFile(path, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                data = httpRequest.responseText;
                //let data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

// Load locations
function loadLoc() {
    fetchFile("../Data/locations.txt", function(data) {
        var items = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
        data = data.split("\n");
        // Delete old entries
        for (let i = 1; i < items.length; i++) {
            items[i].remove();   
        }

        // Write current entries
        for (let i = 0; i < data.length; i++) {
            var li = document.querySelector("#locationList").querySelector("ul").querySelector("li");
            var li2 = li.cloneNode(true);
            document.querySelector("#locationList").querySelector("ul").appendChild(li2);
            
            li2.querySelector(".name").addEventListener('click', function(e){
                var text = e.target.innerHTML;
                console.log(text);
            });

            li2.querySelector(".edit").addEventListener('click', function(e){
                var text = e.target.parentNode.querySelector("div").innerHTML;
                var name = prompt("Please enter the location of your inventory", text);
                if (name!=null && name != "") {
                    e.target.parentNode.querySelector("div").innerHTML = name;
                }
            });

            li2.querySelector(".delete").addEventListener('click', function(e){
                var text = e.target.parentNode.querySelector("div").innerHTML;
                if (prompt("Do you want to delete " + text + "?\n This cannot be undone and will permanantly delete the data!\n Type \'Delete' to confirm. ") == 'Delete') {
                    e.target.parentNode.remove();
                }
            });
            li2.querySelector(".name").innerHTML = data[i];
            li2.removeAttribute("style");
        }
    });
}

// Wait for window to load
window.onload = function() {
    // --- Search ---
    var search = document.querySelector("#search").querySelector("textarea");
    search.addEventListener("click", function(e){
        if (e.target.innerHTML == "Enter Search Term...") {
            e.target.innerHTML = '';
        }
    });

    // --- Location Selection ---
    loadLoc();

    var name = "test";
    var li = document.querySelector("#locationList").querySelector("ul").querySelector("li");
    var li2 = li.cloneNode(true);
    document.querySelector("#locationList").querySelector("ul").appendChild(li2);
    li2.querySelector(".name").innerHTML = name;
    li2.removeAttribute("style");

    // Expand location list
    document.querySelector("#location").addEventListener('click', function(event){
        // Update arrow graphic
        var target = document.querySelector("#location").querySelector(".arrow");
        if (target.getAttribute("class") == "arrow right") {
            target.setAttribute("class", "arrow down");
        } else {
            target.setAttribute("class", "arrow right")
        }

        // Show/Hide location list
        target = document.querySelector("#locationList");
        if (target.style['display'] == 'none') {
            target.style['display'] = 'block';
        } else {
            target.style['display'] = 'none';
        }
    });

    // Dragging and dropping location list
    var dragging = null;

    // Show image when dragging
    document.querySelector("#locationList").addEventListener('dragstart', function(event) {
        var target = getLI( event.target );
        dragging = target;
        event.dataTransfer.setData('text/plain', null);
        try {
            event.dataTransfer.setDragImage(self.dragging,0,0);
        } catch(err) {}
    });

    // Create line on potential drop area
    document.querySelector("#locationList").addEventListener('dragover', function(event) {
        event.preventDefault();
        var target = getLI( event.target );
        var bounding = target.getBoundingClientRect()
        var offset = bounding.y + (bounding.height/2);
        if ( event.clientY - offset > 0 ) {
            target.style['border-bottom'] = 'solid 4px green';
            target.style['border-top'] = '';
        } else {
            target.style['border-top'] = 'solid 4px green';
            target.style['border-bottom'] = '';
        }
    });

    // Remove line from ineligible drop area
    document.querySelector("#locationList").addEventListener('dragleave', function(event) {
        var target = getLI( event.target );
        target.style['border-bottom'] = '';
        target.style['border-top'] = '';
    });

    // Instert list item in new drop area
    document.querySelector("#locationList").addEventListener('drop', function(event) {
        event.preventDefault();

        // Get first index for swapping file lines
        var index = [0,0];
        var targets = document.querySelector("#locationList").querySelectorAll("li");
        for (let i = 1; i < targets.length; i++) {
            if (targets[i] == dragging) {
                index[0] = i-1;
            }
        }

        // Swap targets
        var target = getLI( event.target );
        if ( target.style['border-bottom'] !== '' ) {
            target.style['border-bottom'] = '';
            try {
                target.parentNode.insertBefore(dragging, event.target.nextSibling);
            } catch(err) {
                if (err instanceof DOMException) {
                    target.parentNode.insertBefore(dragging, event.target.parentNode.nextSibling);
                } else {
                    console.log(err);
                }
            }
        } else {
            target.style['border-top'] = '';
            try {
                target.parentNode.insertBefore(dragging, event.target);
            } catch(err) {
                if (err instanceof DOMException) {
                    target.parentNode.insertBefore(dragging, event.target.parentNode);
                } else {
                    console.log(err);
                }
            }
        }

        // Get second index for swapping file lines
        var targets = document.querySelector("#locationList").querySelectorAll("li");
        for (let i = 1; i < targets.length; i++) {
            if (targets[i] == dragging) {
                index[1] = i-1;
            }
        }
        console.log(index);
    });

    // Edit name
    var targets = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
    for (var i = 0; i < targets.length; i++) {
        targets[i].querySelector(".edit").addEventListener('click', function(e){
            var text = e.target.parentNode.querySelector("div").innerHTML;
            var name = prompt("Please enter the location of your inventory", text);
            if (name!=null && name != "") {
                e.target.parentNode.querySelector("div").innerHTML = name;
            }
        });
    }

    // Remove entry
    var targets = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
    for (var i = 0; i < targets.length; i++) {
        targets[i].querySelector(".delete").addEventListener('click', function(e){
            var text = e.target.parentNode.querySelector("div").innerHTML;
            if (prompt("Do you want to delete " + text + "?\n This cannot be undone and will permanantly delete the data!\n Type \'Delete' to confirm. ") == 'Delete') {
                e.target.parentNode.remove();
            }
        });
    }

    // Select entry
    var targets = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
    for (var i = 0; i < targets.length; i++) {
        targets[i].querySelector(".name").addEventListener('click', function(e){
            var text = e.target.innerHTML;
            console.log(text);
        });
    }

    // Create new entry
    document.querySelector("#newLocation").addEventListener('click', function(){
        var name = prompt("Please enter the new inventory location", "");
        if (name!=null && name != "") {

            var li = document.querySelector("#locationList").querySelector("ul").querySelector("li");
            var li2 = li.cloneNode(true);
            document.querySelector("#locationList").querySelector("ul").appendChild(li2);
            
            li2.querySelector(".name").addEventListener('click', function(e){
                var text = e.target.innerHTML;
                console.log(text);
            });

            li2.querySelector(".edit").addEventListener('click', function(e){
                var text = e.target.parentNode.querySelector("div").innerHTML;
                var name = prompt("Please enter the location of your inventory", text);
                if (name!=null && name != "") {
                    e.target.parentNode.querySelector("div").innerHTML = name;
                }
            });

            li2.querySelector(".delete").addEventListener('click', function(e){
                var text = e.target.parentNode.querySelector("div").innerHTML;
                if (prompt("Do you want to delete " + text + "?\n This cannot be undone and will permanantly delete the data!\n Type \'Delete' to confirm. ") == 'Delete') {
                    e.target.parentNode.remove();
                }
            });
            li2.querySelector(".name").innerHTML = name;
            li2.removeAttribute("style");
        }
    });
};

// Get target li
function getLI( target ) {
    while ( target.nodeName.toLowerCase() != 'li' && target.nodeName.toLowerCase() != 'body' ) {
        target = target.parentNode;
    }
    if ( target.nodeName.toLowerCase() == 'body' ) {
        return false;
    } else {
        return target;
    }
}