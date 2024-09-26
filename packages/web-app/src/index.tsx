import { createRoot } from 'react-dom/client';

import { Root } from 'src/containers/Root/Root';
import { getLogger } from 'src/utils/getLogger';

window.config = { logLevel: process.env.LOG_LEVEL };

function startApp(): void {
  const logger = getLogger(process.env.PKG_NAME as string);

  logger.info('Starting app...');
  const container = document.getElementById('app-root')!;
  const root = createRoot(container);
  root.render(<Root />);
}

startApp();
