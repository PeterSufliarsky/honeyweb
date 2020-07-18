import React, { Component } from 'react'
import DataTable from 'react-data-table-component'

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
        selector: row => row.client?.version,
        sortable: true
    },
    {
        name: 'Sensor',
        selector: 'sensor.ip',
        sortable: true
    }
];

class SessionsTable extends Component {
    state = {
        sessions: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions?date=today')
        .then(res => res.json())
        .then((data) => {
            this.setState({ sessions: data })
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
                    expandableRows={false}
                    persistTableHead
                />
            </div>
        )
    }
};

export default SessionsTable;