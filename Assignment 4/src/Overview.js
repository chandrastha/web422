import React from 'react';
import MainContainer from './MainContainer';
import TeamsPanel from './TeamsPanel';
import EmployeesPanel from './EmployeesPanel';
import ProjectsPanel from './ProjectsPanel';

class Overview extends React.Component {
    render() {
        return (
            <MainContainer sidebar="Overview">
                <h1 className="page-header">Overview</h1>
                <div className="row">
                    <div className="col-md-4">
                        <ProjectsPanel />
                    </div>
                    <div className="col-md-4">
                        <TeamsPanel />
                    </div>
                    <div className="col-md-4">
                        <EmployeesPanel />
                    </div>
                </div>
            </MainContainer>
        )
    }
}

export default Overview;