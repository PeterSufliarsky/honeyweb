import React, { Component } from 'react'

class AuthDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authTries: []
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/auth')
        .then(res => res.json())
        .then((data) => {
            this.setState({ authTries: data })
        })
        .catch(console.log)
    }

    getTime = timestamp => {
        return new Date(timestamp).toLocaleTimeString();
    }

    render() {
        if (this.state.authTries.length) {
            return (
                <div className="details-auth">
                    <p className="details-section-title">Authentication attempts:</p>
                    <table className="details-section-table">
                        <thead>
                            <tr>
                                <th className="table-column-time">Time</th>
                                <th className="table-column-username">Username</th>
                                <th className="table-column-password">Password</th>
                                <th className="table-column-success">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.authTries.map((auth) =>
                                    <tr>
                                        <td className="table-column-time">{this.getTime(auth.timestamp)}</td>
                                        <td className="table-column-username">{auth.username}</td>
                                        <td className="table-column-password">{auth.password}</td>
                                        <td className="table-column-success">{auth.success}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return null;
        }
    }
};

export default AuthDetails;