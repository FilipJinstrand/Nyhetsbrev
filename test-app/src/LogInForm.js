import React, { Component } from 'react'

export class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { userName: '', password: '' }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    logIn = (e) => {
        e.preventDefault();

        var user = {
            userName: this.state.userName,
            password: this.state.password
        }

        fetch('http://localhost:4000/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.props.logIn(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    createAccount = () => {
        this.props.create();
    }

    render() {
        return (
            <div>
                <form>
                    <label>User name:</label><br />
                    <input
                        type="text"
                        name="userName"
                        value={this.state.userName}
                        onChange={this.handleChange.bind(this)}
                    /><br />
                    <label>Password:</label><br />
                    <input
                        type="text"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange.bind(this)}
                    /><br />
                    <input type="submit" value="Log in" onClick={this.logIn} /><br />
                    <label>Need an account?</label>
                    <input type="submit" value="Create Account" onClick={this.createAccount} />
                </form>
            </div>
        )
    }
}

export default LogInForm
