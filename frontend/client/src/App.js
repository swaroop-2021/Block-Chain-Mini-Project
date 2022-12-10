import React, { Component } from "react";
import Evidence from "./contracts/Evidence.json";
import User from "./contracts/userStorage.json";
import getWeb3 from "./getWeb3";

import { Link } from 'react-router-dom'
import {BrowserRouter, Route,Routes } from 'react-router-dom';
import { Createcase } from './components/create_case';
import { Getcase } from './components/get_case';
import { Getevidence } from "./components/get_evidence";
import { Insertevidence } from "./components/insert_evidence";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null ,caseId:1 , message:[] , memory: "" , evidenceId:1};
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Evidence.networks[networkId];
      const instance = new web3.eth.Contract(
        Evidence.abi,
        // User.abi,
        deployedNetwork && deployedNetwork.address,
        );
        
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, contract: instance });
        // console.log(this.state);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const {contract } = this.state;
    const response = await contract.methods.getCaseInfo(this.state.caseId).call();
    console.log(response);
    // Update state with the result.
    this.setState({ message: response});
  };

  createCase = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    const createcase=await contract.methods.createCase().send({ from: accounts[0] });
    console.log(createcase);
  
    this.setState({ message:createcase});
  };


  handleChange=(e)=>{
    console.log(e);
    this.setState({caseId : e.target.value});
  }
  abcd=()=>{
    console.log(this.state);
  }
  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    else
    return (
        
      <BrowserRouter>
            {this.abcd()}
            <nav>
              <Link className="route" to={'/Createcase'}  >Createcase</Link>
              <Link className="route" to={'/Getcase'} >Getcase</Link>
              <Link className="route" to={'/Getevidence'} >Getevidence</Link>
              <Link className="route" to={'/Insertevidence'} >Insertevidence</Link>
            </nav>
            <Routes>
                <Route path='Createcase' element={<Createcase state={this.state}/>} />
                <Route path='Getcase' element={<Getcase state={this.state}/>} />
                <Route path='Getevidence' element={<Getevidence state={this.state}/>} />
                <Route path='Insertevidence' element={<Insertevidence state={this.state}/>} />
            </Routes>
        </BrowserRouter>
        
);
  }
}

export default App;
