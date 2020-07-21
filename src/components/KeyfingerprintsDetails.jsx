import React, { Component } from 'react'

class KeyfingerprintsDetails extends Component {

    state = {
        keyfingerprints: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/keyfingerprints')
        .then(res => res.json())
        .then((data) => {
            this.setState({ keyfingerprints: data })
        })
        .catch(console.log)
    }

    render() {
        if (this.state.keyfingerprints.length) {
            return (
                <div className="details-keyfingerprints">
                    <p className="details-section-title">Key fingerprints:</p>
                    <p>{JSON.stringify(this.state.keyfingerprints)}</p>
                </div>
            )
        } else {
            return null;
        }
    }
};

export default KeyfingerprintsDetails;