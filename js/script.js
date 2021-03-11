// MAKE SMART MIRROR FULL SCREEN
$(function() {
  $("#smartMirrorHome").click(function() {
      $('body').fullscreen();
      return false;
  });
  $('body').click(function() {
      $.fullscreen.exit();
      return false;
  });
});



function setDate() {
  let now = new Date();

//Mins and seconds for analogue clock hands with math to turn the the right degrees
  let seconds = now.getSeconds();
  let secondsDegs = ((seconds / 60) * 360 + 90 );

  let mins = now.getMinutes();
  let minsDegs = ((mins / 60) * 360 + 90);


//Hours for analogue clock with + X value for how far ahead each timezone is (this only with with analogue - it goes past 24hr when you add anything to getHours)
  let belfastHours = now.getHours();
  let belfastHoursDegs = ((belfastHours / 12) * 360 + 90);

//Turning the hands hand with transform rotate the number of degrees we worked out above 12 hrs, 360degree, 90 for the offset in the css etc.  -  The if is to stop the hands spinning backwards to get to 0 we remove the class v briefly so it appears to tick on past 12
  $(".secHand").css("transform","rotate(" + secondsDegs + "deg");
  if (seconds == 0) {
    $(".secHand").addClass("handNoTran");
    $(".secHand").removeClass("hand");
  } else {
    $(".secHand").removeClass("handNoTran");
    $(".secHand").addClass("hand");
  };


  $(".minHand").css("transform", "rotate(" + minsDegs + "deg");


  $("#belfastHourHand").css("transform", "rotate(" + belfastHoursDegs + "deg");




//Using moment.js library to get the time for the digital clock display.  With this we can add X amount of hours and it won't go past 24.  We can also format it with a much or as little info as we like.
  let belfastDigi = moment().format("HH:mm:ss");


//Writing the moment time to the html of each div and then calling the function below.  This was wrapped in a function but it wasn't necessary. 

    $("#belfastDigi").html(belfastDigi);

  };

//Running the above function every 1s - eg. if this was run every 4000ms we would only see the hands move and seconds change every 4sec
setInterval(setDate, 1000);



//WEATHER API//
//Usuing AJAX to NOT cache the weather and refresh itself every 1,800,000 millisec or 30mins so it will check for new weather every half hour. 

$(function refreshWeather() {
  $.ajaxSetup ({
    cache: false,
    complete: function() {

      setTimeout(refreshWeather, 1800000);
    }
  })
//This lets me choose any city in the UK or elsewhere and see what the weather is doing.
let cityUK = "Belfast" + ",uk";
let cityElse = "Los Angeles";

$.getJSON("http://api.openweathermap.org/data/2.5/weather?q=" + cityUK + "&units=metric&APPID=1b7b697c8144f3ee87636d0d5f992dd0", function(data) {
console.log(data);

let icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

let temp = (Math.round(data.main.temp));
let feelsLike = (Math.round(data.main.feels_like));
let summary = (data.weather[0].description);
let windSpeed = (Math.round(data.wind.speed));

$('#icon').attr('src', icon);
$("#temp").html("Temp  " + temp + "&degC" + "  but feels like  " + feelsLike + " &degC");
$("#summary").html(summary).css('textTransform', 'capitalize');
$("#windSpeed").html(windSpeed + " mph winds");

});

});



//CAT FACTS API

//Usuing AJAX to NOT cache the Cat Facts and refresh itself every 36000000 millisec or 1 day so there will be a new fact each day.  HOWEVER.. I reckon this API is on PST time because I seem to get a new fact each day about lunch time rather than at midnight GMT...//

$(function refreshFacts(){
  $.ajaxSetup ({
    cache:false,
    complete: function() {

      setTimeout(refreshFacts, 3600000);
    }
  })
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://brianiswu-cat-facts-v1.p.rapidapi.com/facts",
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "a141ef43d1msh5debbef901cb633p111c8djsn1093d0fb16bd",
      "x-rapidapi-host": "brianiswu-cat-facts-v1.p.rapidapi.com"
    }
  };
  
  $.ajax(settings).done(function (response) {
  
  
    //API gives you 5 facts I was trying to make the facts random.

    const randomNumber = [Math.floor(Math.random()*response.length)];

    $("#catFact").html(response[randomNumber].text);

  });

});


//LAST FM / SPOTIFY API

//Usuing AJAX to NOT cache the music and refresh itself every 1sec so each time a new track comes on it's displayed without a page refresh. 

var volume = ""

$(function refreshMusic() {
  $.ajaxSetup ({
    cache: false,
    complete: function () {
      setTimeout (refreshMusic, 1000);
    }
  })


username="sdbxsdb";
key="f5176df741bdcbae37daffc08ca087ac";



$.get( "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + username + "&api_key=" + key + "&format=json", function( spotifyData ) 
{


	if (typeof spotifyData.recenttracks.track[0]["@attr"] != "undefined")
	{
	    artist=spotifyData.recenttracks.track[0].artist["#text"];
    	track=spotifyData.recenttracks.track[0].name;
    	album=spotifyData.recenttracks.track[0].album["#text"];
    	artwork=spotifyData.recenttracks.track[0].image[1]["#text"];
    	$("#artwork").attr("src", artwork).removeClass("hideArtwork");
      $("#track").html(track + " by " + artist + " from " + album);
      volume = "0";
  
  
  }
  else {
    $("#artwork").addClass("hideArtwork");
    $("#track").html("Nothing");
    volume = "100";
    
  }

});

});


//YouTube API

var tag = document.createElement('script');
tag.src = "http://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


//This function creates an <iframe> (and YouTube player) after the API code downloads.
var player;

function onYouTubePlayerAPIReady() {
    
    player = new YT.Player('newsPlayer', {

        videoId: '9Auq9mYxFEE',
        playerVars: {'autohide': 0,
                    'cc_load_policy': 0,
                    'controls': 1,
                    'disablekb': 1,
                    'iv_load_policy': 3,
                    'modestbranding': 1,
                    'rel': 0,
                    'showinfo': 0,
                    'autoplay': 1,
                    'm':0
                    
                    },
                    events: {
                    
                      onStateChange: onPlayerStateChange
                      
                    }
    });


//This is muting the YouTube API when there is Spotify album art displayed and unmuting when there is nothing playing.
function onPlayerStateChange(event) {
  if($("#artwork").hasClass("hideArtwork")){
    player.unMute();
  }
  else
  {
    player.mute();
  }
}

//This is calling the above function every half second to check if there is or isn't any album art and muting or unmuting accoringly.
setInterval(onPlayerStateChange, 2000);

}
