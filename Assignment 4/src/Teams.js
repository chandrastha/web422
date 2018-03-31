import React from 'react';
import axios from 'axios';
import MainContainer from './MainContainer'

class Teams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        axios.get("https://mighty-savannah-71612.herokuapp.com/teams").then((res) => {
            this.setState({
                teams: res.data
            });
        }).catch((err) => {
            console.log("error")
        });
    }

    render() {
        return (
            <MainContainer sidebar="Projects">
                <h1 className="page-header">Teams</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Projects</th>
                            <th>Employees</th>
                            <th>Team Lead</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map((team, index) => {
                            return (
                                <tr>
                                    <td>{team.TeamName}</td>
                                    <td>
                                        {team.Projects.map((project, index) => {
                                            return (
                                                <ul key={index}><li>{project.ProjectName}</li></ul>
                                            )
                                        })}
                                    </td>
                                    <td>{team.Employees.length} Employees</td>
                                    <td>{team.TeamLead.FirstName} {team.TeamLead.LastName}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </MainContainer>
        );
    }
}

export default Teams;