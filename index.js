
const grid  = document.querySelector(".grid")
let currentShooterIndex= 202
let width=15
let direction= 1
let invadersID
let goingRight =true
let result = document.querySelector(".result")
let aliensRemoved=[]
let score=0


for(let i = 0 ; i< 225 ; i++){
   const square = document.createElement("div")
   grid.appendChild(square)
}

const squares = Array.from(document.querySelectorAll(".grid div"))

const aliensInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39


]

function draw(){
    for(let i= 0 ; i< aliensInvaders.length; i++){

        if(!aliensRemoved.includes(i)){
            squares[aliensInvaders[i]].classList.add("invaders")
        }
     
    }
}

function remove(){
    for(let i= 0 ; i< aliensInvaders.length; i++){
     squares[aliensInvaders[i]].classList.remove("invaders")
    }
}

draw()

squares[currentShooterIndex].classList.add("shooter")

function moveShooter(e){

    squares[currentShooterIndex].classList.remove("shooter")
    switch(e.key){
        case "ArrowLeft":
            if(currentShooterIndex % width !== 0) currentShooterIndex -= 1 
            break
        case "ArrowRight":
            if(currentShooterIndex % width < width-1) currentShooterIndex += 1
            break   
    }
    squares[currentShooterIndex].classList.add("shooter")

}
document.addEventListener("keydown",moveShooter)

function moveInveders(){
    const leftEdge = aliensInvaders[0] %width === 0
    const rightEdge = aliensInvaders[aliensInvaders.length -1 ] % width === width-1
    remove()

    if(rightEdge && goingRight) {
        for(let i= 0 ; i<aliensInvaders.length; i++){
            aliensInvaders[i] += width +1
            direction =-1
            goingRight = false
        }
    }
    if(leftEdge && !goingRight){
        for(let i= 0 ; i< aliensInvaders.length; i++){
            aliensInvaders[i] += width-1
            direction =1
            goingRight= true
        }
    }


    for(let i= 0 ; i <aliensInvaders.length; i++){
        aliensInvaders[i] += direction


}
draw()
if(squares[currentShooterIndex].classList.contains("invaders", "shooter")){
    result.innerHTML = "Game Over"
    clearInterval(invadersID)
}

for(let i= 0 ; i< aliensInvaders.length ; i++){
    if(aliensInvaders[i] >(squares.length+width)){
        result.innerHTML="Game over"
        clearInterval(invadersID)
    }
    if(aliensRemoved.length === aliensInvaders.length) {
        result.innerHTML= "You win"
        clearInterval(invadersID)
    }
}
}
 invadersID =setInterval(moveInveders, 300)

 function shoot(e){
    let laserID
    let currentLaserIndex = currentShooterIndex
    function moveLaser(){
        squares[currentLaserIndex].classList.remove("laser")
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add("laser")
      
        if(squares[currentLaserIndex].classList.contains("invaders")){
            squares[currentLaserIndex].classList.remove("laser")
            squares[currentLaserIndex].classList.remove("invaders")
            squares[currentLaserIndex].classList.add("boom")

            setTimeout(()=> squares[currentLaserIndex].classList.remove("boom"), 300)
            clearInterval(laserID)
            const alienRemoved =aliensInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            score ++
            result.innerHTML = score
        }

    }

    switch(e.key){
        case "ArrowUp" :
            laserID = setInterval(moveLaser,100)
            break
    }
    
 }

 document.addEventListener("keydown", shoot)