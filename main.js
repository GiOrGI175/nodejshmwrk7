import nodefetch from 'node-fetch';
import { readFile, writeFile } from './utiles/utiles.js';
import http from 'http';
import url from 'url';
import querystring from 'querystring';

async function main() {
  const res = await nodefetch('https://dummyjson.com/users');

  const data = await res.json();

  const users = data.users;

  writeFile('users.json', users, true);
}

main();

const server = http.createServer(async (req, res) => {
  const users = await readFile('users.json', true);

  // console.log(users);

  const parsedUrl = url.parse(req.url);
  const queryParams = querystring.parse(parsedUrl.query);
  // console.log(parsedUrl, 'parsedUrl');
  // console.log(queryParams, 'queryParams');

  if (parsedUrl.pathname === '/users') {
    // console.log(queryParams.firstName, 'queryParams.firstName');
    if (queryParams.firstName) {
      const filteredUsers = users.filter((item) =>
        item.firstName.includes(queryParams.firstName)
      );
      res.setHeader('Content-type', 'application/json');
      res.write(JSON.stringify(filteredUsers));
      res.end();
      return;
    }

    res.setHeader('Content-type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
    return;
  }
  if (req.url === '/home') {
    res.setHeader('Content-type', 'text/html');
    res.write('<h1>Home Page</h1>');
    res.end();
    return;
  }

  res.write('Hello World');
  res.end('hi');
});

server.listen(5001, () => {
  console.log('Server running on http://localhost:5001');
});
