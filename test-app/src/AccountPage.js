import React, { Component } from 'react'
import SubscribeBtn from './SubscribeBtn';
import LogOutBtn from './LogOutBtn';

export class AccountPage extends Component {
    constructor(props) {
        super(props);
        this.state = { id: null, userName: '' }
    }

    componentDidMount = () => {
        fetch('http://localhost:4000/users')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                console.log(localStorage.getItem("userId"));
                var person = data.find(x => x.id.toString() === localStorage.getItem("userId"));
                this.setState({ id: person.id })
                this.setState({ userName: person.userName });
            });
    }


    render() {
        return (
            <div>
                <h3>Welcome {this.state.userName}</h3>
                <SubscribeBtn personId={this.state.id} />
                <LogOutBtn />
            </div>
        )
    }
}

export default AccountPage
