import React, { Component } from 'react'

class TtylogDetails extends Component {

    state = {
        ttylog: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/ttylog')
        .then(res => res.json())
        .then(data => {
            this.setState({ ttylog: data })
        })
        .catch(console.log)
    }

    render() {
        if (this.state.ttylog.length) {
            return (
                <div className="App-ttylogdetails">
                    <p className="details-section-title">TTY log:</p>
                    <table className="details-section-table">
                        <thead>
                            <tr>
                                <th className="table-column-sha256">TTY Log ID</th>
                                <th className="table-column-shortnum">op</th>
                                <th className="table-column-shortnum">tty</th>
                                <th className="table-column-shortnum">length</th>
                                <th className="table-column-shortnum">dir</th>
                                <th className="table-column-longnum">sec</th>
                                <th className="table-column-longnum">usec</th>
                                <th>data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ttylog.map((ttylog) =>
                                    <tr key={ttylog.id}>
                                        <td className="table-column-sha256">{ttylog.hash}</td>
                                        <td className="table-column-shortnum">{ttylog.op}</td>
                                        <td className="table-column-shortnum">{ttylog.tty}</td>
                                        <td className="table-column-shortnum">{ttylog.length}</td>
                                        <td className="table-column-shortnum">{ttylog.dir}</td>
                                        <td className="table-column-longnum">{ttylog.sec}</td>
                                        <td className="table-column-longnum">{ttylog.usec}</td>
                                        <td>{ttylog.data}</td>
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

export default TtylogDetails;