let timerId
const display = document.querySelector('.display__time-left')
const displayTimeRemainder = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
const input = document.querySelector('#custom')
const stop = document.querySelector('.stop')
const start = document.querySelector('.start')
let stat = false

function timer(second){ 
    clearInterval(timerId)
    const now = Date.now()
    const then = now + second * 1000
    displayTimeLeft(second)
    displayEndTime(then)

    // console.log({now, then})
    if(stat){timerId = setInterval(() => {
        const secondLeft = Math.round((then - Date.now())/1000)
    // console.log({secondLeft})
    secondLeft <= 0? clearInterval(timerId): ''
    displayTimeLeft(secondLeft)
    startButton(secondLeft)
    }, 1000);}
}

function displayTimeLeft(second){
    const minutes = Math.floor(second / 60)
    const secInMinute = second % 60
    const timeSet = `${minutes} : ${secInMinute < 10? '0': ''}${secInMinute}`
    display.innerText = timeSet
    document.title = timeSet
    // console.log(minutes, secInMinute)
}

function displayEndTime(second){
    const time = new Date(second)
    const hours = time.getHours()
    const minutes = time.getMinutes()
    displayTimeRemainder.textContent = `
        Come Back at ${hours > 12 ? hours - 12: hours}:${minutes < 10? 0: '      '}${minutes}`
}

function startTimer(){
    const value = this.dataset.time
    timer(value)
}

function customTimer(e){
    e.preventDefault()
    const value = this.minutes.value
    timer(value * 60)
    this.reset()
}
function stopTimer(e){
    stat = false
    timer(0)
    clearInterval(timerId)
    displayTimeRemainder.innerText = 'Set The Timer!!'
}
function startButton(currentTime){
    stat = true
    // timer(currentTime)
}

buttons.forEach(button => button.addEventListener('click', startTimer ))
input.addEventListener('submit', customTimer)
stop.addEventListener('click', stopTimer)
start.addEventListener('click', startButton)