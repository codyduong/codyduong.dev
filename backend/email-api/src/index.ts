import server from './server';

const port = 3003

server.listen(port, () => {
  console.log(`\
  🚀 App started http://localhost:${port}
    `);
});