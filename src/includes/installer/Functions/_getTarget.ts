import * as path from 'path';

import getAppRoot from './_getAppRoot';

function getTarget(): [location: string, name: string] {
  return [
    path.join(getAppRoot(), 'out', 'vs', 'workbench'),
    'workbench.desktop.main.css',
  ];
}

export default getTarget;
