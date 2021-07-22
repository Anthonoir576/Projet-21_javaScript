// CONSTANT ET VARIABLE  ###########################################



// notre canvas
const canvas = document.getElementById('canvas');
//ctx pour context, getcontext permet de faire appel a plein de petite fonction js avec canvas
const ctx = canvas.getContext('2d');

// mes imgs séparées
const img = new Image();


img.src = './source/image/img.png';




// GENERAL SETTING ####################################################### 
let gamePlay = false;
const gravity = .5;
const speed = 6.2;
const size = [51, 36];
const jump = -11.5;
const cTenth = (canvas.width / 10);

let index = 0,
    bestScore = 0,
    currentScore = 0,
    pipes = [],
    flight,
    flyHeight;

const render = () => {

    index++;

    // double background
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width), 0, canvas.width, canvas.height);

    // PERSONNAGE + animation avec floor
    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
    flyHeight = (canvas.height / 2) - (size[1] / 2);


    // FONT
    ctx.fillText(`SCORE : ${bestScore}`, 125, 30);
    ctx.font = "bold 10px courier";
    ctx.fillText(`click to play`, 110, 120);



    window.requestAnimationFrame(render);

};

img.onload = render;
