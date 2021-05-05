import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {

  // Form should have its own state!!!!!!!!!!!!!!!!!!!!!!!!!!

  constructor() {
    super()
    this.state = {
      name: "",
      hp: "",
      sprites: {
        front: "",
        back: ""
      }
    }
  }


  // Must write a callback method for 'EACH' OF THE INPUTS, separately
  handleName = (newName) => {
    this.setState({
      name: newName
    })
  }
  // *So when we invoke this function, handleName(event.target.value), that 'event.target.value' is the 'newName'argument here.

  handleHp = (newHp) => {
    this.setState({
      hp: newHp
    })
  }

  handleFront = (newFront) => {
    this.setState({
      sprites: { ...this.state.sprites, front: newFront }
    })
  }

  handleBack = (newBack) => {
    this.setState({
      sprites: { ...this.state.sprites, back: newBack }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // Contains a new pokemon obj
    let newPokemon = {
      name: this.state.name,
      hp: parseInt(this.state.hp, 10),
      sprites: {
        front: this.state.sprites.front,
        back: this.state.sprites.back
      }
    }
    // console.log(newPokemon)
    // Make a fetch POST request
    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPokemon),
    })
      .then((r) => r.json())
      .then(newPokemonObj => {
        console.log(newPokemonObj)
        this.props.attachNewPokeObj(newPokemonObj)

        // at the end of second .then, we need to reset the form to the initial state
        this.setState({
          name: "",
          hp: "",
          sprites: {
            front: "",
            back: ""
          }
        });
      })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={(event) => this.handleSubmit(event)}>
          {/* MUST PASS IN EVENT in both arguments!!! */}
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={(event) => this.handleName(event.target.value)} value={this.state.name} />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={(event) => this.handleHp(event.target.value)} value={this.state.hp} />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={(event) => this.handleFront(event.target.value)} value={this.state.sprites.front} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={(event) => this.handleBack(event.target.value)} value={this.state.sprites.back} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
