<!DOCTYPE html>

<head>
<title>Penguinz0 Description Searcher</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat&ampdisplay=swap" rel="stylesheet">
</head>

<body>
<p id="ultimate-words">
The Ultimate Penguinz0 Video Description Searcher
</p>
<div class="search-container">
    <form action="/search.php">
      <input type="text" id="search-bar" placeholder="Find the greatest anything of all time" name="search">
      <!-- mouse hover it says YEAH BABY, unhover it says search-->
      <span><button class="button-class" type="submit" onclick="phpFunc()"></button></span>
    </form>
  </div>
  
  <div>
  <p id="searched-for">
 You searched for:
 </p>
  </div>
  <p id="results"></p>
  
  <style>
      #ultimate-words {
  font-size: 80px;
  font-family: 'Montserrat', sans-serif;
  margin-top: '30px';
  text-align: center;
  word-wrap: break-word;
  word-break: keep-all;
}

.search-container {
  font-family: 'Montserrat', sans-serif;
  display: inline;
  margin: 0 auto;
  text-align: center;
}

input {
  vertical-align: bottom;
  margin-top: 5%;
  height: 60px;
  width: 650px;
  font-size: 35px;
  font-family: 'Montserrat', sans-serif;
  
}

button {
  display: inline-block;
  margin-top: 10px;
  height: 65px;
  width: 85px;
  font-size: 20px;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  content: "Search";
  color: white;
  
  background-color: #555555; /* Green */
  border: none;
  text-decoration: none;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button-class {
  content: "Search";
  background-color: white;
  color: #555555;
  border: 2px solid #555555;
}

.button-class::before {
  content: "Search";
}

.button-class:hover {
  color: white;
  background: #555555;
}

.button-class:hover::before {
  content: "YEAH BABY";
}

#top-cont {
  margin-top: 8%;
}

#searched-for {
  font-size: 20px;
  font-family: 'Montserrat', sans-serif;
  margin-top: 50px;
  margin-left: 5%;
  text-align: left;
  word-wrap: break-word;
  word-break: keep-all;
}
  </style>
  
  
  <?php

$pdo = new PDO('sqlite:penguinz0.db');

$search = $_GET['search'];
//echo $search;

$statement = $pdo->query("SELECT * FROM videos WHERE main_word LIKE '%{$search}%'");

//$statement_ex = $pdo->query("SELECT main_word FROM videos WHERE main_word LIKE '%weird%'");

$rows = $statement->fetchAll(PDO::FETCH_ASSOC);
//var_dump($rows);

//$rows_ex = $statement_ex->fetchAll(PDO::FETCH_ASSOC);
//var_dump($rows_ex);

//echo "<pre>";
//print_r($rows);
//echo(json_encode($rows));
//echo "</pre>";

$json_info = json_encode($rows);

//$link = "<script>window.location.href = '/search.html'</script>";

//echo $link;

?>
  
  
  
  <script type="text/javascript">
window.onload = function() {
	var php_info = <?php echo json_encode($json_info) ?>;
	var info = JSON.parse(php_info);
	document.getElementById("searched-for").innerHTML = "You searched for: " + <?php echo json_encode($search) ?>;
	//for every item in info, add a box
	for (var i = 0; i < info.length; i++) {
	    concatBoxes(info[i]);
	}
}

function concatBoxes(info) {
	//this function appends a div
  //per video
    var div = document.createElement("div");
    div.style.width = "1300px";
    div.style.height = "600px";
    div.style.background = "white";
    div.style.color = "black";
    
    var title = document.createElement("h1");
    title.innerHTML = info.title;
    title.style.marginLeft = '-30px';
    div.appendChild(title);
    
    var vid = document.createElement("iframe");
    vid.src = "https://www.youtube.com/embed/" + info.id;
    vid.style.height = '400px';
    vid.style.width = '700px';
    vid.style.float = 'right';
    div.appendChild(vid);
    
    var date_parse = info.upload_date.substring(0, 4) + "-" +
                     info.upload_date.substring(4, 6) + "-" +
                     info.upload_date.substring(6, 8);

    
    var upload = document.createElement("p");
    upload.innerHTML = date_parse;
    div.appendChild(upload);
    
    var word = document.createElement("h4");
    word.innerHTML = info.main_word;
    
    div.appendChild(word);
    
    
    
    var description = document.createElement("p");
    description.innerHTML = info.description;
    div.appendChild(description);
    
    div.style.fontFamily = 'Montserrat';
    div.style.marginLeft = '120px';
    
    document.body.appendChild(div);
}

  </script>
  
  
</body>