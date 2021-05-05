import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  constructor() {
    super()
    this.state = {
      imgToggle: false
    }
  }

  handleImg = () => {
    this.setState({
      imgToggle: !this.state.imgToggle
    })
  }

  render() {
    // console.log(this.props.pokemon.sprites.front)
    let imgurl = ""
    if (this.state.imgToggle === false) {
      imgurl = this.props.pokemon.sprites.front
    } else if (this.state.imgToggle === true) {
      imgurl = this.props.pokemon.sprites.back
    }

    // console.log(imgurl)
    return (
      <Card>
        <div>
          <div onClick={() => this.handleImg()} className="image">
            <img src={imgurl} alt={this.props.pokemon.name} />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.hp}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
