import React, {Component} from 'react';

import Frame from './Frame.js';

// ver esto require Server from 'json-server';
const axios = require('axios');
class Consultas {

    logout(token) {
        const salirStr = {
            "jsonrpc": "2.0",
            "method": "user.logout",
            "params": {
            },
            "id": 1,
            "auth": token
        }
        const salirJsn = JSON.stringify(salirStr);
                
        return salirStr;
    }

    getProblemas(token) {
        
        const state = {
            consulToken: token,
            problemStr: {
                "jsonrpc": "2.0",
                "method": "problem.get",
                "params": {
                    "output": ["eventid", "severity", "clock", "name", "acknowledged"]
                },            
                "auth": token,
                "id": 1
            }    
        }
        
        var problemJsn = JSON.stringify(state.problemStr);        
        
        return problemJsn;
    }
    getEventos(token, evento) {
        const state = {
            consulToken: token,
            eventoStr:{
                "jsonrpc": "2.0",
                "method": "event.get",
                "params": {
                    "filter": {"eventid" : evento},
                    "output":["eventid", "objectid"]
                },             
                "auth": token,
                "id": 1
            }
        }
        //debugger;
        return state.eventoStr;
    }
    
    getTriggers(token, triggerids) {
        const state = {
            consulToken: token,
            triggerStr: {
                "jsonrpc": "2.0",
                "method": "trigger.get",
                "params": {
                    "triggerids" : triggerids,
                    "output":["triggerid","correlation_tag"],
                    "selectFunctions": "extend",
                    "selectHosts": {"output": "host"}            
                },                
                "auth": token,
                "id": 1                
            }
        }
        //debugger;
        return state.triggerStr;
    }       
}
export default Consultas;