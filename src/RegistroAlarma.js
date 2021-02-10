import React, {Component} from 'react';

//90 Frame
export default class RegistroAlarma {
    
    constructor() {
            this.state= {
            Severity:"",
            Time:"",
            RecoveryTime:"",
            Status:"PROBLEM",
            Host:"",
            Problem:"",
            Duration:"",
            Ack:"",
            Actions:"",
            Tags:""
        }
    }

    setState(key, value) {
        this.state[key]= value;
        

    }
    /*render() {
        return (
            <div></div>
        )
    }*/
}