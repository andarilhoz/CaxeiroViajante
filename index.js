
const fs = require('fs')
const currentData = 'cv10.json'

// Solucao para o metodo do vizinho mais proximo
function metodoDoVizinhoMaisProximo() {
    const matriz = lePontos();

    const tamanhoDaMatriz = matriz[0].length
    if (tamanhoDaMatriz <= 0) return console.log("Tamanho invalido")

    const { rotaMinimizada, distanciaMinimizada } = pegaCalculoDeRota(matriz)

    exibeOResultado(rotaMinimizada, distanciaMinimizada)

}

function lePontos() {
    const pontos = fs.readFileSync(currentData)
    return JSON.parse(pontos.toString())
}

function pegaCalculoDeRota(matriz) {
    let rotaMinimizada = [0];
    let distanciaMinimizada = [0];

    let linha = 0;

    // Executa até encher o vetor de saida
    while (rotaMinimizada.length < matriz[0].length) {

        let [ponto, menorValorDoVetor] = pegaPontoComMenorValorDoVetor(matriz, rotaMinimizada, linha);

        // adiciona o ponto de menor distância no vetor de saida
        rotaMinimizada.push(ponto);
        distanciaMinimizada.push(menorValorDoVetor);

        linha = ponto;
    }

    return {
        rotaMinimizada,
        distanciaMinimizada
    }
}

function pegaPontoComMenorValorDoVetor(matriz, rotaMinimizada, linha) {
    // define um valor alto para se procurar o menor valor do vetor
    // é possível alterar o algorito para não usar esse artifício
    let menorValorDoVetor = 10000;
    let ponto = 0;

    // varre a linha inteira em busca da menor distancia
    for (let j = 0; j < matriz[linha].length; j++) {

        if (j == linha) continue;
        if (rotaMinimizada.includes(j)) continue;

        // verifica se a distância atual é a menor distância e 
        // verfica se o ponto ainda não está na rota.
        // por definição j tem que ser diferente de k.
        if (matriz[linha][j] < menorValorDoVetor) {
            // se o ponto for o menor do vetor, guarda qual a posição e guarda
            // qual a menor distância
            ponto = j;
            menorValorDoVetor = matriz[linha][j];
        }
    }
    return [ponto, menorValorDoVetor]
}

function exibeOResultado(rotaMinimizada, distanciaMinimizada) {
    for (let i = 0; i < rotaMinimizada.length; i++) {
        console.log(` -> P${rotaMinimizada[i]} (${distanciaMinimizada[i]})`);
    }
    console.log('Distancia total: ' + distanciaMinimizada.reduce((a, b) => a + b))
}

metodoDoVizinhoMaisProximo()