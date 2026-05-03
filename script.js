let res = document.getElementById('res');
const botaoReiniciar = document.querySelector('.reiniciarTabuleiro');

let jogoAtivo = true;
let jogadas = 0;

let tabuleiro = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

let jogadorAtual = Math.random() > 0.5 ? "X" : "O";
document.getElementById('mensagem').innerHTML = `Vez do Jogador: <strong>${jogadorAtual}</strong>`;

function fazerJogada(l, c) {
    if (!jogoAtivo) return;

    if (tabuleiro[l][c] != "") {
        alert('Posição ocupada!');
        return;
    }

    tabuleiro[l][c] = jogadorAtual;
    jogadas += 1;

    atualizarTela();
    verificarVitoria();

    if (jogoAtivo) {
        jogadorAtual = jogadorAtual === "X" ? "O" : "X";
        document.getElementById('mensagem').innerHTML = `Vez do Jogador: <strong>${jogadorAtual}</strong>`;
    }
}

function atualizarTela() {
    const celulas = document.getElementsByClassName('celula');
    let i = 0;
    for (let l = 0; l < tabuleiro.length; l++) {
        for (let c = 0; c < tabuleiro[l].length; c++) {
            celulas[i].innerHTML = `<span>${tabuleiro[l][c]}</span>`;
            i++;
        }
    }
}

function verificarVitoria() {
    let vitoria = null;

    for (let i = 0; i < 3; i++) {
        if (tabuleiro[i][0] !== "" && tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2]) {
            vitoria = { tipo: 'linha', index: i, l: i, c: 0 };
        } else if (tabuleiro[0][i] !== "" && tabuleiro[0][i] === tabuleiro[1][i] && tabuleiro[1][i] === tabuleiro[2][i]) {
            vitoria = { tipo: 'coluna', index: i, l: 0, c: i };
        }
    }

    if (!vitoria) {
        if (tabuleiro[0][0] !== "" && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]) {
            vitoria = { tipo: 'diag1', index: 0, l: 1, c: 1 };
        } else if (tabuleiro[0][2] !== "" && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0]) {
            vitoria = { tipo: 'diag2', index: 0, l: 1, c: 1 };
        }
    }

    if (vitoria) {
        let vencedor = tabuleiro[vitoria.l][vitoria.c];
        const tabuleiroVisual = document.getElementById('tabuleiro-visual');
        tabuleiroVisual.classList.add(`vitoria-${vitoria.tipo}-${vitoria.index}`);
        res.innerHTML = `<p>O jogador <strong>${vencedor}</strong> venceu!</p>`;
        jogoAtivo = false;
    } else if (jogadas === 9) {
        res.innerHTML = `<p>Deu <strong>VELHA!</strong><p>`;
        jogoAtivo = false;
    }

    if (!jogoAtivo) {
        botaoReiniciar.style.visibility = 'visible';
    }
}

function reiniciarTabuleiro() {
    jogoAtivo = true;
    jogadas = 0; 
    tabuleiro = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const tabuleiroVisual = document.getElementById('tabuleiro-visual');
    tabuleiroVisual.className = "";
    res.innerHTML = `<p>O vencedor será exibido aqui...</p>`;

    atualizarTela();
    botaoReiniciar.style.visibility = 'hidden';
    
    jogadorAtual = Math.random() > 0.5 ? "X" : "O";
    document.getElementById('mensagem').innerHTML = `Vez do Jogador: <strong>${jogadorAtual}</strong>`;
}
