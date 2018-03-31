import React from 'react';
import axios from 'axios';
import MainContainer from './MainContainer';
import moment from 'moment';

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    componentDidMount() {
        axios.get("https://mighty-savannah-71612.herokuapp.com/projects").then((res) => {
            this.setState({
                projects: res.data
            });
        }).catch((err) => {
            console.log("error")
        });
    }

    render() {
        return (
            <MainContainer sidebar="Projects">
                <h1 className="page-header">Projects</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.projects.map((element, index) => {
                            return (
                                <tr>
                                    <td>{element.ProjectName}</td>
                                    <td>{element.ProjectDescription}</td>
                                    <td>{moment(element.ProjectStartDate).utc().format("LL")}</td>
                                    <td>{(element.ProjectEndDate === null ? 'n/a' : moment(element.ProjectStartDate).format("LL"))}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </MainContainer>
        );
    }
}

export default Projects;