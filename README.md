# Getting Started

1. Install NodeJS via Homebrew (if it's not already)  
``` brew install node```  
1. Install bower (http://bower.io/)
``` npm install bower -g```
1. Install bower-installer 
``` npm install bower-installer -g```
1. Run bower in same folder as your bower.json
``` bower install```
1. Run bower-installer to get the key files into your app (i.e. src) folder
``` bower-installer ```
1.  Now look in app/ -- should see these folders which contain the bower managed dependencies
    * app/js
    * app/css
1.  There's also a folder called bower_components which is the local copy of ALL the files for each dependency
1.  Bower.json is the file that defines all this stuff (for more info read up on bower itself)
1.  To add a new dependency to bower (e.g. fakerest)
``` bower install fakerest --save-dev```
1.  The --save-dev part adds that dependency to your bower.json w/ the appropriate version
1.  To get the files ALSO added to your app/js or app/css folders, you need to manually update bower.json in the install section (for bower-installer)


## Other Ideas For Dev Workflow

1.  Install npm serve (https://www.npmjs.com/package/serve) -- This is what Sean is using on this repo, fwiw
1.  Use tsc w/ the tsconfig.json file to watch for changes and auto-compile (if you use not arguments it watches for any changes and recompiles when it sees them)
```tsc```
