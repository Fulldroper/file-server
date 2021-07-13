const http=require('http');
const fs=require('fs');
const path=require('path');
const settings = require('./settings.json')
const banlist = require('./banlist.json')
http.createServer((req,res)=>{
    var url = req.url;
    var host = new RegExp('([^:}]+).*$').exec(settings.serverPort == '80' ? req.headers.host+':80':req.headers.host)[1];
    var ip = req.connection.remoteAddress.slice(7);
    var filePath = url=='/'?'/index.html':url;
    var extname = path.extname(filePath);
    var contentType = extname == '.html' ?'text/html':settings.types[extname];
    const RegExpCORS = /(^\/CORS-PROXY\/http:\/\/.*\..*$|^\/CORS-PROXY\/https:\/\/.*\..*$)/
    const RegExpCORSURL = /^.*CORS-PROXY\/([^$}]+)$/

    if(banlist.find(el=>el==ip) !== undefined){
        res.writeHead(500,{'Content-Type':'text/plain'});
        res.end()
    }
    //settings.logsPath
    fs.appendFile(
        `${settings.logsPath}log.txt`,`,{"dom":"${host}","data":"${(new Date).toISOString()}","ip":"${ip}","req":"${url}"}`,()=>console.log(`{"dom":"${host}","data":"${(new Date).toISOString()}","ip":"${ip}","req":"${url}","${req.headers["user-agent"]}"}`))  
    if (req.url == '/_logs' && host == 'localhost') {
        fs.readFile(`${settings.logsPath}log.txt`,(error,content)=>{
            if(error){
                    res.writeHead(500);
                    res.end('Error 500: Sorry, check with the site admin for error: '+error.code+' ..\n');
            }else{
                res.writeHead(200,{'Content-Type':"application/json"});
                res.end(`[${content.toString().substring(1)}]`,'utf-8');
            }
        })
    }else if( settings.CORSP && RegExpCORS.test(req.url) && RegExpCORS.test(req.url) !== undefined && host == 'localhost'){
        res.writeHead(200,
            {
                'Content-Type':'text/plain',
                'Access-Control-Allow-Origin':'*'
            });
        var request = require("request");
        request({
        uri: RegExpCORSURL.exec(req.url)[1],
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 8.0; …) Gecko/20100101 Firefox/30.0'
        }
        }, (error, response, body)=>{
            if (body !== undefined) {
                res.end(body.toString(),'utf-8');
            }else{
                res.end('Error 404','utf-8');
                console.log("err")
            }
        });
        
        
        console.log("corss")
    }else if (settings.hosts.some(n=>n==host)){
        filePath=settings.homeDir+'/'+host+filePath;
        try {
            if (new RegExp('^video\/.*$').exec(contentType)[0]) {
                var stat=fs.statSync(filePath)
                var fileSize=stat.size
                var range=req.headers.range
                if(range){
                    const parts=range.replace(/bytes=/,"").split("-")
                    const start=parseInt(parts[0],10)
                    const end=parts[1]?parseInt(parts[1],10):fileSize-1
                    const chunksize=(end-start)+1
                    const file=fs.createReadStream(path,{start,end})
                    const head={
                      'Content-Range':`bytes ${start}-${end}/${fileSize}`,
                      'Accept-Ranges':'bytes',
                      'Content-Length':chunksize,
                      'Content-Type':contentType,
                    }
                    res.writeHead(206,head);
                    file.pipe(res);
                  }else{
                    const head={
                      'Content-Length':fileSize,
                      'Content-Type':contentType,
                    }
                    res.writeHead(200,head)
                    fs.createReadStream(path).pipe(res)
                  }
            }
        }catch(e){
            if (filePath=='./index.html') {
                res.writeHead(200,{'Content-Type':contentType});
                res.end('u welcome','utf-8');
            }else{ 
                fs.readFile(filePath,(error,content)=>{
                    if(error){
                        if(error.code=='ENOENT'){
                            res.writeHead(404,{'Content-Type':contentType == undefined? 'text/html': 'text/html'});
                            res.end('Error 404: File not found','utf-8');
                        }else{
                            res.writeHead(500);
                            res.end('Error 500: Sorry, check with the site admin for error: '+error.code+' ..\n');
                        }
                    }else{
                        res.writeHead(200,{'Content-Type':contentType});
                        res.end(content,'utf-8');
                    }
                }
            )}  
        }
    }
}).listen(settings.serverPort);
console.log(`Server running at port ${settings.serverPort}`);