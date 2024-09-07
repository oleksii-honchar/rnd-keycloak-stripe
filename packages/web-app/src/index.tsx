import { createRoot } from "react-dom/client";
// @ts-ignore
import { LoggerService } from "@ciklum/logan";

import { Root } from "src/containers/Root/Root.tsx";

LoggerService.setGlobalTitle(process.env.PKG_NAME);

window.config = { logLevel: process.env.LOG_LEVEL };
const logger = new LoggerService();
logger.setTitle("index");

function startApp(): void {
  logger.info("Starting app...");
  const container = document.getElementById("app-root")!;
  const root = createRoot(container);
  root.render(<Root />);
}

startApp();
