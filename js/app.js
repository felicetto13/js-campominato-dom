/* 
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco 
(attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html,
e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).

Il computer deve generare 16 numeri casuali compresi nel range della griglia: le bombe.

I numeri nella lista delle bombe non possono essere duplicati.

In seguito l’utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle

La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
al click con il tasto destro su una cella, inseriamo il flag per indicare che la cella potrebbe avere una bomba
Il computer deve generare 16 numeri casuali - cioè le bombe - compresi nello stesso range della difficoltà prescelta.

*/

//funzione che scopre tutte le bombe

function explodeBomb() {
    const explodedBomb = document.querySelectorAll("div[data-bomb]")
    for (let i = 0; i < explodedBomb.length; i++) {

        explodedBomb[i].classList.add("bomb")
    }
}


//funzione che determina la fine della partita
function partitaTerminata(resultMatch, pointGame) {

    const containerUnderGrid = document.createElement("div");
    containerUnderGrid.classList.add("popup");
    document.body.classList.add("overlay");
    if (resultMatch) {
        containerUnderGrid.innerHTML = `<h1 class="text-center">Hai Perso!</h1>
        <p class="text-center">Hai totalizzato un punteggio di ${pointGame} punti.</p>
        <p class="text-center">Riprova, sarai più fortunato!</p>
        <span class="closeButton"><button type="button" class="btn border-0 btn-outline-dark" id="btn-close"><i class="fa-solid fa-xmark"></i></button></span>`
    } else {
        containerUnderGrid.innerHTML = `<h1 class="text-center">Hai Vinto!</h1>
        <p class="text-center">Hai totalizzato un punteggio di ${pointGame} punti.</p>
        <span class="closeButton"><button type="button" class="btn border-0 btn-outline-dark" id="btn-close"><i class="fa-solid fa-xmark"></i></button></span>
        `
    }

    document.body.append(containerUnderGrid);
    const btnClose = document.getElementById("btn-close");
    btnClose.addEventListener("click", function () {
        document.body.classList.remove("overlay");
        containerUnderGrid.innerHTML = "";
        containerUnderGrid.classList.remove("popup");
    })
}
//genera la griglia del campo minato
function gridGeneretor(cellNumbers, difficultLevels, numbersBomb) {
    gridContainer.classList.add(difficultLevels);
    let punteggio = 0;
    let gameOver = false;
    //con un ciclo for creo un quadrato generando ad ogni ciclo un div
    for (let i = 1; i <= cellNumbers; i++) {
        //creo un elemento di tipo div che sarà la singola cella
        const cell = document.createElement("div");
        //Do uno stile al div con le classi precedentemente dichiarate nel file css
        cell.classList.add("cell");
        //inserisco in ogni cella il valore dell'indice i
        cell.append(i.toString());
        //appendo il div al contenitore della griglia
        gridContainer.append(cell);
        if (numbersBomb.includes(parseInt(cell.innerText))) {
            cell.dataset.bomb = "true";
        }
        cell.addEventListener("contextmenu", function (e) {
            e.preventDefault();
            if (this.classList.contains("bomb") || this.classList.contains("clicked") || gameOver) {
                return;
            }
            this.classList.toggle("flag");

        })

        cell.addEventListener("click", function () {
            if (this.classList.contains("bomb") || this.classList.contains("clicked") || gameOver) {
                return;
            }
            
            this.classList.remove("flag");


            if (numbersBomb.includes(parseInt(cell.innerText))) {
                explodeBomb();
                this.classList.add("bomb");
                gameOver = true;
                partitaTerminata(gameOver, punteggio);

            }
            else {
                this.classList.add("clicked");
                punteggio++;
            }
            if (punteggio === (cellNumbers - numbersBomb.length)) {

                partitaTerminata(gameOver, punteggio);
            }

        })

    }

}

/* Il computer deve generare una sequenza di 16 numeri che equivalgono alle bombe nella griglia */
function numBombGeneretor(cellsNumbers) {
    let numBomb = [];
    do {
        const num = Math.floor((Math.random() * cellsNumbers) + 1);
        if (!(numBomb.includes(num))) {
            numBomb.push(num)
        }

    } while (numBomb.length < 16);

    return numBomb;
}


//creo una variabile per il pulsante
const submitButton = document.getElementById("submitButton");
const gridContainer = document.getElementById("container-grid")

//creo l'evento click sul pulsante
submitButton.addEventListener("click", function () {
    //creiamo una funzione che svuoti le celle
    resetContainer(gridContainer);
    // creo una variabile che conterrà il valore scelto dall'utente tramite la select
    const select = document.getElementById("difficultLevels");
    const selectValue = select.value;
    let numCell;

    switch (selectValue) {
        case "easy":
            numCell = 100;
            break;
        case "medium":
            numCell = 81;
            break;
        case "hard":
            numCell = 49;
            break;
    }
    const bombGenerate = numBombGeneretor(numCell);
    gridGeneretor(numCell, selectValue, bombGenerate);
    // creo variabile per il contenitore della griglia


})

//funzione reset

const resetContainer = (gridContainer) => gridContainer.innerHTML = "";



