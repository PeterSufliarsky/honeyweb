import React, { Component } from 'react'

class IpforwardsDetails extends Component {

    state = {
        ipforwards: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/ipforwards')
        .then(res => res.json())
        .then((data) => {
            this.setState({ ipforwards: data })
        })
        .catch(console.log)
    }

    render() {
        if (this.state.ipforwards.length) {
            return (
                <div className="App-ipforwardsdetails">
                    <p className="details-section-title">IP forwards:</p>
                    <p>{JSON.stringify(this.state.ipforwards)}</p>
                </div>
            )
        } else {
            return null;
        }
    }
};

export default IpforwardsDetails;