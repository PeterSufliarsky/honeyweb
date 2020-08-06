import React, { Component } from 'react'

class TtylogDetails extends Component {

    state = {
        ttylog: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/ttylog')
        .then(res => res.json())
        .then((data) => {
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
                                <th>Id</th>
                                <th>File name</th>
                                <th>Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ttylog.map((ttylog) =>
                                    <tr>
                                        <td>{ttylog.id}</td>
                                        <td>{ttylog.ttylog}</td>
                                        <td>{ttylog.size}</td>
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