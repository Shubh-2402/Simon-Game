var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userPattern=[];
var started=false;
var level=0;

$(document).keypress(function () {
    if(!started)
    {
        $("#level-title").text("Level "+level);
        setTimeout(function () {
            nextSequence();
          }, 1000);
        started=true;
    }
});
function nextSequence()
{
    userPattern=[];

    level++;
    $("#level-title").text("Level "+level);

    var random= Math.floor(Math.random()*4);
    var randomColor=buttonColors[random];
    gamePattern.push(randomColor);

    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

$(".btn").click(function (){
    var userColor=this.id;
    userPattern.push(userColor);
    playSound(userColor);
    animate(userColor);
    checkAnswer(userPattern.length-1);
}
);

function playSound(name)
{
    var sound=new Audio("sounds/"+name+".mp3");
    sound.play();
}
function animate(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel)
{
    if(userPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("success");

        if(userPattern.length===gamePattern.length)
        {
        setTimeout(function () {
            nextSequence();
          }, 1000);
  
        }
    }
    

    else
    {
        console.log("Wrong");
        playSound("wrong")

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
        $("h1").text("Game Over,Press Any Key To Restart");
        startOver();
    }
}
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
    
}