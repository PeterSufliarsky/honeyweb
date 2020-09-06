import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import Flag from 'react-flags'
import SessionDetails from './SessionDetails'

const columns = [
    {
        name: 'Country',
        selector: 'country',
        sortable: true,
        cell: row => <Flag basePath="img/flags" name={row.country} format="png" pngSize={32} shiny={true} alt={row.country} />,
        width: '8em'
    },
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

    render() {
        return (
            <div className="dashboard-widget sessions-table">
                <DataTable
                    columns={columns}
                    data={this.props.sessions}
                    defaultSortField={this.props.defaultSortField}
                    defaultSortAsc={this.props.defaultSortAsc}
                    highlightOnHover
                    pagination
                    expandableRows
                    expandableRowsComponent={<SessionDetails />}
                    expandOnRowClicked
                    noHeader
                    persistTableHead
                    progressPending={this.props.progressPending}
                />
            </div>
        )
    }
};

export default SessionsTable;
