import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import SessionsTable from './SessionsTable'

import "react-datepicker/dist/react-datepicker.css";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timespan: 'today',
            startTime: new Date(new Date().setHours(0,0,0,0)),
            endTime: new Date(new Date().setHours(24,0,0,0)),
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

    componentDidMount() {
        this.updateData(this.state.timespan, this.state.authResult, this.state.activity);
    }

    changeTimespan(event) {
        if (event.target.name === "timespan") {
            let timespan = event.target.value;
            if (timespan === 'today') {
                let startTime = new Date(new Date().setHours(0,0,0,0));
                let endTime = new Date(new Date().setHours(24,0,0,0));
                this.setState(
                    {
                        progressPending: true,
                        timespan: timespan,
                        startTime: startTime,
                        endTime: endTime
                    }
                )
                this.updateData(timespan, this.state.authResult, this.state.activity);
            } else if (timespan === 'yesterday') {
                let yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                let startTime = new Date(yesterday.setHours(0,0,0,0));
                let endTime = new Date(yesterday.setHours(24,0,0,0));
                this.setState(
                    {
                        progressPending: true,
                        timespan: timespan,
                        startTime: startTime,
                        endTime: endTime
                    }
                )
                this.updateData(timespan, this.state.authResult, this.state.activity);
            } else if (timespan === 'custom') {
                this.setState({timespan: timespan})
            }
        } else if (event.target.name === "search") {
            this.setState({progressPending: true})
            this.updateDataCustomTimespan(this.state.startTime, this.state.endTime, this.state.authResult, this.state.activity);
        }
    }

    changeStartTime = startTime => {
        this.setState({startTime: startTime})
    }

    changeEndTime = endTime => {
        this.setState({endTime: endTime})
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

    // Update the dashboard with new data based on startTime and endTime
    updateDataCustomTimespan(startTime, endTime, authResult, activity) {
        let isoStartTime = startTime.toISOString();
        let isoEndTime = endTime.toISOString();

        fetch(process.env.REACT_APP_API_HOST + '/sessions?startTime=' + isoStartTime + '&endTime=' + isoEndTime + '&authResult=' + authResult + '&activity=' + activity)
        .then(res => res.json())
        .then((data) => {
            this.setState(
                {
                    timespan: 'custom',
                    startTime: startTime,
                    endTime: endTime,
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
                    <table className="filters-table">
                        <tbody>
                            <tr>
                                <td>
                                    <span className="filter-label">Time span:</span>
                                </td>
                                <td>
                                    <select name="timespan" ref={this.timespan} className="filter-dropdown" value={this.state.timespan} onChange={this.changeTimespan}>
                                        <option value="today">Today</option>
                                        <option value="yesterday">Yesterday</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                </td>
                                <td>
                                    {
                                        this.state.timespan === 'custom' ?
                                            <span className="custom-timespan-chooser">
                                                <span className="filter-label2">from</span>
                                                <DatePicker
                                                    selected={this.state.startTime}
                                                    onChange={this.changeStartTime}
                                                    maxDate={new Date()}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={5}
                                                    dateFormat="MMMM d, yyyy HH:mm"
                                                />
                                                <span className="filter-label2">to</span>
                                                <DatePicker
                                                    selected={this.state.endTime}
                                                    onChange={this.changeEndTime}
                                                    minDate={this.state.startTime}
                                                    maxDate={new Date()}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={5}
                                                    dateFormat="MMMM d, yyyy HH:mm"
                                                />
                                                <input type="button" name="search" className="filter-button" value="Search" onClick={this.changeTimespan}></input>
                                            </span>
                                        : null
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="filter-label">Authentication:</span>
                                </td>
                                <td>
                                    <select name="authResult" className="filter-dropdown" value={this.state.authResult} onChange={this.changeAuthResult}>
                                        <option value="pass">Pass</option>
                                        <option value="fail">Fail</option>
                                        <option value="any">Any</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="filter-label">Activity:</span>
                                </td>
                                <td>
                                    <select name="activity" className="filter-dropdown" value={this.state.activity} onChange={this.changeActivity}>
                                        <option value="input">Input</option>
                                        <option value="ipforward">IP forward</option>
                                        <option value="any">Any</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
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
