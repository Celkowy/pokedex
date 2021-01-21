import returnHTML from './returnHTML.js'

const wrapper = document.querySelector('.wrapper')

export default async function createPokemon(pokemon) {
  const res = await fetch(pokemon.url)
  const data = await res.json()
  insertData(data)
}

function insertData(data) {
  const pokemonDiv = document.createElement('div')
  pokemonDiv.setAttribute('class', 'pokemon-flip-box')
  pokemonDiv.innerHTML = returnHTML(data)
  wrapper.appendChild(pokemonDiv)

  // setTimeout(() => {
  //   pokemonDiv.classList.add('animation')
  // }, data.id * 75)
}
