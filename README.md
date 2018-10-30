# Dolphin News Backend

## DolphinNews-Backend

[https://github.com/BingoBois/DolphinNewsNode](https://github.com/BingoBois/DolphinNewsNode)

The backend of the Project is responsible for managing and answering requests going to the Database, from sources such as the frontend or postman for example. 

The backend is build using primarily Typescript, NodeJS and Express.

To run the project:



*   Open a Terminal
*   Type "npm install" 
    *   To install all modules and dependencies
*   Open the "Run Task"-option
*   Type "tsc watch"
    *   Runs the compiler in watch mode. Watch input files and trigger recompilation on changes. The implementation of watching files and directories can be configured using environment variable. See [configuring watch](https://www.typescriptlang.org/docs/handbook/configuring-watch.html) for more details
    *   [https://www.typescriptlang.org/docs/handbook/compiler-options.html](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
*   Go back to the terminal and type "npm start"
*   If no errors occurred during the "npm install" or the "tsc watch", the project should now be running

-----
# The system crashed, what do i do?

### 1.
[Contact for SSH-Lpgin and Password]

### 2. 
kubectl get pods

       NAME                                READY   STATUS    RESTARTS   AGE
dolphin-backend-6c994db86b-htqm4           1/1     Running   0          26m

### 3. 
If there are any resets (use the pod name):
kubectl logs --previous dolphin-backend-6c994db86b-htqm4
	If no resets:
kubectl logs dolphin-backend-6c994db86b-htqm4

## Do a rollback if something is really wrong (use the name):

kubectl rollout history deployment dolphin-frontend

Use the revision number 1 below the current one:
kubectl rollout undo deployment dolphin-frontend --to-revision=17

----
## API's and Functions


### Backend

[http://80.240.24.203:3000/](http://80.240.24.203:3000/) / [http://dolphin.viter.dk:3000](http://dolphin.viter.dk:3000)

The files for the routes API's can be found in the folder _/src/routes/_, while the queries used in each API-file can be found in the folder _/src/controllers/mysql/queries/_. The handling and managing of the routes is set in _app.ts _which can be found in _/src/app.ts_ 

These are the core API's for the backend:

*/*

*/latest*

*/auth*

*/post*

*/status*

*/user*

*/postandcomments*

*/comment*

*/helge*



Below is a walkthrough of all the API's and their functionalities.


## '/' 

Api-File: _/src/routes/api.ts_

Returns a basic string message, to quickly see if the server can provide a response


## '/latest' 

Api-File: _/src/routes/latestApi.ts_

Queries-file: _/src/controllers/mysql/queries/queries.ts_

Returns the haness_id [number] of the latest successfully added post.


## '/auth'

Api-File:_ /src/routes/auth.ts_

Queries-file: _/src/controllers/mysql/queries/queries.ts_


Used for authenticating and registering a user. 

*   **/auth/login**
    *   Post-method
    *   Login-path for the user
    *   Return json-message with system error message if failed to login
*   **/auth/register**
    *   Post-method
    *   Register/create a new user account
    *   Returns json {'message' : "Success"} upon successfully creating user.
    *   Returns json {'message' : "Error"} if failed to register/create user.


## '/post'

Api-File:_ /src/routes/post.ts_

Queries-file 1: _/src/controllers/mysql/queries/postQueries.ts_

Queries-file 2: _/src/controllers/mysql/queries/queries.ts_

Used for creating, retrieving and voting on post.

*   **/post/**
    *   Post-method
    *   Creates a new Post to be inserted into the Database
    
*   **/post/vote**
    *   Post-method
    *   Used for voting on specific post
    
*   **/getPosts**
    *   Get-Method
    *   Returns all post as a JSON, based in the given id (number) and the amount of votes (number)
        *   If successful, returns status code 200
        *   If failure/error, returns status code 500
        
*   **/getVotes**
    *   Get-Method
    *   Returns all votes as a JSON, based in the given id (number) 
        *   If successful, returns status code 200
        *   If failure/error, returns status code 500
        
*   **/getCommentAmount**
    *   Get-Method
    *   Returns all votes as a JSON, based in the given id (number) 
        *   If successful, returns status code 200
        *   If failure/error, returns status code 500
        
*   **/post/get/all**
    *   Get-method
    *   Retrieves all the post and their associated users 
    *   Returns a json-element
    
*   **/post/unvote/id/:id**
    *   Delete-Method
    *   Method used for deleting a vote from a post.
    
*   **/post/get/all/commentamount**
    *   Get-method
    *   Retrieves all the post and their associated users 
    *   Also includes the amount (number) of comments made in the post
    *   Returns a json-element
    
*   **/post/get/byuser/id/:id**
    *   Get-method
    *   Returns all the post created by a specific user ID (number)
    *   Returns a json-element
    
*   **/post/get/byuser/id/:id**
    *   Get-method
    *   Returns all the post created by a specific user name (string)
    *   Returns a json-element
    
*   **/post/get/bytitle/:title**
    *   Get-method
    *   Returns the post by a specific post title (string)
    *   No room for spelling error
    *   Returns json-element
    
*   **/post/get/byid/:id**
    *   Returns the post by a specific post id (number)
    *   No room for spelling error
    *   Returns json-element


##### 


## '/status'

Api-File:_ /src/routes/statusApi.ts_

Source-file: _/src/controllers/serverstatus.ts_

See and set the server status

*   **/status/**
    *   Get-method
    *   Retrieves the server status as a string
    *   Also retrieves the servers status code (See through Postman)
    *   Possible server status and server code:
        *   Alive - 200
        *   Update - 503
        *   Down - 404
        
*   **/status/set**
    *   Post-method
    *   Set the server status
    *   json format
        *   {'status':'[status]'}
    *   If Successful
        *   Return JSON-element `{"message": "Server status was updated!"}`
    *   If error/failed
        *   Return JSON-element `{"message": "Something went wrong!"}`
    *   Does not (currently) actually affect the actual operating status of the server.

##### 


## '/user'

Api-File:_ /src/routes/userApi.ts_

Queries-file: _/src/controller/userQueries.ts_

Retrieve information about the user(s) in Database

*   **/user/get/byid/:id**
    *   Get-method
    *   Retrieve a specific user based on their user ID (number)
    *   Does not include the users password
    *   Returns as a JSON-element
    
*   **/user/get/all**
    *   Get-method
    *   Retrieves all users in the database
    *   Does not include their passwords
    *   Returns as a JSON-element
    
*   **/user/get/alladmin**
    *   Get-method
    *   Retrieves all users with the role of "Admin"
    *   Does not include the user(s) password
    *   Returns as a JSON-element
    
*   **/user/get/allmembers**
    *   Get-method
    *   Retrieves all users with the role of "member"
    *   Does not include the user(s) password
    *   Returns as a JSON-element
    
*   **/user/get/bykarma/above/:karma**
    *   Get-method
    *   Retrieves all the users with a karma level equal to or <span style="text-decoration:underline;">above</span> the given karma (number)
    *   Does not include the user(s) password
    *   Returns as a JSON-element
    
*   **/user/get/bykarma/below/:karma**
    *   Get-method
    *   Retrieves all the users with a karma level equal to or <span style="text-decoration:underline;">below</span> the given karma (number)
    *   Does not include the user(s) password
    *   Returns as a JSON-element


## '/postandcomments'

Api-File:_ /src/routes/postAndCommentsApi.ts_

Queries-file: _/src/controller/postAndCommentsQueries.ts_

Retrieves comments and post, based on user.

*   **/postandcomments/get/byuser/name/:username**
    *   Get-method
    *   Retrieves all the post and comments based on the username (string)
    *   Comments and post does not include vote-stats or comment-stats
    *   Returns as a JSON-element
    
*   **/postandcomments/get/byuser/id/:userid**
    *   Get-method
    *   Retrieves all the post and comments based on the user id (number)
    *   Comments and post does not include vote-stats or comment-stats
    *   Returns as a JSON-element
    
*   **/postandcomments/get/bypost/id/:postid**
    *   Get-method
    *   Retrieves the post and comments, based on the post id (number)
    *   Comments and post does not include vote-stats or comment-stats
    *   Returns as a JSON-element
    
*   **/postandcomments/get/bypost/title/:posttitle**
    *   Get-method
    *   Retrieves the post and comments, based on the post title (string)
    *   Comments and post does not include vote-stats or comment-stats
    *   Returns as a JSON-element

##### 


## '/comments'

Api-File:_ /src/routes/commentsApi.ts_

Queries-file: _/src/controller/commentsQueries.ts_

Retrieves all the comments.

*   **/comments/get/all/withvote**
    *   Get-method
    *   Retrieves all the comments with votes
    *   Returns a JSON-element
    
*   **/comments/get/all**
    *   Get-method
    *   Retrieves all the comments in the Database
    *   Returns a JSON-element
    
*   **/comments/get/bypost/:id**
    *   Get-Method
    *   Retrieves all comments based on the given post id
    
*   **/comments/vote**
    *   Post-method
    *   Method for adding a vote to a comment
    
*   **/comments/unvote/id/:id**
    *   Delete-method
    *   Locates the vote in the database based on the given id (number) and deletes it.

##### 


## '/helge'

Api-File:_ /src/routes/helge.ts_

Used for handling all the "special" request by Helge and his simulator, though we are only interested in the Post method '/'.

*   **/helge/**
    *   Post-method
    * 	Special method for handling Helge/Simulator data
    *   Method for handling incoming data to be inserted into the Database
    *   Incoming data is handled in a PostObject named "tempPost"
    
*   **/helge/vote**
    *   Does nothing atm. in this context
    
*   **/helge/get/all**
    *   Get-method
    *   Returns all users and post as a JSON
    
*   **/helge/get/all/commentamount**
    *   Get-Method
    *   Returns all post with a commentAmount as a JSON
    
*   **/helge/get/byuser/id/:id**
    *   Get-method
    *   Returns all post by user id (number) as a JSON
    
*   **/helge/get/byuser/name/:name**
    *   Get-method
    *   Returns all post by user name (string) as a JSON
    
*   **/helge/get/bytitle/:title**
    *   Get-Method
    *   Returns post with the given title (string) as a JSON
    
*   **/helge/get/byid/:id**
    *   Get-Method
    *   Returns post based on the given id (number) as a JSON

#### 

-----
### General Important Info and links:


#### Repositories

GitHub-Organization:

[https://github.com/BingoBois](https://github.com/BingoBois)

Project Dev-Ops

[https://github.com/BingoBois/DolphinNewsDevOps](https://github.com/BingoBois/DolphinNewsDevOps)

Project Frontend

[https://github.com/BingoBois/DolphinNewsFrontend](https://github.com/BingoBois/DolphinNewsFrontend)

Project Backend

[https://github.com/BingoBois/DolphinNewsNode](https://github.com/BingoBois/DolphinNewsNode)


#### Hosting

**FrontendWebSite**: [dolphin.viter.dk](dolphin.viter.dk)

**Backend Database**: [http://dolphin.viter.dk:3000/](http://dolphin.viter.dk:3000/) \


Project IP/URL

**Frontend:** [http://80.240.24.203](http://80.240.24.203)

**Backend:** [http://80.240.24.203:3000/](http://80.240.24.203:3000/)

dbdolphin.viter.dk =[ 108.61.211.164](http://108.61.211.164/)

Docker-Backend: [https://hub.docker.com/r/dolphinnews/backend/tags/](https://hub.docker.com/r/dolphinnews/backend/tags/)

Docker-Frontend: [https://hub.docker.com/r/dolphinnews/frontend/tags/](https://hub.docker.com/r/dolphinnews/frontend/tags/) \



#### Misc Details

You will need various information and files, in order to access the project's various droplets etc.

Please contact us in order to get access to the teams:

*   Kubernetes
*   Droplets
*   Docker
*   MySQL-Database



-----

### General Technologies: 

*   Primary language:
    *   Typescript
        *   Developed by Microsoft
        *   Superset of Typescript
        *   Compiles to regular/normal Javascript
        *   https://github.com/Microsoft/TypeScript
*   Backend 
    *   [http://80.240.24.203:3000/](http://80.240.24.203:3000/)
    *   [dolphin.viter.dk](http://dolphin.viter.dk):3000/
    *   Nodejs
    *   Express
    *   Port 3000
*   Frontend
    *   [http://80.240.24.203](http://80.240.24.203)
    *   [dolphin.viter.dk](http://dolphin.viter.dk)
    *   React
    *   MobX
    *   react-router-dom
    *   CSS
*   Docker 
    *   In conjunction with Kubernetes
*   Continuous Integration
    *   Travis
    *   Setup for both development and deployment
*   Kubernetes ([https://kubernetes.io/](https://kubernetes.io/)) 
    *   Used in conjunction with Docker
    *   Used by Google, Financial Times, IBM and more
    *   Run anywhere
    *   Clusters
        *   Private LAN
        *   Provides IP's
    *   Images
        *   Frontend
        *   Backend
    *   Setup script for images
        *   Download from Github
    *   Machines: Node
    *   Microservices
        *   Load balance
        *   Updating
            *   Removes old pods and creates new
    *   Master & Slave
        *   Hoster "Pod" (Collection of Containers)
            *   Rabbit MQ
            *   Express
    *   Pods are accessed by "Service"
    *   Deployment manages the amount of pods and general setup/settings of the pods
    *   Automatically checks Github for new images/new content 
*   Digital Ocean Droplets
    *   Hosting the servers
    *   Protected by SSH-keys (mostly)
*   Database
    *   MySQL
*   Testing
    *   Jest
*   Github
*   SCRUM
    *   Pair programming
        *   Zoom
        *   TeamView
        *   Teamspeak
*   HTTP
    *   The team opted for using HTTP during development and deployment, due to the configuration and hoopes needed to get HTTPS up and running through free services such as "Let's Encrypt" and "xip.io". The team recognize that setting up HTTPS would be crucial and important to the projects security, if it would ever be used for Live-production.

-----
***Original Documentation document: https://docs.google.com/document/d/1js5Vx5Y_EBHAWZZGPYC5kW4LwCBrb_e1Qx2xlP_ZxnI/edit#***
-----
Old info

Uses typescript and mysql

In VS Code use "tsc watch" (ctrl + b) + npm start

Install nodemon(maybe) and typescript 

Vikto Sutter

In vs code usersettings.json:

"files.insertFinalNewline": true,
