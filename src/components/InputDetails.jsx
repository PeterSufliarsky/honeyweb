import React, { Component } from 'react'

class InputDetails extends Component {

    state = {
        input: []
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_API_HOST + '/sessions/' + this.props.session + '/input')
        .then(res => res.json())
        .then((data) => {
            this.setState({ input: data })
        })
        .catch(console.log)
    }

    render() {
        if (this.state.input.length) {
            return (
                <div className="App-inputdetails">
                    <p className="details-section-title">Input:</p>
                    <p>{JSON.stringify(this.state.input)}</p>
                </div>
            )
        } else {
            return null;
        }
    }
};

export default InputDetails;