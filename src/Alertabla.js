import axios from 'axios';
import React, {Component} from 'react';

class Alertabla extends React.Component {
    
    /*constructor() {
        super();
    }*/
    state = {
        json: [
            {/*
                A: "axios",
                B : "babel",
                C: "console"*/
            }
        ]
    }
    

    render() {
        return (
            <div>

                <table className="tablaAlarmas">
                    <thead>
                        <th></th>
                        <th>Severity</th>
                        <th>Time</th>
                        <th>RecoveryTime</th>
                        <th>Status</th>
                        <th>Host</th>
                        <th>Problem</th>
                        <th>Duration</th>
                        <th>Ack</th>
                        <th>Actions</th>
                        <th>Tags</th>
                    </thead>

                    <tbody >
                        {this.state.json.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data.Severity}</td>
                                    <td>{data.Time}</td>
                                    <td>{data.RecoveryTime}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        )
    }
}

export default Alertabla;