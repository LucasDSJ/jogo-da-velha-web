const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

const resetPopupX = document.getElementById("reset-popup-x");
const resetPopupO = document.getElementById("reset-popup-o");
const resetPopupEmpate = document.getElementById("reset-popup-empate");

let jogador1 = document.getElementById("jogador-1");
let jogador2 = document.getElementById("jogador-2");

jogador1.classList.add("bg-white/50")

let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogador = "X";
let rodando = true;

const condicoesDeVitoria = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// eventos dos clicks nos quadrados
cells.forEach(cell => {
    cell.addEventListener("click", () => cellClick(cell));
});

// botão reiniciar principal
resetBtn.addEventListener("click", resetGame);

// botões dos popups
resetPopupX.addEventListener("click", resetGame);
resetPopupO.addEventListener("click", resetGame);
resetPopupEmpate.addEventListener("click", resetGame);


function cellClick(cell) {
    const index = cell.dataset.index;

    if (tabuleiro[index] !== "" || !rodando) return;

    tabuleiro[index] = jogador;

    // define a cor dos símbolos
    if (jogador === "X") {
        cell.classList.add("text-red-500");
    } else {
        cell.classList.add("text-blue-500");
    }
    cell.textContent = jogador;

    checaVencedor();
}


function checaVencedor() {
    let vencedor = false;

    for (let cond of condicoesDeVitoria) {
        const [a, b, c] = cond;

        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            vencedor = true;
            break;
        }
    }

    if (vencedor) {
        statusText.textContent = `Jogador ${jogador} venceu!`;
        rodando = false;
        mostrarVencedor(jogador);

    } else if (!tabuleiro.includes("")) {
        statusText.textContent = "Empate!";
        rodando = false;
        vencedor = "empate"
        mostrarVencedor(vencedor)

    } else {
        jogador = jogador === "X" ? "O" : "X";

        if (jogador === "X") {
            jogador1.classList.add("bg-white/50");
            jogador2.classList.remove("bg-white/50");
        } else {
            jogador2.classList.add("bg-white/50");
            jogador1.classList.remove("bg-white/50");
        }

        statusText.textContent = `Vez do jogador: ${jogador}`;
    }
}


function resetGame() {
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogador = "X";
    rodando = true;
    statusText.textContent = "Vez do jogador: X";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("text-red-500", "text-blue-500");
    });

    // jogador1.classList.remove("bg-white/50");
    jogador2.classList.remove("bg-white/50");

    esconderVencedor();
}


function mostrarVencedor(vencedor) {
    const overlay = document.getElementById("overlay");
    const popup = document.getElementById(vencedor); // X ou O

    overlay.classList.remove("hidden");
    popup.classList.remove("hidden");
}

function esconderVencedor() {
    const overlay = document.getElementById("overlay");
    const popupX = document.getElementById("X");
    const popupO = document.getElementById("O");
    const popupEmpate = document.getElementById("empate");

    overlay.classList.add("hidden");
    popupX.classList.add("hidden");
    popupO.classList.add("hidden");
    popupEmpate.classList.add("hidden");
}