// import express from "express";
// import { Server } from "ws";
// import { fetchBlogPostsPeriodically } from "./blogFetcher";

// const app = express();
// const PORT = process.env.PORT || 8080;

// const server = app.listen(PORT, () => {
//   console.log(`Blog fetcher is running on port ${PORT}`);
// });

// const wss = new Server({ server });
// fetchBlogPostsPeriodically(wss);

// import express from "express";
import { fetchBlogPostsPeriodically } from "./blogFetcher";

// const app = express();
// const PORT = process.env.PORT || 8080;

// const server = app.listen(PORT, () => {
//   console.log(`Blog fetcher is running on port ${PORT}`);
// });

fetchBlogPostsPeriodically();
