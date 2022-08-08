const http = require('http')
const fs = require('fs')


let server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html')
        res.write(`
       <html>
         <head>
           <title>enter Message</title>
          </head>
          <body>
            <h1>Hello for my Node.js Server</h1>
            <form action="/message" method="post">
              <input type="text" name="message" id="m1">
              <button type="submit">Ok</button>
            </form>
          </body>
       </html>
   `)
      return res.end()
    }else if (url === '/message' && method === 'POST'){

        const body = []

        req.on('data',(chunk) => {
           body.push(chunk)
        })

        req.on('end',() => {
            const parsBody = Buffer.concat(body).toString()
            const message = parsBody.split('=')[1]
            fs.writeFileSync('message.txt',message)
        })

        res.statusCode = 302
        res.setHeader('Location','/')
        return res.end()
    }
});

server.listen(3000)


