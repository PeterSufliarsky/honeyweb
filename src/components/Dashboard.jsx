import React, { Component } from 'react'
import SessionsTable from './SessionsTable'

class Dashboard extends Component {
    render() {
        return (
            <div className="App-dashboard">
                <SessionsTable />
            </div>
        )
    }
};

export default Dashboard;