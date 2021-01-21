import returnHTML from './returnHTML.js'

const wrapper = document.querySelector('.wrapper')

export default function createPokemonDiv(pokemon) {
  fetchData(pokemon)
}

async function fetchData(pokemon) {
  const res = await fetch(pokemon.url)
  const data = await res.json()
  insertData(data)
}

function insertData(data) {
  const pokemonDiv = document.createElement('div')
  pokemonDiv.setAttribute('class', 'pokemon-flip-box')
  const { types } = data
  pokemonDiv.innerHTML = returnHTML(data, types)
  wrapper.appendChild(pokemonDiv)

  // setTimeout(() => {
  //   pokemonDiv.classList.add('animation')
  // }, data.id * 75)
}
