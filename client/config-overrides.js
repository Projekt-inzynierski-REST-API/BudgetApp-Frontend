module.exports = function override(config, env) {
    // ... inne ustawienia
  
    if (config.devServer) {
      config.devServer.headers = {
        'Content-Security-Policy': "script-src 'self' 'unsafe-inline' https://apis.google.com",
      };
    }
  
    return config;
  };
  