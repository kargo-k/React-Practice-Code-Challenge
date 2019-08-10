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
      sushiIndex:1
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
    let sushis =[]
    let counter = 0

    for (let item in data) {
      if(data[item].id === this.state.sushiIndex && counter!== 4){
        sushis.push(data[item]) 
        let newIndex = this.state.sushiIndex +1
        this.setState({sushiIndex: newIndex})
        counter++
      }
     
    }
    let newIndex = this.state.sushiIndex +1
    this.setState({sushiIndex: newIndex})
    this.setState({sushiAll:sushis})
    console.log(this.state.sushiAll)
    console.log(this.state.sushiIndex)
  }
 
//inspired by phillip 
  handleEatSushi = (sushi) => {
    let index = this.state.sushiAll.indexOf(sushi)
    let arr = this.state.sushiAll
    sushi.eaten = true;
    arr[index] = sushi
    this.setState(arr)
    return sushi
  }
  

  render() {
    return (
      <div className="app">
        <SushiContainer sushiAll={this.state.sushiAll} handleEatSushi={this.handleEatSushi} handleMore={this.handleFetch} />
        <Table sushi={this.state.sushiAll}  />
      </div>
    );
  }
}

export default App;