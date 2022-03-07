 var buttonColours=["red","blue","green","yellow"];
 var gamePattern=[];
 var userClickedPattern=[];
 var started=false;
 var level=0;

//user clicked button 
$(".btn").on("click",function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    console.log(userChosenColor);
    checkAnswer(userClickedPattern.length-1)
 });



$(document).on("keydown",function(){
if(started==false){
    $("h1").text("level"+" "+level);
    nextSequence(); 
    started=true;
}
});



// to make sound
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
 };




// to make game pattern 
function nextSequence(){
userClickedPattern=[];
    level++;
    $("h1").text("level "+level);

 var randomNumber=Math.random()*4;
 randomNumber=Math.floor(randomNumber);


 var randomChosenColour=buttonColours[randomNumber];

 gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);


}

//for animations
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function() {
        $(".btn").removeClass("pressed");
    }, 100);
}

//to restart game
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    userClickedPattern=[];
}

//checking ans
function checkAnswer(currentLevel){
console.log(currentLevel);
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length===userClickedPattern.length){
        setTimeout(()=>{
            nextSequence()},1000);
    console.log("success");
}
}
else{
    playSound("wrong");
    $('body').addClass("game-over");
    setTimeout(() => {
        $('body').removeClass("game-over");
    },200);
    $('h1').text("Game Over, Press Any Key to Restart");
   startOver();
    console.log("fail");
}
}
