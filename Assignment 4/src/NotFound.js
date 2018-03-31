import React from 'react';
import axios from 'axios';

class NotFound extends React.Component {
    render() {
        return (
            <MainContainer>
                <h1 className="page-header">Not Found</h1>
                <span>Page Not Found</span>
            </MainContainer>
        )
    }
}

export default NotFound;