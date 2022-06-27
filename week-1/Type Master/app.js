const RANDOM_WORD_API_URL = 'https://random-word-api.herokuapp.com/word'//'http://api.quotable.io/random'
const wordDisplayElement = document.getElementById('WordDisplay')
const timerElement = document.getElementById('timer')
//const Dispdiv = document.getElementById('container')
let wordInput = [],intervalId
const corrected = 'correct', incorrect = 'incorrect', nota = 'nota'
window.addEventListener('keydown',value =>{
    const arrayWord = wordDisplayElement.querySelectorAll('span')
    let correct = true
    if(value.key==='Backspace') 
    {
        if(wordInput.length) wordInput.pop()
    }
    else if(value.key==='Space' || value.key.length==1) 
    {
        if(wordInput.length<arrayWord.length)
            wordInput.push(value.key)
    }
    arrayWord.forEach((characterSpan, index) => {
        const character = wordInput[index]
        if(character == null){
            characterSpan.classList.remove(corrected)
            characterSpan.classList.remove(incorrect)
            characterSpan.classList.add(nota)
            correct = false
        }
        else if(character === characterSpan.innerText){
            characterSpan.classList.remove(incorrect)
            characterSpan.classList.remove(nota)
            characterSpan.classList.add(corrected)
        }
        else{
            characterSpan.classList.remove(corrected)
            characterSpan.classList.remove(nota)
            characterSpan.classList.add(incorrect)
            correct = false
        }
    })
    if(correct) 
    {
        clearInterval(intervalId)
        //Dispdiv.appendChild(<img src="tickpic.png" id="pic"></img>)
        wordDisplayElement.style.transform += 'rotate(360deg)'
        renderNewWord()
    }
})

function getRandomWord(){
    return fetch(RANDOM_WORD_API_URL)
    .then(response => response.json())
    .then(data => data[0])
}

async function renderNewWord(){
    const Word = await getRandomWord()
    while(wordDisplayElement.firstChild){
        wordDisplayElement.removeChild(wordDisplayElement.firstChild)
    }
    wordDisplayElement.style.transform = ''
    Word.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.classList.add(nota)
        characterSpan.innerText = character
        wordDisplayElement.appendChild(characterSpan)
    })
    wordInput = []
    startTimer()
}

let startTime,cnt
function startTimer(){
    timerElement.innerText = 0
    cnt=0;
    intervalId = setInterval(() => {
        cnt++;
        timer.innerText = cnt;
    }, 1000)
}
renderNewWord()