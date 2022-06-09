# Welcome, Adrian
Hey brother, some notes to help you get going as quickly as possible. Please don't hesitate to reach out if anything doesn't make sense.

## some house keeping
- Make sure to give your environment variables file the following name: `.env.local` 
- On commit messages and the [pattern I like to follow](https://dev.to/bhekanik/supercharge-your-git-history-with-better-commit-messages-32fk)
- Short lived feature branches for each ticket (or a combination of two or more tickets, as long as the context is related, and the PR isn't too massive) - [trunk based development](https://trunkbaseddevelopment.com/)
  - Each PR needs to be reviewed before merging into main

## on Node 17 
- Been using Node 17 on my machine, that seems to have issues with some of the packages here, so beware.
- I used nvm to change my node version to 14, and my dependencies installed with no problem after that.

# todo
assume these are written in order of importance/priority. start from the top
- error handling must be done for all the forms g😬
  - [x] ResetPassword - [this](https://www.tabnine.com/code/javascript/functions/firebase/Promise/sendPasswordResetEmail) will help, I'm sure
  - [x] SignUpForm: seems this functionality is broken. fix it then error handling
- [x] Query & display all reports that a signed in user is allowed to see (refer to `array-contains` snippet that's in the notebook)
- [x] check out the TODO's in the codebase
- [x] separate grid components into own pages
  - [x] ~~my reports is done~~
  - [x] ~~organisation reports~~
- [x] separate dashboard nav into its own component.
  - [x] SideNav styling needs work, I think the width is what needs work
- [x] persistent nav(collapsable) + basic layout
- [x] fix build errors
- [x] "Cannot read property 'uid' of null" when trying to login
  - seems like you get logged in, but the auth state isn't set correctly in the app? or in the login screen. because the sidenav appears(which needs a logged in user), but yet you still can't access the dashboard?
- [x] creating of individual reports, users, & orgs
- [x] **reading of individual reports, users, & orgs**
- [x] updating of individual reports, users, & orgs
  - [x] strategy to take care of the frontend's state changes (most notably the roles, as that comes in an array of strings)
- [x] deleting of individual reports, users, & orgs - from grid & single item's page
- [x] need to start the switch to an org firebase account

# architecture
- initial firebase setup was done following [this](https://betterprogramming.pub/implement-user-authentication-with-next-js-and-firebase-fb9414adba08) tutorial
- [better tutorial](https://www.youtube.com/watch?v=awd_oYcmrRA) to follow for next project
- [useFirestoreQuery](https://usehooks.com/useFirestoreQuery/) hook's src

# backlog
- [ ] button situation with the forms has to be addressed, if I fill in a form and press enter, nothing happens. can't go to production with this.
  - [ ] This can be fixed with an event listener for the enter key. But also that might not be the most accessible solution, check out other ways of doing this, if time permits.
