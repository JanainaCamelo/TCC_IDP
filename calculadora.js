// Declara variável dados como global
let dados = {
    "2022" : [],
    "2018" : [],
    "2014" : []
}

// Define função que filtra dados com base em seletores
function filtrar() {

    // Pega valor mais atual do seletor de cor/raça
    let corRaca = seletorCorRaca.value
    let genero = seletorGenero.value

    // Declara variável para ser filtrada múltiplas vezes
    let dadosFiltrados

    function checarCorRaca(dado) {

        // Evita filtrar se opção for “Todas”
        if (corRaca === 'TODAS') {
            return true
        }
        
        // Mantém apenas as pessoas que tem a cor/raça igual à opção selecionada
        return dado.DS_COR_RACA === corRaca
    }

    function checarGenero(dado) {

        // Evita filtrar se opção for “Todos”
        if (genero === 'TODOS') {
            return true
        }

        // Mantém apenas as pessoas que tem o gênero igual à opção selecionada
        return dado.DS_GENERO === genero
    }

    // Pega ano selecionado
    let ano = seletorAno.value

    // Filtra dados
    dadosFiltrados = dados[ ano ].filter(checarCorRaca)
    dadosFiltrados = dadosFiltrados.filter(checarGenero)

    function filtrarEleitos(dado) {
        return dado.DS_SIT_TOT_TURNO === 'ELEITO'
    }

    // Filtra por pessoas eleitas
    let pessoasEleitas = dadosFiltrados.filter(filtrarEleitos)

    // Atualiza lista com dados filtrados
    mostrar(dadosFiltrados, pessoasEleitas)

}

// Quando pessoa seleciona uma cor/raça
seletorCorRaca.onchange = filtrar
seletorGenero.onchange = filtrar
seletorAno.onchange = filtrar

// Define função para mostrar pessoas candidatas
function mostrar(candidatos, eleitos) {

    // Atualiza total
    total.textContent = candidatos.length

    // Atualiza total de eleitos
    totalEleitos.textContent = eleitos.length

    let valorPercentual = eleitos.length / candidatos.length * 100

    // Calcula percentual
    percentual.textContent = valorPercentual.toFixed(1) + '%'
    
    // Aumenta barra proporcionalmente (valor arbitrário)
    let comprimento = valorPercentual * 8

    // Atualizar comprimento do gráfico de barra
    barra.style.width = comprimento + 'px'

    // Limpa a lista
    nomes.textContent = ''

    // Adiciona itens
    for (let candidato of candidatos) {

        // Cria elemento <li>
        li = document.createElement('li')

        // Adiciona nome de urna dentro da <li>
        li.textContent = candidato.NM_URNA_CANDIDATO

        // Adiciona <li> à <ul>
        nomes.append(li)
    }
}

// Define função para carregar dados (só 2014)
async function carregar() {
    dados[ '2018' ] = await d3.csv('data/dados_2018.csv')
    dados[ '2014' ] = await d3.csv('data/dados_2014.csv')

    // Mostra pessoas candidatas
    filtrar()
}

// Chama função que carrega dados
carregar()
