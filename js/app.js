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

//genera la griglia del campo minato
function gridGeneretor(cellNumbers, difficultLevels) {
    gridContainer.classList.add(difficultLevels);
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

        
        cell.addEventListener("click", function () {
            this.classList.add("clicked");
        })
    }

}

/* Il computer deve generare una sequenza di 16 numeri che equivalgono alle bombe nella griglia */
function numBombGeneretor() {
    let numBomb = [];
    do{
        const num = Math.floor((Math.random() * 100) + 1);
        if(!(numBomb.includes(num))){
            numBomb.push(num)
        }

    }while(numBomb.length < 16);
    
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

    gridGeneretor(numCell, selectValue);
    // creo variabile per il contenitore della griglia

})

//funzione reset

const resetContainer = (gridContainer) => gridContainer.innerHTML = "";



