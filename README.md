# Club-Hub
An app  for college students to find on campus clubs

## Getting Started
1. Clone this repository on your local machine
2. In the terminal change your directory to client with `cd client`
3. Call `npm i` in order to download all necessary packages (this may take a couple minutes the first time)
4. Call `ionic serve` to host the frontend
5. In a seperate terminal change your directory to server with `cd server`
6. Call `npm i` again in this directory
7. Call `node server` to host the backend
8. If you visit localhost:8100 in your browser, you should see a fully functional version of ClubHub!

## Static Code Analysis & Test Coverage
The static code analysis and test coverage can be viewed at [SonarCloud.com](https://sonarcloud.io/dashboard?id=cartcrom_Club-Hub)\

By most of the SonarCloud's metrics we are doing very well with our static code analysis. The bugs that still remain are left in because SonarCloud doesn’t recognize ionic components. It believes they shouldn’t be referenced in our css files, but this is not actually an issue. We have also reviewed the remaining code smells and have decided that none of them are large enough issues to warrant spending time on fixing. While we do have a small amount of duplicated code, it is not enough to cause any concerns. Other than these issues, we are passing the metrics needed and there are not major issues with our code.

## Acceptance Tests
Acceptance Tests are viewable at cypress/integration\
**TODO**: Push acceptance tests to GitHub, automate them, and provide. 8 Scenarios are required

## CI/CD
Continuous Integration/Continuous Deployment is viewable at [Travis-ci.com](https://travis-ci.com/github/cartcrom/Club-Hub)

## UML Deployment Diagram
![Deployment Diagram](https://github.com/JayantDevkar/Club-Hub/blob/master/ClubHub%20Structure.png)

## Style Guide
1. Use esm modules
2. Use React framework
3. Use Typescript
4. Use Javascript for config
5. Use spaces for indents
6. Use double quotes for strings
7. Use unix line endings 
8. Use semicolons
