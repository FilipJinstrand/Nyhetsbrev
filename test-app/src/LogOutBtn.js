import React, { Component } from 'react'

export class LogOutBtn extends Component {

    handleChange = (e) => {
        localStorage.clear();
        window.location.reload();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleChange}>Log out</button>
            </div>
        )
    }
}

export default LogOutBtn
