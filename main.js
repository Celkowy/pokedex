import './createPokemon.js'
import createPokemonDiv from './createPokemon.js'

const URL = 'https://pokeapi.co/api/v2/'
let offset = 0
const form = document.getElementById('#form')
const search = document.querySelector('.search')
const submit = document.querySelector('.submit')

const wrapper = document.querySelector('.wrapper')

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

loadPokemons(URL, offset)

window.addEventListener('scroll', e => {
  if (window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight - 50) {
    loadPokemons(URL, (offset += 60))
  }
})

search.addEventListener('input', () => {
  e.preventDefault()

  let searchText = form.value
  wrapper.innerHTML = ''
  loadPokemons(URL + searchText)
})
