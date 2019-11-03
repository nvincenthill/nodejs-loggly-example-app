## Logging Errors with Loggly

### This is an example app written in Node.js with Express.js, Winston, and Loggly

This app sends a random status code or throws an error when it receives a request. To use:

1. `npm install`
2. Create a `.env` file:

```javascript
SUBDOMAIN = 'YOUR_SUBDOMAIN_HERE';
CUSTOMER_TOKEN = 'YOUR_TOKEN_HERE';
PORT = 'YOUR_PORT_HERE';
```

3. Call `npm start` to start the server.
4. Send HTTP GET requests to `localhost:YOUR_PORT_HERE` and verify Loggly is receiving your logs
