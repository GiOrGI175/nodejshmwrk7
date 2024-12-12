import nodefetch from 'node-fetch';
import { readFile, writeFile } from './utiles/utiles.js';
import http from 'http';

async function main() {
  const res = await nodefetch('https://dummyjson.com/users');

  const data = await res.json();

  writeFile('users.json', data, true);
}

main();

const server = http.createServer(async (req, res) => {
  const users = await readFile('users.json');

  if (req.url === '/users') {
    res.setHeader('Content-type', 'application/json');
    res.write(JSON.stringify(users));
    res.end();
  } else if (req.url === '/home') {
    res.setHeader('Content-type', 'application/html');
    res.write('<h1>Home Page</h1>');
    res.end();
  } else {
    res.statusCode = 404;
    res.setHeader('Content-type', 'text/plain');
    res.write('Page not found');
    res.end();
  }
  res.write('Hello World');
  res.end();
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
