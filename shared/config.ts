const apiSchema = process.env.EXPO_PUBLIC_API_SCHEMA
const apiHost = process.env.EXPO_PUBLIC_API_HOST
const apiPort = process.env.EXPO_PUBLIC_API_PORT

export const config = {
  apiUrl: `${apiSchema}://${apiHost}:${apiPort}`,
}