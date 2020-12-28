var highScore = document.querySelector("#highScore");
var goBack = document.querySelector("#goBack");
var clear = document.querySelector("#clear");

// eventlistener to clear the localstorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
    
})

// retrieves the previous score from localStorage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);
console.log(allScores);

if(allScores !== null){
  for(var i=0; i<allScores.length; i++){
      var createLi = document.createElement("li");
      createLi.textContent = allScores[i].initials + ": " + allScores[i].score;
      highScore.appendChild(createLi);
  }
}

goBack.addEventListener("click", function(){
    window.location.replace("index.html")
})