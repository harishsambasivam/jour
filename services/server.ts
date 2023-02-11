import { app } from "./app";
import { logger } from "./utils/logger";

const port = 3000;

app.listen(port, () => {
  logger.info(`server started on PORT ${port}!`);
});
