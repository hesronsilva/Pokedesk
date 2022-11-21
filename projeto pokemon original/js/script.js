const nomePokemon = document.querySelector('.nomePokemon')
const idPokemon = document.querySelector('.idPokemon')
const imagemPokemon = document.querySelector('.pokemon')

const form = document.querySelector('.form')
const pesquisa = document.querySelector('.barraPesquisa')
const anterior = document.querySelector('.Botao_ante')
const proximo = document.querySelector('.Botao_prox')

let pesquisaPokemon = Number("");


const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200) {
        const dados = await APIResponse.json();
        return dados;
    }
}

const renderPokemon = async (pokemon) => {

    nomePokemon.innerHTML = 'Carregando...';
    idPokemon.innerHTML = "";

    const dados = await fetchPokemon(pokemon);
    if (dados) {
        imagemPokemon.style.display = 'block';
        nomePokemon.innerHTML = dados.name;
        idPokemon.innerHTML = dados.id;
        imagemPokemon.src = dados['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default'];
        pesquisa.value = "";
        pesquisaPokemon = dados.id;
    } else if (pesquisaPokemon == "") {
        imagemPokemon.style.display = 'none';
        nomePokemon.innerHTML = "";
        idPokemon.innerHTML = "";
    }
    else {
        imagemPokemon.style.display = 'none';
        nomePokemon.innerHTML = "Não encontrado";
        idPokemon.innerHTML = "";
        pesquisa.value = "";
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(pesquisa.value.toLowerCase());
});

anterior.addEventListener('click', () => {
    if (pesquisaPokemon > 1) {
        pesquisaPokemon -= 1;
        renderPokemon(pesquisaPokemon);
    }
});

proximo.addEventListener('click', () => {
    pesquisaPokemon += 1;
    renderPokemon(pesquisaPokemon);
});

renderPokemon(pesquisaPokemon);