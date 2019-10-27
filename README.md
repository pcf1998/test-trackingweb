# trackingweb
https://github.com/pcf1998/trackingweb-1.0.git  

For now, there are four models with Schema and related to each other.  
In users table of the database, the password created by the user will be stored into the user table when it has been encrypted more than 10 times. It will be very safe to store the user data.  
###what can the API do ?  
All the functions will be displayed in the video with the automated testing tool  Postman.
####about GET function:  
######for users  
* '/users'  
* '/users/:userID'

######for tracings
* '/tracings'  
* '/tracings/:projectID' 

######for tasks  
* '/tracings/:projectID/tasks'  
* '/tracings/:projectID/tasks/:taskID'  
* '/tracings/:projectID/teams/:teamID/tasks/'  
* '/tracings/:projectID/teams/:teamID/tasks/:taskID'

######for teams  
* '/teams'  
* '/teams/:teamID'  
* '/tracings/:projectID/teams/'  
* '/tracings/:projectID/teams/:teamID'

####about POST function:  
######for users  
* '/users'  
must have userName, userPassword, email, mobilePhone, gender, dateOfBirth
######for tracings  
* '/tracings'  
must have projectName  

* '/tracings/:projectID/stages'  
must have req.body.stages(stages is an array[])
######for tasks  
* '/tracings/:projectID/teams/:teamID/tasks'  
must have taskName and membersID
######for teams
* '/tracings/:projectID/teams'  
must have teamName and teamMembersID(teamMembersID is an array[])
* '/tracings/:projectID/teams/:teamID/teamMembersID'

####about PUT function:  
######for users
* '/users/:userID/example'  
example(req.body.xxxx) can be userName, userPassword, status, department, position, email, mobilePhone, fax, telephone, address, gender, dateOfBirth, educationalDegree, maritalStatus, entryDate, leave  
dateOfBirth and entryDate must be the format of xxxx-xx-xx(year-month-date)  
when '/users/:userID/leave' the req.body must be none/empty/null
######for tracings
* '/tracings/:projectID/projectName'  
must have req.body.projectName
* '/tracings/:projectID/status'   
must have req.body.status
* '/tracings/:projectID/stages/:whichStageToModify'  
must have req.params.whichStageToModify and req.body.stages(NOT an array)
######for tasks  
* '/tracings/:projectID/teams/:teamID/tasks/:taskID/taskContent'  
must have req.body.taskContent
* '/tracings/:projectID/teams/:teamID/tasks/:taskID/taskName'   
must have req.body.taskName  
* '/tracings/:projectID/teams/:teamID/tasks/:taskID/taskStatus'  
must have req.body.status
######for teams
* '/tracings/:projectID/teams/:teamID/teamName'  
must have req.body.teamName
* '/tracings/:projectID/teams/:teamID/teamMembersID/:whichTeamMemberIDToUpdate'  
must have req.params.whichTeamMemberIDToUpdate and req.body.teamMembersID(NOT an array)

####about DELETE function:  
######for users
* '/users/:userID'  
######for tracings
* '/tracings/:projectID'  
* '/tracings/:projectID/stages/:whichStageToDelete'  
the req.params.whichStageToDelete must be a legal number
######for tasks 
* '/tracings/:projectID/teams/:teamID/tasks/:taskID'
######for teams
* '/tracings/:projectID/teams/:teamID'  
* '/tracings/:projectID/teams/:teamID/teamMembersID/:teamMemberID'


