declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    JWT_SECRET: string;
    REFRESH_SECRET: string;
    ATLAS_URI: string;
    NEXT_PUBLIC_PAYSTACK_KEY: string;
    NEXT_PUBLIC_PAYSTACK_TEST: string;
  }
}
