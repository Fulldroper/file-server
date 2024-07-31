---
title: "File Server"
description: "A simple cross-domain file server with support for multi-domain, ban system, and logging."
publishDate: "13 Jul 2021"
updatedDate: "13 Jul 2021"
tags: ["node.js", "web server", "multi-domain", "logging", "ban system"]
---
The purpose of the project is to create a web server that supports multiple domains, a ban system, and logging capabilities.

## Project Utility
This project is useful for serving files over HTTP with support for multiple domains, banning IP addresses, and logging requests.

## Project Description
The file server is implemented using Node.js and allows configuration for multiple domains, MIME types, and logging paths. It also supports banning specific IP addresses.

## Repository and Installation
Repository: [File Server on GitHub](https://github.com/Fulldroper/file-server)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/Fulldroper/file-server.git
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

### Setup
Edit the `settings.json` file to configure the server:
```json
{
    "serverPort":"1337",
    "homeDir":"home",
    "logsPath":"./",
    "hosts":["localhost","my.new.domen.com","192.168.0.1"],
    "types":{
        ".js":"text/javascript",
        ".txt":"text/plain",
        ".css":"text/css",
        ".json":"application/json",
        ".png":"image/png",
        ".jpg":"image/jpg",
        ".ico":"image/x-icon",
        ".wav":"audio/wav",
        ".mp4":"video/mp4",
        ".zip":"application/zip",
        ".rar":"application/x-rar-compressed",
        ".iso":"application/octet-stream"
    }
}
```

### Blocking an IP
Add the IP to `banlist.json`:
```json
[
    "192.168.0.1",
    "192.168.0.2"
]
```

### Adding a Domain
1. Add the domain to the `hosts` array in `settings.json`.
2. Create a folder named after the domain inside the `homeDir`.

## Algorithm
1. **Server Initialization:**
    ```javascript
    const http = require('http');
    const settings = require('./settings.json');
    // Initialize server with settings
    ```
2. **Request Handling:**
    ```javascript
    http.createServer((req, res) => {
        // Handle request based on domain and file type
    }).listen(settings.serverPort);
    ```
3. **Logging:**
    ```javascript
    const fs = require('fs');
    // Log request details
    fs.appendFile('log.txt', logData, (err) => {
        if (err) throw err;
    });
    ```
4. **Ban System:**
    ```javascript
    const banlist = require('./banlist.json');
    // Check if the requester's IP is in the banlist
    if (banlist.includes(req.connection.remoteAddress)) {
        res.writeHead(403);
        res.end('Access denied');
    }
    ```

## Skills Acquired
- Understanding of HTTP servers with Node.js
- Implementing multi-domain support
- Managing and processing logs
- IP banning mechanisms
