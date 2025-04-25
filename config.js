import { BASE_API_URL } from '@env'

export const config = {
    apiUrl: BASE_API_URL || 'http://192.168.0.108:5000', // Fallback URL if env is not set
}