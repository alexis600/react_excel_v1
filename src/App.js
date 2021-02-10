import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Frame from './Frame';

import login from './login.json'

import Alertabla from './Alertabla'

import testabla from './testabla'
import "bootstrap/dist/css/bootstrap.min.css"
const axios = require('axios');



class App extends React.Component {
  
  /*
  conectarse = ()=> {
    var usuario = "api";
    var contraseña = "zabbix";
  
  
    
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    
    var info = {
      "jsonrpc": "2.0",
      "method": "asdt",
      "params": {
          "user": "Admin",
          "password": "zabbix"
      },
      "id": 1
    }
  
    axios.post("http://192.168.177.150/zabbix/api_jsonrpc.php", login, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res.data.result);

    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
    
  }*/
  
  
  render(){
      return (
        <div className="App">
          <h1> Hello World</h1>
          
          <Frame />

          <Alertabla className="tablaAlar"/>

          <testabla />
          
        </div>
      )
      }
        
      
  
}

export default App;
