# Assignment 1 - Agile Software Practice.

Name: Chengfeng Pan    
Student Number: 20086418

## Overview.

For now, there are four models with Schema and related to each other, user can do add, delete, modify and find operations for user, project, task and team, 
these four parts of web app.

github:https://github.com/pcf1998/test-trackingweb.git
## API endpoints.

###about GET function
####for users
 '/users'  
 '/users/:userID'

####for projects
 '/tracings'  
 '/tracings/:projectID'


####for tasks
 '/tracings/:projectID/tasks'  
 '/tracings/:projectID/tasks/:taskID'  
 '/tracings/:projectID/teams/:teamID/tasks/'  
 '/tracings/:projectID/teams/:teamID/tasks/:taskID'  

####for teams
 '/teams'  
 '/teams/:teamID'  
 '/tracings/:projectID/teams/'  
 '/tracings/:projectID/teams/:teamID'  
 ###about POST function:
 ####for users
 
 '/users'  
 must have userName, userPassword, email, mobilePhone, gender, dateOfBirth   
 ####for projects
 
 '/tracings'  
 must have projectName  
 
 '/tracings/:projectID/stages'  
 must have req.body.stages(stages is an array[])   
 
 ####for tasks
 
 '/tracings/:projectID/teams/:teamID/tasks'  
 must have taskName and membersID 
 
 ####for teams
 
 '/tracings/:projectID/teams'    
 must have teamName and teamMembersID(teamMembersID is an array[])  
 
 '/tracings/:projectID/teams/:teamID/teamMembersID'  
 
 ###about PUT function:
 ####for users
 
 '/users/:userID/example'  
 example(req.body.xxxx) can be userName, userPassword, status, department, position, email, mobilePhone, fax, telephone, address, gender, dateOfBirth, educationalDegree, maritalStatus, entryDate, leave
 dateOfBirth and entryDate must be the format of xxxx-xx-xx(year-month-date)
 when '/users/:userID/leave' the req.body must be none/empty/null 
 
 ####for projects
 '/tracings/:projectID/projectName'  
 must have req.body.projectName  
 
 '/tracings/:projectID/status'  
 must have req.body.status  
 
 '/tracings/:projectID/stages/:whichStageToModify'  
 must have req.params.whichStageToModify and req.body.stages(NOT an array)  
 
 ####for tasks
 '/tracings/:projectID/teams/:teamID/tasks/:taskID/taskContent'  
 must have req.body.taskContent  
 
 '/tracings/:projectID/teams/:teamID/tasks/:taskID/taskName'  
 must have req.body.taskName  
 
 '/tracings/:projectID/teams/:teamID/tasks/:taskID/taskStatus'  
 must have req.body.status 
 
 ####for teams
 '/tracings/:projectID/teams/:teamID/teamName'  
 must have req.body.teamName  
 
 '/tracings/:projectID/teams/:teamID/teamMembersID/:whichTeamMemberIDToUpdate'  
 must have req.params.whichTeamMemberIDToUpdate and req.body.teamMembersID(NOT an array)  
 
 ###about DELETE function:
 ####for users
 
 '/users/:userID'  
 ####for projects
 '/tracings/:projectID'  
 
 '/tracings/:projectID/stages/:whichStageToDelete'  
 the req.params.whichStageToDelete must be a legal number  
 
 ####for tasks
 '/tracings/:projectID/teams/:teamID/tasks/:taskID'   
 
 ####for teams
 '/tracings/:projectID/teams/:teamID'  
 '/tracings/:projectID/teams/:teamID/teamMembersID/:teamMemberID'

## Data model.

![][datamodel]


## Sample Test execution.

