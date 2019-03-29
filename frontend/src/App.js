import React, { Component } from "react";
import logo from "./img/logo.svg";
import "./css/App.css";
import Chart from "./components/Canvas";
import Table from "./components/Table";
import Upload from "./components/Upload";

class App extends Component {
  constructor() {
    super();
    this.state = {
      tableData: undefined,
      barChart: undefined,
      lineChart: undefined
     };
  }

  //Called when user uploads CSV. 
  onUploadCSV = (e) => {
    this.setState({
      tableData : e.tableData,
      barChart : e.barChart,
      lineChart : e.lineChart
    })
  }

  render() {
    const isData = this.state.tableData;
    if (isData !== undefined)
    {
      return (
        <div className="App">
          <div className="App-header">
            <div className="Name">Author: Conor O'Hanlon (Not finished)</div>
          </div>
          <div className="container-fluid">
            <div className="row">     
              <div className="col-md-6">
                <div className="row">
                    <div className="col-md-12">
                      <h3>Demo Table</h3>
                      <Table data= {this.state.tableData}/>
                    </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row"> 
                  <div className="col-md-12">    
                   <Chart data={this.state.barChart} />
                  </div>
                </div>
                <div className="row"> 
                  <div className="col-md-12">  
                   <Chart data={this.state.lineChart} />
                  </div>
                </div>
               </div>
            </div>
          </div>
        </div>
      );
    }
    else
    {
      return (
        <div className="App">
          <div className="App-header">
             <div className="Name">Author: Conor O'Hanlon (Not finished)</div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-12 offset-md-5">
                <Upload data={this.onUploadCSV.bind(this)} / >
              </div>
            </div>
          </div>
        </div>
        )
    }
  }
}

export default App;
