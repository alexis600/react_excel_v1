import React, {Component} from 'react';

import loginjson from './login.json'

import Consultas from './Consultas.js';
import Alertabla from './Alertabla';

import App from './App'
import RegistroAlarma from './RegistroAlarma';

const axios = require('axios');
const  moment = require('moment');

export default class Frame extends React.Component {

    constructor() {
        super();
        this.state = {
            login: true,
            axiosConfig: { headers: {"Content-Type": "application/json"}},
            token: ""
            
        }
    }

    changeState = () => {
        
        this.setState({            
          login: !this.state.login        
        })        
        this.loguear();
    } 

    async loguear () {
        var Consulta = new Consultas();
        if (this.state.login) { 
                await axios.post("http://192.168.177.150/zabbix/api_jsonrpc.php", 
                loginjson, this.state.axiosConfig)
                
                .then(async(res) => {
                    console.log("LOGIN RECEIVED: ", res.data.result); 
                    var tok = res.data.result;
                                    
                    this.setState ({token : tok});
                                        
                    var fila = await this.loadTable();
                    console.log("a ver si aca", {fila});
                    //debugger
                    
                })
            .catch ((err) => {
                console.log("AXIOS ERROR LOGIN: ", err);
                })
            
        }
        else {
            try {
                const logoutJson = Consulta.logout(this.state.token);
                var res = await axios.post("http://192.168.177.150/zabbix/api_jsonrpc.php", 
                logoutJson, this.state.axiosConfig)
            //.then(res => {
                console.log("LOGOUT RECEIVED: ", res.data)
            } 
            catch (error) {
                console.log("AXIOS ERROR LOGOUT: ", error);
            }/*
            const logoutJson = Consulta.logout(this.state.token);
            var res = await axios.post("http://192.168.177.150/zabbix/api_jsonrpc.php", 
            logoutJson, this.state.axiosConfig)
            //.then(res => {
                console.log("LOGOUT RECEIVED: ", res.data)
            //})
            .catch((err) => {
                console.log("AXIOS ERROR LOGOUT: ", err);
            })*/
        }
    }
    // pruebo meter parametro la fila asi no la declaro 2 veces
    async loadTable(){
        const tabla = new Alertabla();
        var fila = new RegistroAlarma();
        if (!this.state.login) { // VER ESTO XQ EL BOTON GET ALARMA DA EXCEPCION PERO LLAMARLO DESDE LOGUEAR NO
            var Consulta = new Consultas();
            const problemas = Consulta.getProblemas(this.state.token);                                            
            fila = await this.problemsBD(problemas, Consulta);
            //debugger;
            tabla.setState({json:fila});
            return fila;
        }
        
    }
    
    async problemsBD (problemas, Consulta)  { 
        
        const postProblems = await axios.post("http://192.168.177.150/zabbix/api_jsonrpc.php", 
            problemas, this.state.axiosConfig);
                
        return await this.metodoProblems(postProblems, Consulta);
                
    }

    async metodoProblems(postProblems, Consulta) {
        
        var that = this // closure ambito for each es diferente al ambito 
        
        var fila = new RegistroAlarma();
        console.log("GET PROBLEMAS RECEIVED: ", postProblems.data);                    
        var alarmas = postProblems.data.result;
        for (var i = 0; i < alarmas.length; i++) {    
            var alarma = alarmas[i];
            switch(alarma.severity) {
                case "0": 
                    alarma.severity = "Not classified";
                    break;
                case "1":                                 
                    alarma.severity = "Information";
                    break;
                case "2": 
                    alarma.severity = "Warning";
                    break;
                case "3": 
                    alarma.severity = "Average";
                    break;
                case "4":                                 
                    alarma.severity = "High";
                    break;
                case "5":                                 
                    alarma.severity = "Disaster";
                    break;
                default:
                    alarma.severity = "Defectooooooooooo";
            }
            fila.setState("Severity", alarma.severity);

            var eventid = alarma.eventid;
            
            var hora  = new Date(alarma.clock * 1000);
            var horaZbx = moment(hora).format("YYYY-MM-DD hh:mm:ss");
            fila.setState("Time", horaZbx);
            

            // Para calcular tiempo de duración
            //var ya = Date.now();
            //console.log(new Date(ya * 1000).getTime());
            var now = moment(new Date());

            //var inicio = hora.getTime();
            //var diffEnMilisegundos = ya - inicio;
            //var segundos = diffEnMilisegundos/(1000);
            var now = moment(new Date());
            //var date = moment(new Date(hora));
            //Mon Feb 08 2021 23:49:37 GMT-0300
            //console.log(moment(hora).format("hh:mm:ss"));
            //console.log(moment(hora, "mm", true).toNow());
            var duracion = now.from(hora, true)
            //console.log(moment().startOf(hora).fromNow())
            //MMMM Do YYYY, h:mm:ss a
            //console.log(moment.duration(now.diff(hora)))


            fila.setState("Duration", duracion);
            debugger;
            
            fila.setState("Problem", alarma.name);
            (alarma.acknowledged)? fila.setState("Ack", "Yes"): fila.setState("Ack", "No");
                        
            const eventos = Consulta.getEventos(this.state.token, eventid);                        
            var idobj = await that.eventosBD(eventos);
            
            const triggers = Consulta.getTriggers(this.state.token, idobj);
            var host = await that.triggersBD(triggers);
                    
            fila.setState("Host", host)
                                     
        }
            
         
        debugger;
        return fila;  
    }

    async eventosBD (eventos){                
        const postEvents = await axios.post("http://192.168.177.150/zabbix/api_jsonrpc.php",
            eventos, this.state.axiosConfig)
            
        return postEvents.data.result[0].objectid;
           
    }
    async triggersBD (objetos) {
        const postTriggers = await axios.post("http://192.168.177.150/zabbix/api_jsonrpc.php",
            objetos, this.state.axiosConfig)
        
            return postTriggers.data.result[0].hosts[0].host;

    }

    // ver xq el boton getalarmas onClick da excepcion en this.loadtable
    render() {
        const { login } = this.state;
        return (
          <div className="App-body">
            <button
              type="button"
              className={login ? "btn-primary" : "btn-danger"}
              onClick={this.changeState} >
              {login ? " Login" : " Log Out"}
            </button>
           
            <button id="buttonGet" 
            type="button" disabled={this.state.login}
            onClick={this.loadTable} >
                Get alarms
            
            </button>
          </div>
        );
      }
}