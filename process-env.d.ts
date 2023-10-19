declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WC_PROJECT_ID: string
      NEXT_PUBLIC_VALIDATION_CLOUD_KEY: string
      // add more environment variables and their types here
    }
  }
}
