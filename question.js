var questions = [
    {title:"Which of the following is an advantage of using JavaScript?",
     choices: ["Less server interaction", "Immediate feedback to the visitors", "Increased interactivity", "All of the above"],
     answer : "All of the above"
     },
     {
      title: "Which built-in method returns the length of the string?",
      choices: ["length()", "size()", "index()", "None of the above"],
      answer: "length()"
     },
     {
      title: "Which built-in method sorts the elements of an array?",
      choices: ["changeOrder(order)", "order()", "sort()","None of the above"],
      answer: "sort()"
     },
     {
      title: "Which of the following function of String object returns the primitive value of the specified object?",
      choices: ["toLocaleUpperCase()","toUpperCase()", "toString()","valueOf()"],
      answer: "valueOf()"
     },
     {
      title: "Which of the following function of Array object extracts a section of an array and returns a new array?",
      choices: ["reverse()","shift()","slice()","some()"],
      answer: "slice()"
     }

     ]

     var score= 0;
     var questionIndex=0;
     
     var wrapper = document.querySelector("#wrapper");
     var currentTime = document.querySelector("#currentTime");
     var questionDiv = document.querySelector("#questionsDiv");
     var choicesUl = document.querySelector("#choicesUl");
     var startQuiz = document.querySelector("#startTime");

     var timeleft = 75;
     var interval = 0;
    // penalty for wrong answer
     var penalty = 5;
     var createUl = document.createElement("ul");

     startQuiz.addEventListener("click", function(){
         console.log("clicked")
         if (interval ===0){
             interval = setInterval(function(){
                 timeleft --;
                 currentTime.textContent = "Time: " + timeleft;
                 if (timeleft<=0){
                     clearInterval(interval);
                     currentTime.textContent = "Time is up"
                 }
             },1000)
         }
         render(questionIndex);
     })
    //  function to render questions and choices
     function render(questionIndex){
       questionDiv.innerHTML = "";
       createUl.innerHTML = "";

       for(i=0;i<questions.length; i++){
         var userquestion = questions[questionIndex].title;
         var userChoices = questions[questionIndex].choices;
         questionDiv.textContent = userquestion;
         
       }
    //    create a list of userchoices
       userChoices.forEach(function(newItem){
          var listItem = document.createElement("li");
          listItem.textContent = newItem;
          questionDiv.appendChild(createUl);
          createUl.appendChild(listItem);
          listItem.addEventListener("click", (compare))
       })

     }
    //  function to compare the user selection with the answer choices
     function compare(event){
       var element = event.target;
       if(element.matches("li")){
           var createDiv = document.createElement("div");
           createDiv.setAttribute("id","createDiv");
           if(element.textContent == questions[questionIndex].answer){
            score++;
            createDiv.textContent = "correct! answer is " + questions[questionIndex].answer
         } else{
             timeleft= timeleft-penalty;
             createDiv.textContent = "wrong ! answer is " + questions[questionIndex].answer
         }

       }
        //  to determine the question number the user is on
     questionIndex++;
     if(questionIndex>= questions.length){
         done();
         createDiv.textContent = "End of quiz you got " + score + "/" + questions.length + " correct!"
     }else{
         render(questionIndex);
     }
      questionDiv.appendChild(createDiv);
     }
   
    
    
      function done(){
         questionDiv.innerHTML = "";
         currentTime.innerHTML = "";
        //  creates a heading
         var createH1 = document.createElement("h1");
         createH1.setAttribute("id","createH1")
         createH1.textContent = "All Done!"

         questionDiv.appendChild(createH1);
        // create a p tag
         var createP = document.createElement("p");
         createP.setAttribute("id","createP")
         questionDiv.appendChild(createP);

        //  calculate the  score with remaining time
        if(timeleft>=0){
         var timeRemaining = timeleft;
         var createP2 = document.createElement("p");
         clearInterval(interval);
         createP.textContent = "Your final score is " + timeRemaining;
         questionDiv.appendChild(createP2);
        }
        // create a label for initials

        var createLabel = document.createElement("label");
        createLabel.setAttribute("id", "createLabel");
        createLabel.textContent = "Enter your Initials";
        questionDiv.appendChild(createLabel);

        // create input to enter the initials
        var createInput = document.createElement("input");
        createInput.setAttribute("type","text");
        createInput.setAttribute("id","initials");
        createInput.textContent = "";
        questionDiv.appendChild(createInput);

        // submit button
        var createSubmit = document.createElement("button");
        createSubmit.setAttribute("type" ,"submit");
        createSubmit.setAttribute("id","Submit");
        createSubmit.textContent = "submit"
        questionDiv.appendChild(createSubmit);
        

        // event listener to get the initials and scores to store in local storage
        createSubmit.addEventListener("click", function(){
            var initials = createInput.value;
            if(initials === null){
                console.log("no value entered")
            }else {
                var finalScore = {
                    initials: initials,
                    score: timeRemaining
                }
                console.log(finalScore);
                var allScores= localStorage.getItem("allScores");
                if(allScores === null){
                    allScores = []
                } else{
                    allScores = JSON.parse(allScores);
                }
                allScores.push(finalScore);
                var newScore = JSON.stringify(allScores);
                localStorage.setItem("allScores", newScore);
                window.location.replace("highscores.html");
            }

        })

     }

  


     


