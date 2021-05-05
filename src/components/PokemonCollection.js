import React from 'react'
import PokemonCard from './PokemonCard'
import { Card } from 'semantic-ui-react'

class PokemonCollection extends React.Component {
  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.props.pokemons.map(pokeCard => <PokemonCard pokemon={pokeCard} />)}

        {/* No need to write { } after the arrow here, o.w get an error! */}

      </Card.Group>
    )
  }
}

export default PokemonCollection
