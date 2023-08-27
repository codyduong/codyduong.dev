import server from './server';

const port = parseInt(process.env.PORT || '8080');

server.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
