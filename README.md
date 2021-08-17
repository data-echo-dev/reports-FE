# todo
assume these are written in order of importance/priority. start from the top
- error handling must be done for all the forms g😬
  - [x] ResetPassword - [this](https://www.tabnine.com/code/javascript/functions/firebase/Promise/sendPasswordResetEmail) will help, I'm sure
  - [x] SignUpForm: seems this functionality is broken. fix it then error handling
- [x] Query & display all reports that a signed in user is allowed to see (refer to `array-contains` snippet that's in the notebook)
- [x] check out the TODO's in the codebase
- [ ] separate grid components into own pages
  - [x] ~~my reports is done~~
  - [ ] organisation reports
- [ ] separate dashboard nav into its own component.
- [ ] persistent nav(collapsable) + basic layout
- [ ] fix build errors

# architecture
- initial firebase setup was done following [this](https://betterprogramming.pub/implement-user-authentication-with-next-js-and-firebase-fb9414adba08) tutorial
- [better tutorial](https://www.youtube.com/watch?v=awd_oYcmrRA) to follow for next project

# backlog
- [ ] button situation with the forms has to be addressed, if I fill in a form and press enter, nothing happens. can't go to production with this.
- [ ] "Cannot read property 'uid' of null" when trying to login