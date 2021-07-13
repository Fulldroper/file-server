#Simple cross domen file server over http

##how to install?

#####get repo
>```git clone https://github.com/Fulldroper/file-server.git```
#####get all packages
>```npm install```

##how to setup?

####change settings inside file `settings.json`
```
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
where:
1. `serverPort` - is a port of server
2. `homeDir` - is a folder of files where `%homeDir%/%domen_name%/index.html` is `https://%domen_name%/index.html`
3. `logsPath` - path of log file `log.txt`
4. `hosts` - list of allowed domens and ip`s
5. `types` - list of mime types alowed on server

##how to block ip?
Just add ip like a string to file `banlist.json`

example:
```
[
    "192.168.0.1",
    "192.168.0.2"
]
```
##add domen?
1. add name of domen to file `settings.json` inside `hosts`
2. create folder with name as name domen inside folder `%homeDir%`

##how check logs?
![logs example](https://cdn.discordapp.com/attachments/834769719823302666/864558052929699880/unknown.png)
open file `logs.html` **or** open [`https://localhost/logs.html`](https://localhost/logs.html)
![logs.html](https://media.discordapp.net/attachments/834769719823302666/864559120065232896/unknown.png?width=690&height=508)