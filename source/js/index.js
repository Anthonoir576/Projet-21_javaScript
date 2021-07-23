// CONSTANT ET VARIABLE  ###########################################

// notre canvas
const canvas = document.getElementById('canvas');
//ctx pour context, getcontext permet de faire appel a plein de petite fonction js avec canvas
const ctx = canvas.getContext('2d');

// image
const img = new Image();
img.src = './source/image/img.png';




// stockage chez l'utilisateur de son score ###############################
// A REVOIR Probleme de logique 
function getData() {

    let scoreLocal = localStorage.getItem('score');

    if (scoreLocal > 0) {

        document.getElementById('bestScore').innerHTML = ` Meilleur score : ${scoreLocal}`;

    }

};

// fonction ajouter
function setData() {

    let scoreRecord = bestScore;
    localStorage.setItem('score', scoreRecord);

};





// GENERAL SETTING ####################################################### 
let gamePlay = false;
const gravity = .5;
const speed = 6.2;
const size = [51, 36];
const jump = -11.5;
const cTenth = (canvas.width / 10);

// pipe setting 
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth



let index = 0,
    bestScore = 0,
    currentScore = 0,
    pipes = [],
    flight,
    flyHeight;


// SETUP 
const setup = () => {

    currentScore = 0;
    flight = jump;
    flyHeight = (canvas.height / 2) - (size[1] /2 );

    pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()])

};    

// RENDU VISUEL
const render = () => {

    index++;

    // double background
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width), 0, canvas.width, canvas.height);

    if (gamePlay) {

        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTenth, flyHeight, ...size);
        flight += gravity;
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);

    } else {

        // PERSONNAGE + animation avec floor
        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size);
        flyHeight = (canvas.height / 2) - (size[1] / 2);


        // FONT
        ctx.fillText(`SCORE : ${bestScore}`, 130, 250);
        ctx.font = "bold 30px courier";
        ctx.fillText(`click to play`, 100, 700);


    };
    
    // my pipes
    if (gamePlay) {

        pipes.map(pipe => {

            pipe[0] -= speed;

            // top pipe
            ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);

            // bottom pipe
            ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

            if (pipe[0] <= - pipeWidth) {

                currentScore++;
                bestScore = Math.max(bestScore, currentScore); 

                // Supprime un tuyau, et en add un nouveau
                pipes = [...pipes.slice(1), [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()]]; 

            }

            // fin de partie au contact, methode recente pour testé des conditions
            if ([

                pipe[0] <= cTenth + size[0],
                pipe[0] + pipeWidth >= cTenth,
                pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1]

            ].every(elem => elem)) {

                gamePlay = false;
                setup();

                // record score dans le local storage user
                setData(); // A REVOIR ######################################

            };

        })

    };

    document.getElementById('bestScore').innerHTML = ` Meilleur score : ${bestScore}`;
    document.getElementById('currentScore').innerHTML = ` Actuel : ${currentScore}`;

    window.requestAnimationFrame(render);

};


getData(); // A REVOIR #####################################################
setup();

img.onload = render;
document.addEventListener('click', (e) => { gamePlay = true });
window.onclick = () => { flight = jump };