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
      <div id="categoryEntries"> 
        <ul>
          <li draggable="true">
            <div class="name" style="width: 15em; cursor: pointer;">Default</div>
          </li>
          <li draggable="true">
            <div class="name" style="width: 15em; cursor: pointer;">Default</div>
          </li>
          <li draggable="true">
            <div class="name" style="width: 15em; cursor: pointer;">Default</div>
          </li>
        </ul>
        <button style="width: 10em;">Add Category</button>
      </div>
    </div>

    <!-- Entries -->
    <div id="entries" style="display: none; width: 70em;">
      <div id="entryHeader">
        <span>Entries</span>
      </div>
      <div id="dataEntries">
        <ul>
          <li draggable="true" style="display: none">
            <div class="name" style="width: 20em; cursor: pointer;">Default</div>
            <div class="edit" style="width: 2em; margin-right: 2em; cursor: pointer;">Edit</div>
            <div class="delete" style="cursor: pointer;">Delete</div>
          </li>
        </ul>
        <button id="newEntry" style="width: 100%;">New Entry</button>
      </div>
    </div>
  </div>

</body>
</html>