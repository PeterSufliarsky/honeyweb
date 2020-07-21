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

    render() {
        if (this.state.downloads.length) {
            return (
                    <div className="details-auth">
                        <p className="details-section-title">Downloads:</p>
                        <p>{JSON.stringify(this.state.downloads)}</p>
                    </div>
            )
        } else {
            return null;
        }
    }
};

export default DownloadsDetails;