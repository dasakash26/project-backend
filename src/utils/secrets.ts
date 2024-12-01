import "dotenv/config";

const secrets = {
  port: process.env.PORT || 3000,
  dbURL: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || "secret",
  geminiApiKey: process.env.GEMINI_API_KEY,
};

const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.log(`>> ${varName} is not defined in environment variables.`);
  }
});

export default secrets;
