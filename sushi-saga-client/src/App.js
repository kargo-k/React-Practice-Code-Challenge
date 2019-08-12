import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3001/sushis"

class App extends Component {
  constructor() {
    super()
    this.state = {
      allSushi: [],
      sushiIndex: 0,
      cash: 50,
      warning: null
    }
  }

  componentDidMount() {
    return fetch(API)
      .then(resp => resp.json())
      .then(data => {
        data.map(sushi => sushi['eaten'] = false)
        this.setState({ allSushi: data })
      })
  }

  //only geting 4 sushi
  getSushi = () => {
    let sushiArray = this.state.allSushi.slice(this.state.sushiIndex, this.state.sushiIndex + 4)
    return sushiArray
  }

  handleMoreButton = () => {
    this.setState({ sushiIndex: this.state.sushiIndex + 4 })
  }

  handleEatSushi = onSushi => {
    let cash = this.state.cash
    if (this.state.cash < onSushi.price) {
      this.handleWarning()
    } else {
      let sushiArray = this.state.allSushi.map(sushi => {
        if (sushi.id === onSushi.id) {
          sushi.eaten = true
          cash -= sushi.price
          return sushi
        }
        else {
          return sushi
        }
      })
      this.setState({ allSushi: sushiArray, cash: cash })
    }
  }

  getEatenSushi = () => {
    return this.state.allSushi.filter(sushi => sushi.eaten)
  }

  handleWarning = () => {
    this.setState({ warning: 'Sorry, you can\'t afford this sushi!' })
    console.log('warning!')
  }

  render() {
    return (
      <div className="app">

        <SushiContainer
          allSushi={this.getSushi()}
          handleEatSushi={this.handleEatSushi}
          handleMore={this.handleMoreButton}
        />

        <Table
          cash={this.state.cash}
          warning={this.state.warning}
          sushis={this.getEatenSushi()}
        />

      </div>
    );
  }
}

export default App;