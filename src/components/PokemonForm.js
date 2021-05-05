import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {

  // Form should have its own state!!!!!!!!!!!!!!!!!!!!!!!!!!

  constructor() {
    super()
    this.state = {
      name: "",
      hp: "",
      frontUrl: "",
      backUrl: ""
    }
  }

  // handleInput
  //or pass in (e) and then : e.target.value ?
  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  // *So when we invoke this function below, handleInput(event), that 'event' is this 'event' parameter here.


  handleSubmit = (event) => {
    event.preventDefault()
    // Contains a new pokemon obj
    let newPokemon = {
      name: this.state.name,
      hp: parseInt(this.state.hp, 10),
      sprites: {
        front: this.state.frontUrl,
        back: this.state.backUrl
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
            frontUrl: "",
            backUrl: ""
          }
        });
      })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={(event) => this.handleSubmit(event)} onChange={(event) => this.handleInput(event)} >
          {/* Good practice by passing in both arguments! It will still run fine without passing explicitly and leave them empty */}
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" value={this.state.name} />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" value={this.state.hp} />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" value={this.state.front} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" value={this.state.back} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div >
    )
  }
}

export default PokemonForm
// onChange={(event) => this.handleName(event.target.value)}
// onChange={(event) => this.handleHp(event.target.value)}
// onChange={(event) => this.handleFront(event.target.value)} 
// onChange={(event) => this.handleBack(event.target.value)} 
