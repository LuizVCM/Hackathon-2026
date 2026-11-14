import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store'

const baseUrl =
  process.env.EXPO_PUBLIC_API_URL ??
  (Platform.OS === 'web'
    ? 'http://localhost:3000/api'
    // IP LAN do PC na rede Wi-Fi (ipconfig). Atualize aqui (ou use EXPO_PUBLIC_API_URL) se o IP mudar.
    : 'http://10.1.90.45:3000/api')

let token: string | null = null
const storageKey = 'consulta-mais-token'
export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message) }
}

export async function restaurarToken() {
  token = Platform.OS === 'web' ? sessionStorage.getItem(storageKey) : await SecureStore.getItemAsync(storageKey)
  return token
}

export async function salvarToken(valor: string | null) {
  if (Platform.OS === 'web') {
    if (valor) sessionStorage.setItem(storageKey, valor)
    else sessionStorage.removeItem(storageKey)
  } else if (valor) await SecureStore.setItemAsync(storageKey, valor)
  else await SecureStore.deleteItemAsync(storageKey)
  token = valor
}

export async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method, signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    })
    const data = await response.json()
    if (!response.ok) throw new ApiError(data.mensagem ?? 'Não foi possível concluir a solicitação.', response.status)
    return data as T
  } catch (error) {
    if (error instanceof TypeError || (error instanceof Error && error.name === 'AbortError')) {
      throw new Error('Não foi possível conectar. Verifique sua conexão e tente novamente.')
    }
    throw error
  } finally { clearTimeout(timeout) }
}
