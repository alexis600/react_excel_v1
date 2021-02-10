const msalConfig = {
    auth: {
      clientId: "b1cacd28-4dd6-4f31-ba58-c77ab6eeb251",
      authority: "https://login.microsoftonline.com/common",
      redirectUri: "http://localhost:3000/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };

  // Add here scopes for id token to be used at MS Identity Platform endpoints.
  const loginRequest = {
    scopes: ["openid", "profile", "User.Read", "email"]
  };

  // Add here scopes for access token to be used at MS Graph API endpoints.
  const tokenRequest = {
    scopes: ["Mail.Read"]
  };