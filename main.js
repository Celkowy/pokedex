import './createPokemon.js'
import createPokemonDiv from './createPokemon.js'

const URL = 'https://pokeapi.co/api/v2/'
let offset = 0

const wrapper = document.querySelector('.wrapper')
const form = document.getElementById('form')

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
  if (window.scrollY >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
    loadPokemons(URL, (offset += 60))
  }
})

form.addEventListener('submit', e => {
  e.preventDefault()

  let searchText = search.value

  fetch(URL + `pokemon/${searchText}`)
    .then(response => response.json())
    .then(data => showPika(data))
})

async function showPika(data) {
  const { types } = data
  wrapper.innerHTML = ''
  const pokemonDiv = document.createElement('div')
  pokemonDiv.setAttribute('class', 'pokemon-flip-box')
  pokemonDiv.innerHTML = `
  <div class="pokemon">
  <div class="flip-box-inner">
    <div class="flip-box-front">
      <div class="img-container"><img src="https://pokeres.bastionbot.org/images/pokemon/${data.id}.png" alt="" /></div>
      <div class="info">
        <span class="id">${data.id < 100 ? `#0${data.id}` : `#${data.id}`}</span>

        <h3 class="name">${data.name}</h3>
        <small>${types.map(types => types.type.name).join(' | ')}</small>
      </div>
    </div>

    <div class="flip-box-back">
      <div class="pokemon-name">
        <h3 class="name">${data.name}</h3>
      </div>

      <div class="abilities">
        <h4>Abilities:</h4>
        <small>${data.abilities.map(abilities => abilities.ability.name).join(', ')}</small>
      </div>

      <div class="base-experience">
        <h4>Base experience:</h4>
        <small>${data.base_experience}</small>
      </div>

      <div class="height">
        <h4>Height:</h4>
        <small>${data.height}</small>
      </div>

      <div class="weight">
        <h4>Weight:</h4>
        <small>${data.weight}</small>
      </div>
    </div>
  </div>
</div>
  `
  wrapper.appendChild(pokemonDiv)
}
