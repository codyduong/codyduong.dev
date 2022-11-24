import * as THREE from 'three';

import studio from '@theatre/studio';
studio.initialize();
studio.ui.hide();

if (process.env.THREED_DEBUG == 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const extension = require('@theatre/r3f/dist/extension');
  studio.extend(extension);
  studio.ui.restore();
}
