import React, { Component } from 'react'
import AuthDetails from './AuthDetails'
import DownloadsDetails from './DownloadsDetails'
import IpforwardsDetails from './IpforwardsDetails'
import IpforwardsdataDetails from './IpforwardsdataDetails'
import KeyfingerprintsDetails from './KeyfingerprintsDetails'
import TtylogDetails from './TtylogDetails'

class SessionDetails extends Component {
    render() {
        return (
            <div className="session-details">
                <AuthDetails session={this.props.data.id }/>
                <KeyfingerprintsDetails session={this.props.data.id} />
                <IpforwardsDetails session={this.props.data.id} />
                <IpforwardsdataDetails session={this.props.data.id} />
                <TtylogDetails session={this.props.data.id} />
                <DownloadsDetails session={this.props.data.id} />
            </div>
        )
    }
};

export default SessionDetails;