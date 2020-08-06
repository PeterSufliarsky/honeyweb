import React, { Component } from 'react'

class InputDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: []
        }
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/input')
        .then(res => res.json())
        .then((data) => {
            this.setState({ input: data })
        })
        .catch(console.log)
    }

    getTime = timestamp => {
        return new Date(timestamp).toLocaleTimeString();
    }

    render() {
        if (this.state.input.length) {
            return (
                <div className="App-inputdetails">
                    <p className="details-section-title">Input:</p>
                    <table className="details-section-table">
                        <thead>
                            <tr>
                                <th className="table-column-time">Time</th>
                                <th>Command</th>
                                <th className="table-column-success">Success</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.input.map((input) =>
                                    <tr>
                                        <td className="table-column-time">{this.getTime(input.timestamp)}</td>
                                        <td>{input.input}</td>
                                        <td className="table-column-success">{input.success}</td>
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

export default InputDetails;