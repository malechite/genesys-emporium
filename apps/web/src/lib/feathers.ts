import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030'

// Create the Socket.io client
const socket = io(API_URL, {
  transports: ['websocket'],
  autoConnect: false, // Don't connect automatically
})

// Initialize Feathers client
const client = feathers()

// Configure Socket.io client
client.configure(socketio(socket))

export { client, socket }
export default client
