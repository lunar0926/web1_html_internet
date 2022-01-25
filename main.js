var http = require('http');
var fs = require('fs');
var url = require('url');
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
  
    if(pathname==='/'){
      // queryData.id가 undefined인 경우
      if(queryData.id===undefined){ 

        fs.readdir('../data', function(error, filelist){
          // 파일 경로는 현재 실행중인 파일을 기준으로 상대적으로 지정해줘야 함. 
          // 파일 목록을 가져온다음 function을 실행시킴. 
          console.log(filelist);
          var title = 'Welcome';
          var description = 'This is Node.js';
          var list = '<ul>';
          // 반복문으로 filelist 받아오기
          var i = 0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list + '</ul>';

          var template = `
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
          })
        
        
      } else {
        fs.readdir('../data', function(error, filelist){
          // 파일 경로는 현재 실행중인 파일을 기준으로 상대적으로 지정해줘야 함. 
          // 파일 목록을 가져온다음 function을 실행시킴. 
          var list = '<ul>';
          // 반복문으로 filelist 받아오기
          var i = 0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list + '</ul>';
          fs.readFile(`../data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var template = `
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200);
            response.end(template);
          });
        }); 
      }
      // 정상적으로 pathname이 / 인 경우
    
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
    // pathname이 /이 아니고 다른 경우);


});
app.listen(3000);