~~~
  API
    
    MongoDB Atlas
        Connect the MongoDB Atlas
            ✓ should connect the MongoDB Atlas successfully

    Task
        findAllTasksInProject
          when the project id is valid
            ✓ should return all tasks in the project
          when the project id is invalid
            ✓ should return the NOT found message
        findOneTaskInProject
          when the project id and task id are valid
            ✓ should return the specific task in the project
          when the project id is invalid
            ✓ should return the NOT found message
          when the task id is invalid
            ✓ should return the NOT found message
        findAlltasksInTeam
            ✓ should return all tasks in the team
        findOneTaskInTeam
            ✓ should return the specific task in the team
        addTask
            ✓ should return confirmation message and add task
        updateTaskContent
            ✓ should return confirmation message and update task content
        updateTaskName
            ✓ should return confirmation message and update task name
        updateTaskStatus
            ✓ should return confirmation message and update task status
        deleteTask
            ✓ should return confirmation message and delete the task

    Team
        findAllTeams
            ✓ should return all the teams
        findOneTeam
          when the team id is valid
            ✓ should return the matching team
          when the task id is invalid
            ✓ should return the NOT found message
        findAllteamsInproject
            ✓ should return all teams in the project
        finfAllTeamsInProject
          when the project id is valid
            ✓ should return all teams in the project
          when the project id is invalid
            ✓ should return the NOT found message
        findOneTeamInproject
          when the project id and team id are valid
            ✓ should return the matching team in the project
          when the project id is invalid
            ✓ should return the NOT found message
          when the team id is invalid
            ✓ should return the NOT found message
        addTeam
          when the project id is valid
            ✓ should return confirmation message and add team
          when the project id is invalid
            ✓ should return the NOT found message
        addTeamMembersID
          when the project id and team id are valid
            ✓ should return confirmation message and add team member id
          when the project id is invalid
            ✓ should return the NOT found message
          when the team id is invalid
            ✓ should return the NOT found message
        updateTeamName
            ✓ should return confirmation message and update team name
        updateTeamMembersID
          when project id, team members id and index of the team member are valid
            ✓ should return confirmation message and update team member id
          when project id, team members id are valid and index of team member id is invalid
            ✓ should return the NOT found message
        deleteTeam
          when the project id and team id are valid
            ✓ should return confirmation message and delete the team
          when the project id is invalid
            ✓ should return the NOT found message
          when the team id is invalid
            ✓ should return the NOT found message

    Tracing
        findAllProjects
            ✓ should return all the projects
        findOneProject
          when the project id is valid
            ✓ should return the matching project
          when the project id is invalid
            ✓ should return the NOT found message
        addProject
            ✓ should return confirmation message and add project
        addSatges
          when the project id is valid
            ✓ should return confirmation message and update stages
          when the project id is invalid
            ✓ should return the NOT found message
          when the number of added stages is 0
            ✓ should return illegal input message
        updateProjectName
          when the project id is valid
            ✓ should update the project name
          when the project id is invalid
            ✓ should return the NOT found message
        updateProjectStatus
          when the project id is valid
            ✓ should update the project status
          when the project id is invalid
            ✓ should return the NOT found message
          when the input is same as the original one
            ✓ should return message that original status and new status can't be same
        updateProjectStage
          when the project id is valid
            ✓ should update the project stage
          when the project id is invalid
            ✓ should return the NOT found message
          when the input number of stage is illegal
            ✓ should return message that original status and new status can't be same
        deleteProject
          when the project id is valid
            ✓ should return confirmation message and delete the project
          when the project id is invalid
            ✓ should return the NOT found message
        deleteStage
          when the project id is valid and the number of stage is valid
            ✓ should return confirmation message and delete the project stage
          when the project id is invalid
            ✓ should return the NOT found message
          when the the number of stage is invalid
            ✓ should return the NOT found messag
          when the the format of input number is illegal
            ✓ should return the NOT found message

    User
        findAllUsers
            ✓ should return all the users
        findOneUser
          when the user id is valid
            ✓ should return the matching user
          when the user id is invalid
            ✓ should return the NOT found message
        addUser
            ✓ should return confirmation message and add user
        updateUser[information]
            ✓ should return confirmation message and update user[information]
        deleteUser
          when the user id is valid
            ✓ should return confirmation message and delete the user
          when the user id is invalid
            ✓ should return the NOT found message




  61 passing (39s)
~~~

## Extra features.

In users table of the database, the password created by the user will be stored into the user table when it has been encrypted more than 10 times. It will be very safe to store the user data.

[datamodel]: ./img/data-model.png
