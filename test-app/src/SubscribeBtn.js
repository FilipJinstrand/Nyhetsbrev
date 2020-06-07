import React, { Component } from 'react'

export class SubscribeBtn extends Component {
    constructor(props) {
        super(props);
        this.state = { subscribed: '' }
    }

    componentDidMount = () => {
        fetch('http://localhost:4000/users')
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                console.log(localStorage.getItem("userId"));
                var person = data.find(x => x.id.toString() === localStorage.getItem("userId"));
                this.setState({ subscribed: person.subscribed })
            });
    }

    updateUser = (e) => {
        e.preventDefault();
        var id = this.props.personId;

        const data = { subscribed: !this.state.subscribed };

        fetch(`http://localhost:4000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        this.setState({ subscribed: !this.state.subscribed })
    }

    checkIfSubbed = () => {

        if (this.state.subscribed === false) {
            return (<button onClick={this.updateUser}>Subscribe</button>)
        }
        else if (this.state.subscribed === true) {
            return (<button onClick={this.updateUser}>Unsubscribe</button>)
        }
        else {
            console.log("sub is null")
        }
    }
    render() {
        return (
            <div>
                {this.checkIfSubbed()}
            </div>
        )
    }
}

export default SubscribeBtn
