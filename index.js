let inputDir ={x: 0, y: 0};
const foodsound= new Audio('food.mp3');
const move = new Audio('move.mp3');
const gameover = new Audio('over.mp3');
const music = new Audio('music.mp3')
let speed = 10;
let score =0;
let lastpainttime=0;
let flashArr= [
    {x: 13, y: 15}
];
food = {x: 6 , y: 7};

// game function
function main(ctime)
{
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastpainttime)/1000 < 1/speed){
        return;
    }
    lastpainttime = ctime;
    gameEngine();
}
//is collide
function iscollide(flash){
    // myself bump
    for(let i = 1; i < flashArr.length; i++){
        if(flash[i].x === flash[0].x && flash[i].y === flash[0].y){
            return true;
        }
    }
    //wall collide
    if(flash[0].x >=18 || flash[0].x <=0 || flash[0].y >=18 || flash[0].y <=0){
        return true;
    }
    
    return false;
}


function gameEngine()
{   
    if(iscollide(flashArr)){
        gameover.play();
        music.pause();
        inputDir = {x: 0, y: 0};
        alert("GAME OVER. PRESS ANY KEY TO PLAY AGAIN!");
        flashArr= [{x: 13, y: 15}];
        music.play();
        score = 0;
    }

    //score baord
    if(flashArr[0].y=== food.y && flashArr[0].x === food.x){
        //foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        flashArr.unshift({x: flashArr[0].x + inputDir.x,y: flashArr[0].y + inputDir.y });
        let a =2;
        let b =16;
        food={x: Math.round(a+(b-a)* Math.random()),y: Math.round(a+(b-a)* Math.random())}
    }

    //move
    for( let i = flashArr.length - 2; i>=0; i--){
        flashArr[i+1] = {...flashArr[i]};
        
    }
    flashArr[0].x += inputDir.x;
    flashArr[0].y += inputDir.y;

    //step : 2
    board.innerHTML = "";
    flashArr.forEach((e, index)=>{
        flashElement = document.createElement('div');
        flashElement.style.gridRowStart = e.y;
        flashElement.style.gridColumnStart = e.x;

        if(index === 0){
            flashElement.classList.add('head');
        }
        else{
            flashElement.classList.add('flash');
        }
        board.appendChild(flashElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}

// main logic
music.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HighScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x: 0, y: 1}
    move.play();
    switch(e.key){
        case "ArrowUp": 
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown": 
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft": 
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight": 
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;

    }

});