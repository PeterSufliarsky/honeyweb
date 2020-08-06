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

    getTime = timestamp => {
        return new Date(timestamp).toLocaleTimeString();
    }

    render() {
        if (this.state.ipforwardsdata.length) {
            return (
                <div className="App-ipforwardsdatadetails">
                    <p className="details-section-title">IP forwards data:</p>
                    <table className="details-section-table">
                        <thead>
                            <tr>
                                <th className="table-column-time">Time</th>
                                <th>Destination IP</th>
                                <th>Destination port</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ipforwardsdata.map((ipforwarddata) =>
                                    <tr>
                                        <td className="table-column-time">{this.getTime(ipforwarddata.timestamp)}</td>
                                        <td>{ipforwarddata.dstIp}</td>
                                        <td>{ipforwarddata.dstPort}</td>
                                        <td>{ipforwarddata.data}</td>
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

export default IpforwardsdataDetails;