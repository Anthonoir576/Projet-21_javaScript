// CONSTANT ET VARIABLE  ###########################################



// notre canvas
const canvas = document.getElementById('canvas');
//ctx pour context, getcontext permet de faire appel a plein de petite fonction js avec canvas
const ctx = canvas.getContext('2d');

// mes imgs séparées
const decord = new Image();
const perso = new Image();
const haut = new Image();
const bas = new Image();

decord.src = './source/image/decord.png';
perso.src = './source/image/perso.png';
haut.src = './source/image/haut.png';
bas.src = './source/image/bas.png';



// GENERAL SETTING ####################################################### 
let gamePlay = false;
const gravity = .5;
const speed = 6.2;
const size = [50, 50];
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
    ctx.drawImage(decord, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
    ctx.drawImage(decord, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width), 0, canvas.width, canvas.height);



    // PERSONNAGE + animation avec floor
    ctx.drawImage(perso, 0, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
    flyHeight = (canvas.height / 2) - (size[1] / 2);

    window.requestAnimationFrame(render);

};

decord.onload = render;
perso.onload = render;
haut.onload = render;
bas.onload = render;