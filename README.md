## Deployment Link

Deploy your project on Netlify/GitHub pages/etc and put your deployed link here.
Link:

# Instruction

You need to create a Lyrics app to show song lyrics. You are free to design the app as per your wishes. The only core requirement is that it should be usable from a user's perspective.

# Features

- User should be able to search songs based on artist name or song title words.
- On `Search` button click event, show list of matched songs based on user input.
- Support Pagination functionality. User should be able to go to next page and previous page.
- On `Show Lyrics` button click event, show that song's lyrics.
- There's an `assets` folder. You may use the background if you like it. Or you can skip it.

# Lyrics API Document

https://lyricsovh.docs.apiary.io/#

Endpoint to get song suggestions is not mentioned in API doc. mentioning it here.
https://api.lyrics.ovh/suggest/inputQuery

`inputQuery` is path parameter. Replace `inputQuery` with actual word(ex. stairway)

The above API does not return data when it is under load. You are free to look for a different API service or handle the error with a re-try feature.

# Additional feature

- You will get more points for writing test cases

# Restrictions

- You can use vanilla HTML, CSS, and JavaScript to build this application.
  - Or you can use React. Choose one and stick with it. You can use create-react-app if you want to use React.
- Development libraries and dependencies are allowed and recommended
  For example:
  - Jest + helpers(for testing purpose)
  - ESLint + Airbnb (for linting purpose)
- Do not remove or rename existing files and folder. you can add new files and folder though.

# Commands

- Run `npm run develop` to run app locally (if you are using pure html+css+JS) otherwise use create-react-app.
