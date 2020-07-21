import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import SessionDetails from './SessionDetails'

const columns = [
    {
        name: 'ID',
        selector: 'id',
        sortable: true
    },
    {
        name: 'IP',
        selector: 'ip'
    },
    {
        name: 'Start Time',
        selector: 'startTime',
        sortable: true
    },
    {
        name: 'End Time',
        selector: 'endTime',
        sortable: true
    },
    {
        name: 'Client',
        selector: 'client',
        sortable: true
    },
    {
        name: 'Sensor',
        selector: 'sensor',
        sortable: true
    }
];

class SessionsTable extends Component {
    state = {
        progressPending: true,
        sessions: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions?date=today')
        .then(res => res.json())
        .then((data) => {
            this.setState(
                {
                    progressPending: false,
                    sessions: data
                }
            )
        })
        .catch(console.log)
    }
    
    render() {
        return (
            <div className="sessions-table">
                <DataTable
                    title="Sessions"
                    columns={columns}
                    data={this.state.sessions}
                    highlightOnHover
                    pagination
                    expandableRows
                    expandableRowsComponent={<SessionDetails />}
                    persistTableHead
                    progressPending={this.state.progressPending}
                />
            </div>
        )
    }
};

export default SessionsTable;