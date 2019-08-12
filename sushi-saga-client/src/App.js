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
      sushiIndex: 1,
      cash: 50,
      warning: null
    }
  }

  componentDidMount() {
    this.handleFetch()
  }

  handleFetch = () => {
    fetch(API)
      .then(resp => resp.json())
      .then(data => { return this.setSushi(data) })
  }

  //only geting 4 sushi
  setSushi = data => {
    let sushis = []
    let counter = 0
    data.map(item => {
      if (item.id === this.state.sushiIndex && counter !== 4) {
        sushis.push(item)
        let newIndex = this.state.sushiIndex + 1
        this.setState({ sushiIndex: newIndex })
        counter++
      }
    })
    let newIndex = this.state.sushiIndex + 1
    this.setState({
      allSushi: sushis,
      sushiIndex: newIndex
    })
  }

  handleEatSushi = sushi => {
    if (this.state.cash < sushi.price) {
      this.handleWarning()
    } else {
      let index = this.state.allSushi.indexOf(sushi)
      let arr = this.state.allSushi
      sushi.eaten = true
      arr[index] = sushi
      let newCash = this.state.cash - sushi.price
      this.setState({
        cash: newCash,
        allSushi: arr
      })
    }
  }

  handleWarning = () => {
    this.setState({ warning: 'Sorry, you can\'t afford this sushi!' })
  }

  render() {
    return (
      <div className="app">

        <SushiContainer
          allSushi={this.state.allSushi}
          handleEatSushi={this.handleEatSushi}
          handleMore={this.handleFetch}
        />

        <Table
          cash={this.state.cash}
          warning={this.state.warning}
          allSushi={this.state.allSushi}
        />

      </div>
    );
  }
}

export default App;