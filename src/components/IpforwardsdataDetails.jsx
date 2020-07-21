import React, { Component } from 'react'

class IpforwardsdataDetails extends Component {

    state = {
        ipforwardsdata: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/ipforwardsdata')
        .then(res => res.json())
        .then((data) => {
            this.setState({ ipforwardsdata: data })
        })
        .catch(console.log)
    }

    render() {
        if (this.state.ipforwardsdata.length) {
            return (
                <div className="App-ipforwardsdatadetails">
                    <p className="details-section-title">IP forwards data:</p>
                    <p>{JSON.stringify(this.state.ipforwardsdata)}</p>
                </div>
            )
        } else {
            return null;
        }
    }
};

export default IpforwardsdataDetails;