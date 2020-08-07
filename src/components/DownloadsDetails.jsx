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
                                    <th>URL</th>
                                    <th>File name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.downloads.map((download) =>
                                        <tr key={download.id}>
                                            <td className="table-column-time">{this.getTime(download.timestamp)}</td>
                                            <td>
                                                <a href={download.url}>{download.url}</a>
                                            </td>
                                            <td>
                                                <a href={process.env.REACT_APP_API_HOST + '/downloads/' + download.shasum}>{download.shasum}</a>
                                            </td>
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
