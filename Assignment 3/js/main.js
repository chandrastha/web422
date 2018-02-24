/********************************************************************************* *
 *  WEB422 – Assignment 03 * 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
 * assignment has been copied manually or electronically from any other source (including web sites) or 
 * distributed to other students. *
 * Name: Chandra Shrestha Student ID: 121467161 Date: 23 Feb, 2108 *
 *********************************************************************************/

var viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])
}

function showGenericModal(title, message) {
    let $data = $("#genericModal");

    $(".modal-title").empty();
    $(".modal-body").empty();
    $(".modal-title").append(title);
    $(".modal-body").append(message);

    $data.modal({
        backdrop: 'static',
        keyboard: false
    });

}

function initializeTeams() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://mighty-savannah-71612.herokuapp.com/teams-raw",
            type: "GET",
            contentType: "applicaton/json"
        })
            .done(function (result) {
                viewModel.teams = ko.mapping.fromJS(result);

                resolve();
            })
            .fail(function (err) {
                reject("Error loading the team data.");
            })
    })
}

function initializeEmployees() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://mighty-savannah-71612.herokuapp.com/employees",
            type: "GET",
            contentType: "applicaton/json"
        })
            .done(function (result) {
                viewModel.employees = ko.mapping.fromJS(result);

                resolve();
            })
            .fail(function (err) {
                reject("Error loading the employee data");
            })
    })
}

function initializeProjects() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://mighty-savannah-71612.herokuapp.com/projects",
            type: "GET",
            contentType: "applicaton/json"
        })
            .done(function (result) {
                viewModel.projects = ko.mapping.fromJS(result);

                resolve();
            })
            .fail(function (err) {
                reject("Error loading the 'project' data");
            })
    })
}


$(function () {
    return new Promise(function (resolve, reject) {
        initializeTeams()
            .then(initializeEmployees)
            .then(initializeProjects)
            .then(function () {
                ko.applyBindings(viewModel);
                $(".multiple").multipleSelect({ filter: true });
                $(".single").multipleSelect({ single: true, filter: true });

            }).catch(function (errr) {
                showGenericModel("Error", errr);
            })


    })

})

function saveTeam() {
    let current_team = this;
    $.ajax({
        url: "https://mighty-savannah-71612.herokuapp.com/" + "team/" + current_team._id(),
        type: "PUT",
        data: JSON.stringify(
            {
                "Projects": current_team.Projects(),
                "Employees": current_team.Employees(),
                "TeamLead": current_team.TeamLead()
            }
        ),
        contentType: "application/json"
    })
        .done(function (data) {
            showGenericModal("Success", "[" + current_team.TeamName() + "] Updated Successfully");
        })
        .fail(function (err) {
            showGenericModal("Error", "Error updating the team information.");
        });
}