import React, { Component } from 'react'
import SessionsTable from './SessionsTable'

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
	    timespan: 'today',
            authResult: 'any',
            activity: 'any',
            progressPending: true,
            sessions: []
        }

	this.changeTimespan = this.changeTimespan.bind(this);
        this.changeAuthResult = this.changeAuthResult.bind(this);
        this.changeActivity = this.changeActivity.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    changeTimespan(event) {
        this.setState({progressPending: true})
        this.updateData(event.target.value, this.state.authResult, this.state.activity);
    }

    componentDidMount() {
        this.updateData(this.state.timespan, this.state.authResult, this.state.activity);
    }

    changeAuthResult(event) {
        this.setState({progressPending: true})
        this.updateData(this.state.timespan, event.target.value, this.state.activity);
    }

    changeActivity(event) {
        this.setState({progressPending: true})
        this.updateData(this.state.timespan, this.state.authResult, event.target.value);
    }

    // Update the dashboard with new data
    updateData(timespan, authResult, activity) {
        fetch(process.env.REACT_APP_API_HOST + '/sessions?date='+ timespan + '&authResult=' + authResult + '&activity=' + activity)
        .then(res => res.json())
        .then((data) => {
            this.setState(
                {
		    timespan: timespan,
                    authResult: authResult,
                    activity: activity,
                    progressPending: false,
                    sessions: data
                }
            )

        })
        .catch(console.log)
    }

    render() {
        return (
            <div className="App-dashboard">
		{/* Filters */}
                <div className="dashboard-filters">
		    <div className="filter-element">
                        <span>Time span:</span>
                        <select name="timespan" value={this.state.timespan} onChange={this.changeTimespan}>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="7days">Last 7 days</option>
			    <option value="custom">Custom</option>
                        </select>
		    </div>
		    <div className="filter-element">
		        <span>Authentication result:</span>
		        <select name="authResult" value={this.state.authResult} onChange={this.changeAuthResult}>
                            <option value="pass">Pass</option>
                            <option value="fail">Fail</option>
                            <option value="any">Any</option>
                        </select>
		    </div>
		    <div className="filter-element">
		        <span>Activity:</span>
                        <select name="activity" value={this.state.activity} onChange={this.changeActivity}>
                            <option value="input">Input</option>
                            <option value="ipforward">IP forward</option>
                            <option value="any">Any</option>
                        </select>
		    </div>
                </div>

		{/* Table of sessions */}
                <SessionsTable
		    progressPending={this.state.progressPending}
		    sessions={this.state.sessions}
		    defaultSortField="startTime"
		    defaultSortAsc={false}
		/>
            </div>
        )
    }
};

export default Dashboard;
