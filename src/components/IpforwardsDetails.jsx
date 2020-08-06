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

    getTime = timestamp => {
        return new Date(timestamp).toLocaleTimeString();
    }

    render() {
        if (this.state.ipforwards.length) {
            return (
                <div className="App-ipforwardsdetails">
                    <p className="details-section-title">IP forwards:</p>
                    <table className="details-section-table">
                        <thead>
                            <tr>
                                <th className="table-column-time">Time</th>
                                <th>Destination IP</th>
                                <th>Destination port</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ipforwards.map((ipforward) =>
                                    <tr>
                                        <td className="table-column-time">{this.getTime(ipforward.timestamp)}</td>
                                        <td>{ipforward.dstIp}</td>
                                        <td>{ipforward.dstPort}</td>
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

export default IpforwardsDetails;