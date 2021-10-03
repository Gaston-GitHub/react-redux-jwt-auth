// Logout user when token is expired and route changes
// create a component with react-router subscribed to check
// JWT token expiry
// Render in the App component

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

class AuthVerify extends Component {
    constructor(props) {
        super(props);

        props.listen(() => {
            const user = JSON.parse(localStorage.getItem('user'));

            if(user) {
                const decodedJwt = parseJwt(user.accessToken);
                
                if(decodedJwt.exp * 1000 < Date.now) {
                    props.logOut();
                }
            }
        });
    }

    render() {
        return <div></div>
    }
}
export default withRouter(AuthVerify)