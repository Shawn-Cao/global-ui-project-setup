folder structure:
1. assets/   - runtime dependencies to deploy to CDNs
2. layouts/  - npm dependency for other projects, use require/import to use them in buildtime
3. config/   - config for this projects. config/variabled can be included in npm module to provider more stable APIs
4. scss/     - SASS source files
5. partials/ - HTML template source files

after 'npm install', either:

A. run 'npm publish' to build and publish ('npm run build' if you just want local build)
B. or run 'npm start' to build to human-readable format :-)

for the (temporary) error.html: just load the page and pass message you want in query. eg:
   redirect: error.html?message='Toggle Error!'

##Technical Details
1. this package has peer dependency on "bootstrap" & "font-awesome" which is provided here directly for now. //could change
