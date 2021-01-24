var colors = ["green" , "red" , "yellow" , "blue"];
var gamePattern = [];
var userClickPattern = [];
var currentLevel = 0;
var i=0;
var comparePatterns = 0;


$(document).keypress(function (event) {
    if(event.key=== "A")
    {
        nextSequence();
        $("h1").text("Play : " + currentLevel);
        makeSoundAndAnimate();
        comparePatterns=0;       
    }
});

function nextSequence()
{
    var randomInt = Math.floor(Math.random()*4);
    var randomColor = colors[randomInt];
    gamePattern.push(randomColor);
    currentLevel++;
}

function makeSoundAndAnimate()
{
    console.log("in msa");
    var interval = setInterval(function() {
        if(i>=gamePattern.length)
        {
            clearInterval(interval);
            i=0;
            return
        }
        
        console.log("#"+gamePattern[i]);
        makeFlash(gamePattern[i]);
        playSound(gamePattern[i]);

        i++;
    }, 500);
}


$(".btn").click(function (e) {
    makeFlash(e.target.id);
    playSound(e.target.id);
    userClickPattern.push(e.target.id);
    checkGameAndUsePattern();
    console.log(userClickPattern);
});



function checkGameAndUsePattern()
{
    if(gamePattern[comparePatterns] != userClickPattern[userClickPattern.length-1])
    {
        // console.log("value of gamePattern[cl]"+gamePattern[comparePatterns] , gamePattern);
        // console.log("value of userClickPattern[cl]"+userClickPattern[userClickPattern.length-1] , userClickPattern);

        $("h1").text("Over");
        gamePattern = [];
        userClickPattern = [];
        
    }
    
    else {
        comparePatterns++;
    }

    if(comparePatterns===gamePattern.length)
    {
        nextSequence();
        $("h1").text("Play : " + currentLevel);
        makeSoundAndAnimate();
        comparePatterns=0;
    }
    
}


function playSound(name)
{
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function makeFlash(name)
{
    $("#"+name).fadeOut(100).fadeIn(100);
}
