import { startServer } from "./server";

const port: string | number = process.env.PORT || 8080;
startServer(port as number);
