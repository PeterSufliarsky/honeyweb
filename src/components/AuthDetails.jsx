import React, { Component } from 'react'

class AuthDetails extends Component {

    state = {
        authTries: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/auth')
        .then(res => res.json())
        .then((data) => {
            this.setState({ authTries: data })
        })
        .catch(console.log)
    }

    render() {
        if (this.state.authTries.length) {
            return (
                <div className="details-auth">
                    <p className="details-section-title">Authentication attempts:</p>
                    <p>{JSON.stringify(this.state.authTries)}</p>
                </div>
            )
        } else {
            return null;
        }
    }
};

export default AuthDetails;