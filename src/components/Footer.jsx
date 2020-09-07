import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div className="App-footer">
                <span class="footer-text">This page includes GeoLite2 data created by MaxMind, available from</span>
                <a href="https://www.maxmind.com" class="footer-link">https://www.maxmind.com</a>.
            </div>
        )
    }
};

export default Footer;