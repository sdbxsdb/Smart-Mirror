<?php include("phpIncludes/header.php") ?>

<section id="smartMirrorHome" class="container">

      <div class="card-group">

          <!--Ana and 24hr Time-->
        <div id="topLeftCard" class="card">
          <div class="card-body">
            <div id="anaClock" class="card-group">
                <div class="container" class="anaClock">
                  <div id="belfastClock">
                    <div class="hand" id="belfastHourHand"></div>
                    <div class="hand minHand" id=""></div>
                    <div class="hand secHand" id=""></div>
                    <h2>Belfast<hr></h2>
                    <div id="belfastDigi"></div>
                  </div>
                </div>
              </div>    
            </div>
         </div>

              <!--Weather-->
          <div id="topRightCard" class="card">
            <div class="card-body">
              <div id="weather">
                <h1 id="weatherTitle">Weather Today</h1>
                <h4 id="date"><?php echo date("l jS F Y"); ?></h4>
                <br>
                <p id="summary"></p>
                <img id="icon"></img>
                <p id="percipProb"></p>
                <p id="temp"></p>
                <p id="windSpeed"></p>
              </div>
            </div>
          </div>
      </div>


<!--Clear part used for mirror-->
<div id="mirrorPart"></div>


<!--News-->  
<div id="news">
  <div id="newsPlayer"></div>
</div>


<!--Spotify-->
<div id="spotify">
  <img id="spotifyLogo" src="/img/spotifyLogo.png">
  <p>Currently listening to: <p id="track"></p> on Sams's Spotify</p>
  <img id="artwork">
</div>


<!--Daily Cat Facts-->
<div id="facts" class="">
  <p id="catFact"></p>
</div>




  </section>






<?php  include("phpIncludes/footer.php") ?>