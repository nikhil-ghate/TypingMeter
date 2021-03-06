const setOfWords = [
    "Shoot for the moon, even if you miss you will land among the stars." ,
    "Raise your words, not your voice. It is rain that grows flowers, not thunder.",
    "One of the hardest parts of life is deciding whether to walk away or try harder.",
    "Everyone is temporary. Only life continues.",
    "There is no elevator to success. You have to take the stairs.",
    "Fear gives intelligence even to fools."
];

const msg = document.getElementById("msg");
const btn = document.getElementById("btn");
const typeword = document.getElementById("myword");
typeword.disabled = true;

const speedmsg = document.getElementById("speed");
const correct = document.getElementById("correct");
const error = document.getElementById("error");

const congrats = new Audio();
congrats.src = "audio/Audience_Applause-Matthiew11-1206899159.mp3"

let startTime, endTime, wordCount, errorWords;

// FUNCTION: playGame()
const playGame = () => {
    let randomNum = Math.floor(Math.random() * setOfWords.length);
    msg.innerHTML = setOfWords[randomNum]; 
    startTime = new Date();
    btn.innerText = "Done";
}

// FUNCTION: endGame()
const endGame = () => {
    endTime = new Date();
    let totalTime = (endTime - startTime);   //in ms
    totalTime = Math.round(totalTime / 1000); // in seconds

    let totatStr = typeword.value;
    wordCount = wordCounter(totatStr);

    let speed = Math.round((wordCount / totalTime) * 60);
   
    let finalMsg;

    finalMsg = `You have typed ${wordCount} words in ${totalTime} seconds.`;
  
    correct.innerHTML = compareWords(msg.innerText, totatStr);
    msg.innerHTML = finalMsg;
    speedmsg.innerHTML = `Speed: ${speed} words/minute`;
    
    if (speed >= 25 && errorWords <=2 ) {
        congrats.play();
    }
    
}


// FUNCTION: ComapareWords()
const compareWords = (str1, str2)=> {
    let words1 = str1.split(" ");
    let words2 = str2.split(" ");
    let count = 0;

    words1.forEach( function(item, index) {
       if (item == words2[index]) {
           count++;
       } 
    });

    errorWords = words1.length - count;
    return `${count} words are correct out of ${words1.length} words <br>No. of Errors: ${errorWords}`;
}

//FUNCTION: WordCounter()
const wordCounter = (str) => {
    if (str.length == 0) {
        alert("Not typed anything...");
        return 0;
    }
    let response = str.split(" ").length;
    return response;
}

//Listen when button clicked
btn.addEventListener("click", function(){
    if (this.innerHTML ==  "Start"){
        typeword.disabled = false;
        typeword.value = null;
        speedmsg.innerHTML = null;
        correct.innerHTML = null;
        playGame();
    }else if(this.innerText == "Done"){
        if (wordCounter(typeword.value) != 0) {
            typeword.disabled = true;
            btn.innerText = "Start";
            endGame();
        }
         return;
    }
})