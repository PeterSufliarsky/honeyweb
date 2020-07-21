import React, { Component } from 'react'

class ParamsDetails extends Component {

    state = {
        params: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/params')
        .then(res => res.json())
        .then((data) => {
            this.setState({ params: data })
        })
        .catch(console.log)
    }

    render() {
        if (this.state.params.length) {
            return (
                <div className="App-paramsdetails">
                    <p className="details-section-title">Params:</p>
                    <p>{JSON.stringify(this.state.params)}</p>
                </div>
            )
        } else {
            return null;
        }
    }
};

export default ParamsDetails;