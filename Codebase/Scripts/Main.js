/* Author: Noah Rose
 * ISCT Inventory Project 2020
 */

// Get target li (Used for drag & drop)
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

// File read function
function fetchFile(path, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = httpRequest.responseText;
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

// JSON file read function
function fetchJSONFile(path, callback) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

// Load locations
function loadLoc() {
    fetchJSONFile("../Data/Main.json", function(data) {
        var items = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
        data = data['locations'];
        // Delete old entries
        for (let i = 1; i < items.length; i++) {
            items[i].remove();   
        }

        // Write current entries
        var loaded = [];
        for (let i = 0; i < data.length; i++) {   
            var minimum = Infinity;
            var selected = -1;

            // get hidden node and clone it
            var li = document.querySelector("#locationList").querySelector("ul").querySelector("li");
            var li2 = li.cloneNode(true);
            document.querySelector("#locationList").querySelector("ul").appendChild(li2);
            
            // Add name click event
            li2.querySelector(".name").addEventListener('click', function(e){
                var text = e.target.innerHTML;
                console.log("Selected: ", text);
                document.querySelector("#dataHeader").style['display'] = "block";

                var target = document.querySelector("#location").querySelector(".arrow");
                target.setAttribute("class", "arrow right")

                // Show/Hide location list
                target = document.querySelector("#locationList");
                target.style['display'] = 'none';
                
                // Update arrow graphic
                target = document.querySelector("#dataHeader").querySelector(".arrow");
                target.setAttribute("class", "arrow down");

                // Show/Hide categories
                target = document.querySelector("#categories");
                target.style['display'] = 'block';

                // Show/Hide data list
                target = document.querySelector("#entries");
                target.style['display'] = 'block';
            });

            // Add edit event
            li2.querySelector(".edit").addEventListener('click', function(e){
                var names = [];
                var targets = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
                for (let i = 0; i < targets.length; i++) {
                    names.push(targets[i].querySelector("div").innerHTML);
                }
                var text = e.target.parentNode.querySelector("div").innerHTML;
                var name = prompt("Please enter the location of your inventory", text);
                if (name!=null && name != "" && !names.includes(name)) {

                    //Update name on webpage
                    e.target.parentNode.querySelector("div").innerHTML = name;

                    // Get order of element
                    var order = -1;
                    var targets = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
                    for (let i = 1; i < targets.length; i++) {
                        if (e.target.parentNode == targets[i]) {
                            order = i-1;
                            break;
                        }
                    }

                    // Call edit from PHP
                    jQuery.ajax({
                        type: "POST",
                        url: 'Scripts/locationFunctions.php',
                        dataType: 'json',
                        data: {functionname: 'edit', arguments: [order, name]},
                    
                        success: function (obj, textstatus) {
                            if ( !('error' in obj) ) {
                                console.log(obj.result);
                            }
                            else {
                                console.log(obj.error);
                            }
                        }
                    });    
                }
            });

            // Add delete event
            li2.querySelector(".delete").addEventListener('click', function(e){
                var text = e.target.parentNode.querySelector("div").innerHTML;
                if (prompt("Do you want to delete " + text + "?\n This cannot be undone and will permanantly delete the data!\n Type \'Delete' to confirm. ") == 'Delete') {
                    // Get order of element
                    var order = -1;
                    var targets = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
                    for (let i = 1; i < targets.length; i++) {
                        if (e.target.parentNode == targets[i]) {
                            order = i-1;
                            break;
                        }
                    }
                    e.target.parentNode.remove();

                    // Call delete from PHP
                    jQuery.ajax({
                        type: "POST",
                        url: 'Scripts/locationFunctions.php',
                        dataType: 'json',
                        data: {functionname: 'delete', arguments: [order]},
                    
                        success: function (obj, textstatus) {
                            if ( !('error' in obj) ) {
                                console.log(obj.result);
                            }
                            else {
                                console.log(obj.error);
                            }
                        }
                    });   
                } 
            });

            // Find ordering of list items
            for (let i = 0; i < data.length; i++) {
                if (data[i]['order'] < minimum && !loaded.includes(data[i]['order'])) {
                    minimum = data[i]['order'];
                    selected = i;
                }
            }
            loaded.push(minimum);

            // Add name to list item
            li2.querySelector(".name").innerHTML = data[selected]['name'];
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

    // --- Drag and Drop Start ---
    // Dragging and dropping location list
    var dragging = null;

    // --- Drag events
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

        // Send index to PHP swap function
        jQuery.ajax({
            type: "POST",
            url: 'Scripts/locationFunctions.php',
            dataType: 'json',
            data: {functionname: 'swap', arguments: [index[0], index[1]]},
        
            success: function (obj, textstatus) {
                if( !('error' in obj) ) {
                    console.log(obj.result);
                }
                else {
                    console.log(obj.error);
                }
            }
        });    
    });

    // Touch events
    // TODO - Use Coordinates?
    // --- Drag and Drop End ---

    // Create new location
    document.querySelector("#newLocation").addEventListener('click', function(){
        
        var names = [];
        var order;
        var targets = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
        for (let i = 0; i < targets.length; i++) {
            names.push(targets[i].querySelector("div").innerHTML);
        }
        order = targets.length-1;

        var name = prompt("Please enter the new inventory location", "");
        if (name!=null && !names.includes(name) && name != "locations") {
            jQuery.ajax({
                type: "POST",
                url: 'Scripts/locationFunctions.php',
                dataType: 'json',
                data: {functionname: 'new', arguments: [order, name]},
            
                success: function (obj, textstatus) {
                    if ( !('error' in obj) ) {
                        console.log(obj.result);
                    }
                    else {
                        console.log(obj.error);
                    }
                }
            });

            var li = document.querySelector("#locationList").querySelector("ul").querySelector("li");
            var li2 = li.cloneNode(true);
            document.querySelector("#locationList").querySelector("ul").appendChild(li2);
            
            // Select name
            li2.querySelector(".name").addEventListener('click', function(e){
                var text = e.target.innerHTML;
                console.log("Selected: ", text);
                document.querySelector("#dataHeader").style['display'] = "block";

                var target = document.querySelector("#location").querySelector(".arrow");
                target.setAttribute("class", "arrow right")

                // Show/Hide location list
                target = document.querySelector("#locationList");
                target.style['display'] = 'none';
                
                // Update arrow graphic
                target = document.querySelector("#dataHeader").querySelector(".arrow");
                target.setAttribute("class", "arrow down");

                // Show/Hide categories
                target = document.querySelector("#categories");
                target.style['display'] = 'block';

                // Show/Hide data list
                target = document.querySelector("#entries");
                target.style['display'] = 'block';
            });

            // Edit name
            li2.querySelector(".edit").addEventListener('click', function(e){
                var names = [];
                var targets = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
                for (let i = 0; i < targets.length; i++) {
                    names.push(targets[i].querySelector("div").innerHTML);
                }
                var text = e.target.parentNode.querySelector("div").innerHTML;
                var name = prompt("Please enter the location of your inventory", text);
                if (name!=null && name != "" && !names.includes(name)) {

                    // Update name on webpage
                    e.target.parentNode.querySelector("div").innerHTML = name;

                    // Get order of element
                    var order = -1;
                    var targets = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
                    for (let i = 1; i < targets.length; i++) {
                        if (e.target.parentNode == targets[i]) {
                            order = i-1;
                            break;
                        }
                    }

                    // Call PHP edit function
                    jQuery.ajax({
                        type: "POST",
                        url: 'Scripts/locationFunctions.php',
                        dataType: 'json',
                        data: {functionname: 'edit', arguments: [order, name]},
                    
                        success: function (obj, textstatus) {
                            if ( !('error' in obj) ) {
                                console.log(obj.result);
                            }
                            else {
                                console.log(obj.error);
                            }
                        }
                    });
                }
            });

            // Remove entry
            li2.querySelector(".delete").addEventListener('click', function(e){
                var text = e.target.parentNode.querySelector("div").innerHTML;
                if (prompt("Do you want to delete " + text + "?\n This cannot be undone and will permanantly delete the data!\n Type \'Delete' to confirm. ") == 'Delete') {
                    // Get order of element
                    var order = -1;
                    var targets = document.querySelector("#locationList").querySelector("ul").querySelectorAll("li");
                    for (let i = 1; i < targets.length; i++) {
                        if (e.target.parentNode == targets[i]) {
                            order = i-1;
                            break;
                        }
                    }
                    e.target.parentNode.remove();

                    // Call delete from PHP
                    jQuery.ajax({
                        type: "POST",
                        url: 'Scripts/locationFunctions.php',
                        dataType: 'json',
                        data: {functionname: 'delete', arguments: [order]},
                    
                        success: function (obj, textstatus) {
                            if ( !('error' in obj) ) {
                                console.log(obj.result);
                            }
                            else {
                                console.log(obj.error);
                            }
                        }
                    });   
                }
            });
            
            li2.querySelector(".name").innerHTML = name;
            li2.removeAttribute("style");
        }
    });

    // --- Data Handling ---
    // Expand data
    document.querySelector("#dataHeader").addEventListener('click', function(event){
        
        // Update arrow graphic
        target = document.querySelector("#dataHeader").querySelector(".arrow");
        if (target.getAttribute("class") == "arrow right") {
            target.setAttribute("class", "arrow down");
        } else {
            target.setAttribute("class", "arrow right")
        }

        // Show/Hide categories
        target = document.querySelector("#categories");
        if (target.style['display'] == 'none') {
            target.style['display'] = 'block';
        } else {
            target.style['display'] = 'none';
        }

        // Show/Hide data list
        target = document.querySelector("#entries");
        if (target.style['display'] == 'none') {
            target.style['display'] = 'block';
        } else {
            target.style['display'] = 'none';
        }
    });
};