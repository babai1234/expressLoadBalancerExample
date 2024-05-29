// Import required modules
const express = require("express");
const os = require("os");

// Create an instance of an Express app
const app = express();

// Define a port for the server to listen on
const PORT = 3000;

// Function to get the IP address of the host machine
function getHostIpAddress() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            // Skip over non-IPv4 and internal (i.e., 127.0.0.1) addresses
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "0.0.0.0"; // Fallback address if no external address is found
}

// Define a route handler for the root URL
app.get("/", (req, res) => {
    // Get the host machine's IP address
    const hostIpAddress = getHostIpAddress();

    // Create an HTML document containing the IP address
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Server IP Address</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding-top: 50px; }
        h1 { color: #333; }
      </style>
    </head>
    <body>
      <h1>Your Server IP Address is: ${hostIpAddress}</h1>
    </body>
    </html>
  `;

    // Send the HTML document as the response
    res.send(htmlContent);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    const hostIpAddress = getHostIpAddress();
    console.log(`Server is running on http://${hostIpAddress}:${PORT}`);
});
