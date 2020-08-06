import React, { Component } from 'react'

class DownloadsDetails extends Component {

    state = {
        downloads: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/downloads')
        .then(res => res.json())
        .then((data) => {
            this.setState({ downloads: data })
        })
        .catch(console.log)
    }

    getTime = timestamp => {
        return new Date(timestamp).toLocaleTimeString();
    }

    render() {
        if (this.state.downloads.length) {
            return (
                    <div className="details-auth">
                        <p className="details-section-title">Downloads:</p>
                        <table className="details-section-table">
                            <thead>
                                <tr>
                                    <th className="table-column-time">Time</th>
                                    <th>SHA256 hash</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.downloads.map((download) =>
                                        <tr>
                                            <td className="table-column-time">{this.getTime(download.timestamp)}</td>
                                            <td>{download.shasum}</td>
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

export default DownloadsDetails;