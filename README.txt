This simple utility provides an easy way to view the various parameters sent with HTTP POST and GET requests. 

Just run the file using `sudo nodejs main.js` and point your browdser to http://localhost:8083 (Or configure your webserver as a reverse proxy).

Also included in this repository is an init configuration file for Debian and Ubuntu systems, which will run the form inspector as a service in the background.
Note that you may have to change the path the the forminspector javascript file if you aren't going to store it in /etc/node/forminspector.js.

By changing the value of the variable PORT, you can change the port the server listens on.

A live demonstration can be seen at http://forminspector.ctis.me.

Enjoy!
