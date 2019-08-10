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
      sushiIndex:1,
      cash:50,
      warning: null
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
   return this.setSushi(data)
  })
}


  // limit 4
  setSushi = (data) => {
    let sushis =[]
    let counter = 0
      data.map(item => {
        if(item.id === this.state.sushiIndex && counter!== 4){
          sushis.push(item) 
          let newIndex = this.state.sushiIndex +1
          this.setState({sushiIndex: newIndex})
          counter++
        }
      })
      let newIndex = this.state.sushiIndex +1
      this.setState({sushiIndex: newIndex})
      this.setState({sushiAll:sushis})
  }
 
//inspired by phillip 
  handleEatSushi = (sushi) => {
    if(this.state.cash < sushi.price){
      this.handleWarning()
    }else {
    let index = this.state.sushiAll.indexOf(sushi)
    let arr = this.state.sushiAll
    sushi.eaten = true; 
    arr[index] = sushi
    this.setState({sushiAll: arr})
    let newCash = this.state.cash - sushi.price
    this.setState({cash: newCash})
    }
  }
  handleWarning = () =>{
    this.setState({warning: 'Sorry you cant afford this sushi!'})
  }
  

  render() {
    return (
      <div className="app">
        <SushiContainer sushiAll={this.state.sushiAll} handleEatSushi={this.handleEatSushi} handleMore={this.handleFetch} />
        <Table cash={this.state.cash} warning={this.state.warning} sushiAll={this.state.sushiAll}  />
      </div>
    );
  }
}

export default App;