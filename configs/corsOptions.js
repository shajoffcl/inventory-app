module.exports = {
     origin: (origin, callback) => {
          // Allow 'null' origin for local testing (e.g., file://) during development
          const allowedOrigins = [
            'http://localhost:3000',
            'https://mnnj21qg9l.execute-api.us-east-1.amazonaws.com',
            'null' // Temporarily allow 'null' for local file testing (remove in production)
          ];
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin || '*');
          } else {
            callback(new Error('Not allowed by CORS'));
          }
     }, // Specify allowed origins
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
     allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
     credentials: true, // Enable if you need to send cookies or auth headers
     preflightContinue: false
}