import './createPokemonDiv.js'
import createPokemonDiv from './createPokemonDiv.js'

const URL = 'https://pokeapi.co/api/v2/'
let offset = 0

async function loadPokemons(url, offset) {
  const res = await fetch(url + `pokemon?limit=${60}&offset=${offset}`)
  const pokemons = await res.json()
  appendPokemonsToDOM(pokemons)
}

function appendPokemonsToDOM(pokemons) {
  const { results } = pokemons
  results.forEach(pokemon => {
    createPokemonDiv(pokemon)
  })
}
console.log(offset)
loadPokemons(URL, offset)

window.addEventListener('scroll', async e => {
  if (window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
    loadPokemons(URL, (offset += 60))
  }
})
