import './createPokemon.js'
import createPokemon from './createPokemon.js'
import returnHTML from './returnHTML.js'

const URL = 'https://pokeapi.co/api/v2/'
let offset = 0

const wrapper = document.querySelector('.wrapper')
const form = document.getElementById('form')
const title = document.querySelector('.title')

async function loadPokemons(url, offset) {
  const res = await fetch(url + `pokemon?limit=${60}&offset=${offset}`)
  const pokemons = await res.json()
  appendPokemonsToDOM(pokemons)
}

loadPokemons(URL, offset)

function appendPokemonsToDOM(pokemons) {
  const { results } = pokemons
  results.forEach(pokemon => {
    createPokemon(pokemon)
  })
}

window.addEventListener('scroll', e => {
  if (window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
    loadPokemons(URL, (offset += 60))
  }
})

form.addEventListener('submit', e => {
  e.preventDefault()
  let searchText = search.value
  fetch(URL + `pokemon/${searchText.toLowerCase()}`)
    .then(response => response.json())
    .then(data => displaySearchPokemon(data))
})

function displaySearchPokemon(data) {
  wrapper.innerHTML = ''
  const pokemonDiv = document.createElement('div')
  pokemonDiv.setAttribute('class', 'pokemon-flip-box')
  pokemonDiv.innerHTML = returnHTML(data)
  wrapper.appendChild(pokemonDiv)
}

title.addEventListener('click', () => {
  search.value = ''
  wrapper.innerHTML = ''
  offset = 0
  loadPokemons(URL, offset)
})
