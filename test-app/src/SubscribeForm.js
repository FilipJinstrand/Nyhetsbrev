import React, { Component } from 'react'

export class SubscribeForm extends Component {

    constructor(props) {
        super(props);
        this.state = { id: Date.now(), firstName: '', email: '', password: '', sub: false }
    }

    updateName = (e) => {
        this.setState({ firstName: e.target.value })
    }

    updateEmail = (e) => {
        this.setState({ email: e.target.value })
    }
    updatePassword = (e) => {
        this.setState({ password: e.target.value })
    }

    updateCheck = () => {
        this.setState({ sub: !this.state.sub })
    }

    submitUser = (e) => {
        e.preventDefault();
        this.setState({ id: Date.now() })
        console.log(this.state);

        var user = {
            id: this.state.id,
            userName: this.state.firstName,
            email: this.state.email,
            password: this.state.password,
            subscribed: this.state.sub
        }

        this.saveUserToDb(user);
    }


    saveUserToDb = (user) => {
        fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.props.logIn(data.id); // HÄR
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        return (
            <div>
                <form>
                    <label>First name:</label><br />
                    <input type="text" value={this.state.firstName} onChange={this.updateName}></input><br />
                    <label>Email:</label><br />
                    <input type="text" value={this.state.email} onChange={this.updateEmail}></input><br />
                    <label>Password:</label><br />
                    <input type="text" value={this.state.password} onChange={this.updatePassword}></input><br />
                    <label>Subscribe to Newsletter: </label>
                    <input type="checkbox" defaultChecked={this.state.sub} onChange={this.updateCheck}></input><br />
                    <input type="submit" value="Submit" onClick={this.submitUser} />
                </form>
            </div>
        )
    }
}

export default SubscribeForm
