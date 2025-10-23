import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'
import io from 'socket.io-client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030'

// Create the Socket.io client
const socket = io(API_URL, {
  transports: ['websocket'],
  autoConnect: true, // Connect automatically when client is used
})

// Initialize Feathers client
const client = feathers()

// Configure Socket.io client
client.configure(socketio(socket))

// Configure authentication
client.configure(authentication({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  storageKey: 'feathers-jwt'
}))

export { client, socket }
export default client
