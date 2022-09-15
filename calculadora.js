let dados

function filtrar() {

    let corRaca = seletorCorRaca.value

    function checarCorRaca(dado) {
        if (corRaca === 'TODAS') {
            return true
        } else if (dado.DS_COR_RACA == corRaca) {
            return true
        } else {
            return false
        }
    }

    let dadosFiltrados = dados.filter(checarCorRaca)

    mostrar(dadosFiltrados)

}

// Quando pessoa seleciona uma cor/raça
seletorCorRaca.onchange = filtrar

function mostrar(dados) {

    // Atualiza total
    total.textContent = dados.length

    // Limpa a lista
    nomes.textContent = ''

    // Adiciona itens
    for (let dado of dados) {
        li = document.createElement('li')
        li.textContent = dado.NM_URNA_CANDIDATO
        nomes.append(li)
    }
}

async function carregar() {
    dados = await d3.csv('data/dados_2014.csv')
    mostrar(dados)
}

carregar()