import path from 'path';
import React from 'react';
import { createReactAppExpress } from '@cra-express/core';

let App = require('../src/index').default;
const clientBuildPath = path.resolve(__dirname, '../client');

const app = createReactAppExpress({
  clientBuildPath,
  universalRender: (req, res) => <App />,
});

if (module.hot) {
  module.hot.accept('../src/index', () => {
    App = require('../src/index').default;
    console.log('✅ Server hot reloaded App');
  });
}

export default app;
