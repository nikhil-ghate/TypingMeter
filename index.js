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

const speedmsg = document.getElementById("speed");
const correct = document.getElementById("correct");
const error = document.getElementById("error");


let startTime, endTime, wordCount;

const playGame = () => {
    let randomNum = Math.floor(Math.random() * setOfWords.length);
    msg.innerHTML = setOfWords[randomNum]; 
    startTime = new Date();
    btn.innerText = "Done";
}

const endGame = () => {
    endTime = new Date();
    let totalTime = (endTime - startTime);   //in ms
    totalTime = Math.round(totalTime / 1000); // in seconds

    let totatStr = typeword.value;
    wordCount = wordCounter(totatStr);

//     msg.innerHTML = "you have typed "+ wordCount + " words in" +  ;
    let speed = Math.round((wordCount / totalTime) * 60);
    let finalMsg;
    if (wordCount == 0 ) {
        alert("Not written");
        
    }
    finalMsg = `You have typed ${wordCount} words in ${totalTime} seconds.`;
  
    correct.innerHTML = compareWords(msg.innerText, totatStr);
    console.log(msg.innerText);
    console.log(totatStr);
    msg.innerHTML = finalMsg;
    speedmsg.innerHTML = `Speed: ${speed} words/minute`;
    
    typeword.value = null;
}

const compareWords = (str1, str2)=> {
    let words1 = str1.split(" ");
    let words2 = str2.split(" ");
    let count = 0;

    words1.forEach( function(item, index) {
       if (item == words2[index]) {
           count++;
       } 
    });

    let errorWords = words1.length - count;
    return `${count} words are correct out of ${words1.length} words <br>No. of Errors: ${errorWords}`;
}

const wordCounter = (str) => {
    if (str.length == 0) {
        alert("not written");
        return 0;
    }
    let response = str.split(" ").length;
    return response;
}

btn.addEventListener("click", function(){
    if (this.innerHTML ==  "Start"){
        typeword.disabled = false;
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