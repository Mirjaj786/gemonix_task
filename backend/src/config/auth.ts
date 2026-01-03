const JWT_SECRET: string =
  process.env.JWT_SECRET ||
  "dskuksc-Mirjaj-Gemonix-secret-key-do-not-use-in-production";
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "7d";

if (!process.env.JWT_SECRET) {
  console.warn("Warning: process.env.JWT_SECRET is not set — use default val.");
}

export { JWT_SECRET, JWT_EXPIRES_IN };
