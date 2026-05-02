let res = document.getElementById('res');
const botaoReiniciar = document.querySelector('.reiniciarTabuleiro');

let jogoAtivo = true;

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

    atualizarTela();
    verificarVitoria();

    jogadorAtual = jogadorAtual === "X" ? "O" : "X";

    document.getElementById('mensagem').innerHTML = `Vez do Jogador: <strong>${jogadorAtual}</strong>`;
    console.log(tabuleiro);
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
    let vencedor = '';

    for (let i = 0; i < tabuleiro.length; i++) {
        for (let j = 0; j < tabuleiro[i].length; j++) {

            const verificacoes = [
                { tipo: 'linha', index: i, ok: (tabuleiro[i][0] != "" && tabuleiro[i][0] === tabuleiro[i][1] && tabuleiro[i][1] === tabuleiro[i][2]) },
                { tipo: 'coluna', index: j, ok: (tabuleiro[0][j] != "" && tabuleiro[0][j] === tabuleiro[1][j] && tabuleiro[1][j] === tabuleiro[2][j]) },
                { tipo: 'diag1', index: 0, ok: (tabuleiro[0][0] != "" && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2] && i === j) },
                { tipo: 'diag2', index: 0, ok: (tabuleiro[0][2] != "" && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][0] && (i + j === 2)) }
            ];

            const vitoria = verificacoes.find(v => v.ok);

            if (vitoria != undefined) {
                vencedor = tabuleiro[i][j];
                const tabuleiroVisual = document.getElementById('tabuleiro-visual');

                tabuleiroVisual.classList.add(`vitoria-${vitoria.tipo}-${vitoria.index}`);
                res.innerHTML = `<p>O jogador <strong>${vencedor}</strong> venceu a partida!</p>`;

                botaoReiniciar.style.visibility = 'visible';

                jogoAtivo = false;
                return;
            }
        }

    }
}

function reiniciarTabuleiro() {
    jogoAtivo = true;

    tabuleiro = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    const tabuleiroVisual = document.getElementById('tabuleiro-visual');
    tabuleiroVisual.className = "";

    atualizarTela();
    console.log(tabuleiro);

    botaoReiniciar.style.visibility = 'hidden';
}