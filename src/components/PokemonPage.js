import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

const BASE_URL = "http://localhost:3000/pokemon/"

class PokemonPage extends React.Component {

  // Question-I didn't put props inside the constructor and super, but it runs fine...?
  //if we dont pass props, is it automatically passing it in by itself?
  constructor() {
    super()
    this.state = {
      pokemons: [],
      searchText: ""
      // imgBack: false
    }
  }

  componentDidMount() {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(pokeObjs => {
        this.setState({
          pokemons: pokeObjs
          // .map(pokemon => { return { ...pokemon, imgBack: false } })
          // Becaurful with the syntax ^   Need curlies to wrap that obj
        })
      })
  }

  // handleImg = (id) => {
  //   let pokemonsTogImg = this.state.pokemons.map(pokemon => {
  //     if (pokemon.id === id && pokemon.imgBack === false)
  //       return { ...pokemon, imgBack: true }
  //     else if (pokemon.id === id && pokemon.imgBack === true)
  //       return { ...pokemon, imgBack: false }
  //     else return pokemon //I don't need curlies around pokemon. It threw me an error!!!!!! 
  //   })
  //   this.setState({
  //     // imgBack: !this.state.imgBack
  //     pokemons: pokemonsTogImg
  //   })
  // }


  handleSearch = (searchName) => {
    this.setState({
      searchText: searchName
    })
  }

  attachNewPokeObj = (pokeObj) => {
    this.setState({
      // pokemons: { pokeObj, ...this.state.pokemons } //my mistake. It has to be an array
      pokemons: [pokeObj, ...this.state.pokemons]
    })
  }

  render() {
    let filteredSearchPokemons = []
    filteredSearchPokemons = this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.searchText))
    // can we make a new state key that is the above filteredobj^ ? and pass that in?

    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm attachNewPokeObj={this.attachNewPokeObj} />
        <br />
        <Search handleSearch={this.handleSearch} />
        <br />
        <PokemonCollection pokemons={filteredSearchPokemons} />
      </Container>
    )
  }
}

export default PokemonPage
