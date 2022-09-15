// Declara variável dados como global
let dados

// Define função que filtra dados com base em seletores
function filtrar() {

    // Pega valor mais atual do seletor de cor/raça
    let corRaca = seletorCorRaca.value

    function checarCorRaca(dado) {

        // Evita filtrar se opção for “Todas”
        if (corRaca === 'TODAS') {
            return true
        }
        
        // Mantém apenas as pessoas que tem a cor/raça igual à opção selecionada
        return dado.DS_COR_RACA === corRaca
    }

    // Filtra dados
    let dadosFiltrados = dados.filter(checarCorRaca)

    // Atualiza lista com dados filtrados
    mostrar(dadosFiltrados)

}

// Quando pessoa seleciona uma cor/raça
seletorCorRaca.onchange = filtrar

// Define função para mostrar pessoas candidatas
function mostrar(dados) {

    // Atualiza total
    total.textContent = dados.length

    // Limpa a lista
    nomes.textContent = ''

    // Adiciona itens
    for (let dado of dados) {

        // Cria elemento <li>
        li = document.createElement('li')

        // Adiciona nome de urna dentro da <li>
        li.textContent = dado.NM_URNA_CANDIDATO

        // Adiciona <li> à <ul>
        nomes.append(li)
    }
}

// Define função para carregar dados (só 2014)
async function carregar() {
    dados = await d3.csv('data/dados_2014.csv')

    // Mostra pessoas candidatas
    mostrar(dados)
}

// Chama função que carrega dados
carregar()