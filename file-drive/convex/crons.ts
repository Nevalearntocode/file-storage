import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "clear archived files",
  { hours: 24 },
  internal.files.deleteFiles
);

export default crons