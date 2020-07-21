import React, { Component } from 'react'

class TtylogDetails extends Component {

    state = {
        ttylog: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/ttylog')
        .then(res => res.json())
        .then((data) => {
            this.setState({ ttylog: data })
        })
        .catch(console.log)
    }

    render() {
        if (this.state.ttylog.length) {
            return (
                <div className="App-ttylogdetails">
                    <p className="details-section-title">TTY log:</p>
                    <p>{JSON.stringify(this.state.ttylog)}</p>
                </div>
            )
        } else {
            return null;
        }
    }
};

export default TtylogDetails;