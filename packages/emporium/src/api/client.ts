import { feathers } from '@feathersjs/client';
import rest from '@feathersjs/rest-client';
import axios from 'axios';
import socketio from '@feathersjs/socketio-client';
import io from 'socket.io-client';

// Get API URL from environment or default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3030';

// Create the Feathers application
const app = feathers();

// Use REST for API calls (with axios)
const restClient = rest(API_URL);
app.configure(restClient.axios(axios));

// Optionally use Socket.io for real-time updates
// Uncomment if you want real-time functionality
// const socket = io(API_URL);
// app.configure(socketio(socket));

// Export the configured client
export default app;

// Export typed service helpers for better TypeScript support
export const userService = () => app.service('users');
export const characterService = () => app.service('characters');
export const characterDataService = () => app.service('character-data');
export const userSettingsService = () => app.service('user-settings');
export const vehicleService = () => app.service('vehicles');
export const vehicleDataService = () => app.service('vehicle-data');

// Custom content services
export const customArchetypesService = () => app.service('custom-archetypes');
export const customArchetypeTalentsService = () => app.service('custom-archetype-talents');
export const customArmorService = () => app.service('custom-armor');
export const customCareersService = () => app.service('custom-careers');
export const customGearService = () => app.service('custom-gear');
export const customMotivationsService = () => app.service('custom-motivations');
export const customSettingsService = () => app.service('custom-settings');
export const customSkillsService = () => app.service('custom-skills');
export const customTalentsService = () => app.service('custom-talents');
export const customVehiclesService = () => app.service('custom-vehicles');
export const customWeaponsService = () => app.service('custom-weapons');
