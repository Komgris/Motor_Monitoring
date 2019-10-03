import React, { Component } from 'react'
import './Remote.css'

export default class Remote extends Component {
    constructor(props) {
        super(props);

        this.state ={
            remoteStatus : "REMOTE"
        };
    }
    render() {
        return (
            <div class ="border-remote">
                {this.state.remoteStatus}
            </div>
        )
    }
}
