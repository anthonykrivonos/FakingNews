var AlexaAppServer = require('alexa-app-server');

var instance = AlexaAppServer.start({
      server_root: __dirname,     // Path to root
      app_dir: "app",            // Location of alexa-app modules
      app_root: "/",        // Service root
      port: process.env.PORT || 3000      // Port to use
});
// 
// instance.stop();              // Stop the server
