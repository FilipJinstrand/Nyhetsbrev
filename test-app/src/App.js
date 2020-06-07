import React from 'react';
import './App.css';
import SubscribeForm from './SubscribeForm';
import AccountPage from './AccountPage';
import LogInForm from './LogInForm';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: localStorage.getItem("userId"),
            createAccount: false
        }
    }


    createAcc = () => {
        this.setState({ createAccount: true })
    }

    loggedIn = (id) => {
        this.setState({ id: id })
        localStorage.setItem("userId", id);
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        if (this.state.id !== null) {
            return (<AccountPage />);
        }
        else if (this.state.createAccount) {
            return (<SubscribeForm logIn={this.loggedIn} />);
        }
        else {
            return (<LogInForm create={this.createAcc} logIn={this.loggedIn} />)
        }
    }

    render() {
        return (
            <div>
                {this.checkIfLoggedIn()}
            </div>
        );
    }

}

export default App;
