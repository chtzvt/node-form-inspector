This simple utility provides an easy way to view the various data sent in HTTP POST and GET requests, providing an 
easily readable/parseable JSON response. 

# Usage
Just run the file using `sudo nodejs main.js` and point your browser to http://localhost:8082 (Or configure your webserver as a reverse proxy).

Also included in this repository is an init configuration file for Debian and Ubuntu systems, which will run the form inspector as a service in the background.
Note that you may have to change the path to the javascript file if you aren't going to store it in /etc/node/forminspector.js. I wouldn't 
recommend using this, however, as there are many amazing alternatives to daemonizing Node. I suggest checking out [pm2](https://github.com/Unitech/pm2).

This utility supports [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).

# Configuration
By changing the value of the variable PORT, you can change the port the server listens on.

By changing ALLOW_EMPTY_REQS, you can choose whether or not empty requests should be processed or simply return an error. 

# Demo
A live demo can be seen at https://www.ctis.me/fi/.

Enjoy! :)
