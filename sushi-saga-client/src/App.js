import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  constructor(){
    super()
    this.state= {
      sushiAll:[],
      sushiIndex:0
    }
  }
  //fetch sushi
  componentDidMount() {
   this.handleFetch()
  }

 handleFetch = () => {
  fetch(API)
  .then(response => response.json())
  .then(data => {
 
    this.setSushi(data)
  
  })
}


  //fixes limit 4
  setSushi = (data) => {
    console.log(data)
    let sushis =[]
    let counter = 0
    for (let item in data) {
      if(item.id === this.sushiIndex && counter!== 4){
        sushis.push(data[item]) 
        this.setState({sushiIndex: this.state.sushiIndex++})
        counter++
      }
     
    }
    this.setState({sushiAll:sushis})
  }

  handleEatSushi = (sushi) => {
    console.log(sushi)
    sushi.eaten = true;
    console.log(sushi)
 
    return sushi
  }

  render() {
    return (
      <div className="app">
        <SushiContainer sushiAll={this.state.sushiAll} handleEatSushi={this.handleEatSushi}  />
        <Table sushi={this.state.sushiAll}  />
      </div>
    );
  }
}

export default App;