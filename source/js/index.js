// CONSTANT ET VARIABLE  ###########################################



// notre canvas
const canvas = document.getElementById('canvas');
//ctx pour context, getcontext permet de faire appel a plein de petite fonction js avec canvas
const ctx = canvas.getContext('2d');

// mes imgs séparées
const decord = new Image();
const perso0 = new Image();
const perso1 = new Image();
const perso2 = new Image();
const haut = new Image();
const bas = new Image();

decord.src = './source/image/decord.png';
perso0.src = './source/image/perso0.png';
perso1.src = './source/image/perso1.png';
perso2.src = './source/image/perso2.png';
haut.src = './source/image/haut.png';
bas.src = './source/image/bas.png';



// GENERAL SETTING ####################################################### 
let gamePlay = false;
const gravity = .5;
const speed = 6.2;
const size = [114, 87];
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

        window.requestAnimationFrame(render);

    };