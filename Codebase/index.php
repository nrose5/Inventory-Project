<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Inventory Manager</title>
  <meta name="description" content="Inventory Manager">
  <meta name="author" content="Noah Rose">

  <link rel="shortcut icon" href="#" /> <!-- favicon.ico missing fix -->
  <link rel="stylesheet" href="main.css">
  <script src="Scripts/main.js"></script>
  <script src="Libraries/jquery-3.5.1.js"></script>
</head>

<body>
  <!-- Search -->
  <div id="search">
    <button>Search</button>
    <textarea style="resize: none;">Enter Search Term...</textarea>
  </div>

  <!-- Locations -->
  <div id="location" style="width: 15em; margin:auto; cursor: pointer;">
    <span>Select Location</span>
    <span class="arrow down" style="text-align: right;"></span>
  </div>

  <div id="locationList" style="width: 30em;">
    <ul>
      <li draggable="true" style="display: none;">
        <div class="name" style="width: 20em; cursor: pointer;">Default</div>
        <div class="edit" style="width: 2em; margin-right: 2em; cursor: pointer;">Edit</div>
        <div class="delete" style="cursor: pointer;">Delete</div>
      </li>
    </ul>
    <button id="newLocation" style="width: 100%;">New Location</button>
  </div>

  <p></p>

  <div id="data">
    <!-- Data -->
    <div id="dataHeader" style="display: none; width: 35em; margin:auto; cursor: pointer;">
      <span>Show/Hide Data</span>
      <span class="arrow right" style="text-align: right;"></span>
    </div>

    <!-- Categories -->
    <div id="categories" style="display: none;">
      <div id="categoryHeader" style="width: 35em;"> 
        <span>Categories</span>
      </div>
      <!-- 
        Dimensions:
        1 - 88.35
        2 - 43.9
        3 - 29.1
        4 - 21.7
        5 - 17.25
      -->
      <div id="categoryEntries" style="width: 70em; margin: auto;"> 
        <div id="categoryEntry" draggable="true" style="width: 88.35%; height: 3.5em;">
          <div class="name" style="width: 100%; height: 50%;">Count</div>
        </div>
        <div id="categoryEntry" draggable="true" style="width: 43.9%; height: 3.5em; display: none;">
          <div class="name" style="width: 100%; height: 50%;">Count</div>
          <button id="edit" style="width: 35%; padding: 0px 10px;">Edit</button>
          <button id="delete" style="width: 35%; padding: 0px 10px;">Delete</button>
        </div>
        <button id="addCategory" style="width: 11%; text-align:center;">Add Category</button>
      </div>
    </div>

    <!-- Entries -->
    <div id="entries" style="display: none; width: 70em;">
      <div id="entryHeader">
        <span>Entries</span>
      </div>
      <!-- 
        Dimensions:
        1 - 87.5
        2 - 43
        3 - 28.2
        4 - 20.7
        5 - 16.25
      -->
      <div id="dataEntries">
        <div id="dataEntry" draggable="true" style="width:70em; margin: auto;">
            <div id="name" style="padding-left: 1%; width: 87.5%; height: 3em;">Default</div>
            <div style="border: none;">
              <div id="add" style="text-align: center; width: 1em; height: 1.5em; padding: 0; margin-bottom: 0.25em; cursor: pointer; display: block;">+</div>
              <div id="subtract" style="text-align: center; width: 1em; height: 1.5em; padding: 0; cursor: pointer; display: block;">-</div>
            </div>
            <div id="edit" style="width: 4%; cursor: pointer;">Edit</div>
            <div id="delete" style="width: 4%; cursor: pointer;">Delete</div>
        </div>
        <div id="dataSection" draggable="true" style="width: 70em;";>
          <div id="header" style="width: 88.5%;"> Section 1 </div>
          <div id="edit" style="width: 5%; height: 0.5em; cursor: pointer;"> Edit </div>
          <div id="delete" style="width: 5%; height: 0.5em; cursor: pointer;"> Delete </div>
        </div>
        <button id="newEntry" style="width: 100%;">New Entry</button>
      </div>
    </div>
  </div>

</body>
</html>