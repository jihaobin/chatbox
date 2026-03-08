export default () => ({
  openai: {
    apiKey: process.env.OPENAI_API_KEY || 'sk-L72C4WgJg8D64WVVJxU2JIMhlADOupz0',
    model: process.env.OPENAI_MODEL || 'gpt-5.4',
    titleModel: process.env.OPENAI_TITLE_MODEL || 'gpt-4o-mini',
    reasoningModel: process.env.OPENAI_REASONING_MODEL || 'gpt-4o-mini',
    reasoningEffort: process.env.OPENAI_REASONING_EFFORT || 'medium',
    baseURL:
      process.env.OPENAI_BASE_URL || 'https://codex-api.packycode.com/v1',
    temperature: Number(process.env.OPENAI_TEMPERATURE) || 0.7,
    maxTokens: Number(process.env.OPENAI_MAX_TOKENS) || 2000,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  app: {
    port: Number(process.env.PORT) || 3001,
    env: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },
});
