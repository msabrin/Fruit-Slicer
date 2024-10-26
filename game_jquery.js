var playing = false;
var score;
var trialsleft;
var step; //for random steps
var action; //for settime interval
var bunnies = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]; //for bunnies

$(function () {
  //click on start or reset button
  $("#front").show();
  $("#startReset").click(function () {
    if (playing == true) {
      //if we are playing
      location.reload(); //reload page
    } else {
      //if we are not playing from before
      $("#front").hide();
      $("#score").show();
      playing = true;
      //set score to 0
      score = 0;
      $("#scoreValue").html(score);

      //show trials left box

      $("#trialsleft").show();
      trialsleft = 3;
      addhearts();

      //hide game over box
      $("#gameOver").hide();

      //change button to reset game
      $("#startReset").html("Reset Game");

      //start action
      startAction();
    }
  });
  //hunt a bunny
  $("#bunny1").mouseover(function () {
    score++; // increase score
    $("#scoreValue").html(score);

    //play sound
    $("#huntsound")[0].play();

    //stop bunny
    clearInterval(action);

    //hide bunny
    $("#bunny1").hide("explode", 500); //hunt bunny

    //send new bunny
    setTimeout(startAction, 500);
  });

  //functions

  //addhearts
  function addhearts() {
    $("#trialsleft").empty();
    for (i = 0; i < trialsleft; i++) {
      $("#trialsleft").append('<img src="images/wrong.png" , class="life">');
    }
  }

  //start action
  function startAction() {
    //generate random bunny
    $("#bunny1").show();

    //choose random bunny
    chooseRandom();
    //random position
    $("#bunny1").css({
      left: Math.round(550 * Math.random()),
      top: -50,
    });
    //generate random step
    step = 1 + Math.round(5 * Math.random()); //change steps
    //descend bunnies down by 10ms
    action = setInterval(function () {
      //move bunny by one step
      $("#bunny1").css("top", $("#bunny1").position().top + step);

      //check if the bunny is too low
      if ($("#bunny1").position().top > $("#bunnycontainer").height() - 50) {
        //yes it is low
        // check trails left
        if (trialsleft > 1) {
          //generate a bunny
          $("#bunny1").show();
          //choose random bunny
          chooseRandom();
          //random position
          $("#bunny1").css({
            left: Math.round(550 * Math.random()),
            top: -50,
          });
          //generate random step
          step = 1 + Math.round(5 * Math.random()); //change steps

          //reduce trials by one
          trialsleft--;
          //populate trails left box by one
          addhearts();
        } else {
          //game over
          playing = false; //we are ot playing any more
          $("#score").hide();
          $("#startreset").html("Start Game");
          $("#gameOver").show();
          $("#gameOver").html(
            "<p>Game Over!</p><p>Your score is " + score + "</p>"
          );
          $("#trialsleft").hide();
          stopAction(); //stops Action
        }
      }
    }, 10);
  }

  //choose random bunnies
  function chooseRandom() {
    $("#bunny1").attr(
      "src",
      "images/" + bunnies[Math.round(9 * Math.random())] + ".png"
    );
  }

  // Stop Action
  function stopAction() {
    clearInterval(action);
    $("#bunny1").hide();
  }
});
