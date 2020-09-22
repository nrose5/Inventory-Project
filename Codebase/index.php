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
  <!-- Entry Edit Form -->
  <div id="editEntryForm" style="z-index: 1; text-align: left;  display: none;">
    <div style="width: 80%; padding-left: 1%"> 
      <h1>Edit Entry</h1>
    </div>

    <!-- Text Fields -->
    <div id="fields" style="width: 98%; height: 50%; padding-left: 1%; padding-top: 1%;">
      <div id="entryFields" style="width: 70%;">
          <span>Category 1: <textarea style="resize: none; width: 100%; margin-bottom: 1%;"></textarea></span>
          <span>Category 2: <textarea style="resize: none; width: 100%; margin-bottom: 1%;"></textarea></span>
          <span>Category 3: <textarea style="resize: none; width: 100%; margin-bottom: 1%;"></textarea></span>
          <span>Category 4: <textarea style="resize: none; width: 100%; margin-bottom: 1%;"></textarea></span>
          <span>Count: <textarea style="resize: none; width: 100%; margin-bottom: 1%;"></textarea></span>
      </div>
    </div>

    <!-- Cancel/Submit Buttons -->
    <div id="buttons" style="width: 100%; text-align: center; margin: 0;">
      <button id="cancel">Cancel</button>
      <button id="submit">Submit</button>
    </div>
  </div>

  <!-- Entry Form -->
  <div id="entryForm" style="z-index: 1; text-align: left;  display: none;">
    <div style="width: 80%; padding-left: 1%"> 
      <h1>New Entry</h1>
    </div>

    <!-- Entry/Section Switch -->
    <div id="entryToggle" style="width: 10%; height: 50%; padding-left: 5%; padding-top: 1%; position: absolute;">
      <label class="switch">
          <input type="checkbox">
          <span class="slider round"></span>
      </label>    
      <p>Entry/Selection</p>
    </div>

    <!-- Text Fields -->
    <div id="fields" style="width: 70%; height: 50%; padding-left: 1%; padding-top: 1%;">
      <div id="sectionFields" style="width: 100%; height: 100%; display: none;">
          <span>name: <textarea style="resize: none; width: 100%; margin-bottom: 1%;"></textarea></span>
      </div>
      <div id="entryFields" style="width: 100%; height: 100%;">
          <span>Category 1: <textarea style="resize: none; width: 100%; margin-bottom: 1%;"></textarea></span>
          <span>Category 2: <textarea style="resize: none; width: 100%; margin-bottom: 1%;"></textarea></span>
          <span>Category 3: <textarea style="resize: none; width: 100%; margin-bottom: 1%;"></textarea></span>
          <span>Category 4: <textarea style="resize: none; width: 100%; margin-bottom: 1%;"></textarea></span>
          <span>Count: <textarea style="resize: none; width: 100%; margin-bottom: 1%;"></textarea></span>
      </div>
    </div>

    <!-- Cancel/Submit Buttons -->
    <div id="buttons" style="width: 100%; text-align: center; margin: 0;">
      <button id="cancel">Cancel</button>
      <button id="submit">Submit</button>
    </div>
  </div>

  <!-- Search -->
  <div id="search">
    <button>Search</button>
    <textarea style="resize: none;">Enter Search Term...</textarea>
  </div>

  <!-- Locations -->
  <div id="location" style="width: 40%; margin:auto; cursor: pointer;">
    <span>Select Location</span>
    <span class="arrow down" style="text-align: right;"></span>
  </div>

  <div id="locationList" style="width: 40%;">
    <ul>
      <li draggable="true" style="display: none;">
        <div class="name" style="width: 75%; cursor: pointer;">Default</div>
        <div class="edit" style="width: 10%; margin-right: 3%; cursor: pointer;">Edit</div>
        <div class="delete" style="width: 10%; cursor: pointer;">Delete</div>
      </li>
    </ul>
    <button id="newLocation" style="width: 100%;">New Location</button>
  </div>

  <p></p>

  <div id="data">
    <!-- Data -->
    <div id="dataHeader" style="display: none; width: 90%; margin:auto; cursor: pointer;">
      <span>Show/Hide Data</span>
      <span class="arrow right" style="text-align: right;"></span>
    </div>

    <!-- Categories -->
    <div id="categories" style="display: none; width: 90%; margin:auto;">
      
      <div id="categoryHeader" style="width: 100%;"> 
        <span>Categories</span>
      </div>
      
      <div id="categoryEntries" style="width: 100%; margin: auto; cursor: move;"> 
        <div id="categoryEntry" class="categoryEntryTemplate" draggable="true" style="display: none; width: 44.5%; padding-top: 2%; padding-bottom: 2%;">
          <div id="name" style="width: 100%; height: 50%; cursor: move;">Temp</div>
          <button id="edit" style="width: 35%; padding: 0px 10px;">Edit</button>
          <button id="delete" style="width: 35%; padding: 0px 10px;">Delete</button>
        </div

        ><div id="categoryEntry" draggable="true" style="width: 90%; padding-top: 2%; padding-bottom: 4%;">
          <div id="name" style="width: 100%; height: 50%; cursor: move;">Count</div>
        </div
        
        ><button id="addCategory" style="width: 10%; padding-top: 2%; padding-bottom: 4%; text-align:center;">Add Category</button>
      
      </div>
    </div>

    <!-- Entries -->
    <div id="entries" style="display: none; width: 90%; margin:auto;">
      
      <div id="entryHeader">
        <span>Entries</span>
      </div>

      <div id="dataEntries">
        
        <div id="dataEntry" class="dataEntryTemplate" draggable="true" style="width: 100%; margin: auto; height: 4em;">
          <div style="width: 5%; height: 100%; padding-top: 2%; padding-bottom: 2%; text-align: center; cursor: pointer;">X</div
          ><div id="name" style="padding-left: 1%; width: 79%; height: 100%; padding-top: 2%; padding-bottom: 2%;">0</div
          ><div style="width: 5%; height: 100%; padding-top: 0.75%; padding-bottom: 0.5%;">
            <div id="add" style="margin-left: 25%; width: 50%; margin-bottom: 16%; cursor: pointer; display: block; text-align: center;">+</div
            ><div id="subtract" style="margin-left: 25%; width: 50%; cursor: pointer; display: block; text-align: center;">-</div>
          </div
          ><div id="edit" style="width: 5%; height: 100%; padding-top: 2%; padding-bottom: 2%; cursor: pointer;">Edit</div
          ><div id="delete" style="width: 5%; height: 100%; padding-top: 2%; padding-bottom: 2%; cursor: pointer;">Delete</div>
        </div>
        
        <div id="dataSection" class="dataSectionTemplate" draggable="true" style="width: 100%;">
          <div style="width: 5%; padding-top: 2%; padding-bottom: 2%; text-align: center; background-color: white; cursor: pointer;">X</div
          ><div id="header" style="width: 85%; padding-top: 2%; padding-bottom: 2%; cursor: move;"><b> Section 1 </b></div
          ><div id="edit" style="width: 5%; padding-top: 2%; padding-bottom: 2%; cursor: pointer;"> Edit </div
          ><div id="delete" style="width: 5%; padding-top: 2%; padding-bottom: 2%; cursor: pointer;"> Delete </div>
        </div>
        
        <button id="newEntry" style="width: 100%;">New Entry/Section</button>
      
      </div>
    </div>
  </div>

</body>
</html>