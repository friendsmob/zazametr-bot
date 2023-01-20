declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      DB_URI: string;
    }
  }
}

export {};
