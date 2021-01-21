const wrapper = document.querySelector('.wrapper')
let counter = 1

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

  setTimeout(() => {
    pokemonDiv.classList.add('animation')
  }, data.id * 75)
}
