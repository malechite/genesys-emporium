import type { Application } from '../declarations';
import { users } from './users/users.service';
import { characters } from './characters/characters.service';
import { characterData } from './character-data/character-data.service';
import { userSettings } from './user-settings/user-settings.service';
import { vehicles, vehicleData } from './vehicles/vehicles.service';
import {
  customArchetypes,
  customArchetypeTalents,
  customArmor,
  customCareers,
  customGear,
  customMotivations,
  customSettings,
  customSkills,
  customTalents,
  customVehicles,
  customWeapons
} from './custom-content/custom-content.service';

export const services = (app: Application) => {
  // Core services
  app.configure(users);
  app.configure(characters);
  app.configure(characterData);
  app.configure(userSettings);

  // Vehicle services
  app.configure(vehicles);
  app.configure(vehicleData);

  // Custom content services
  app.configure(customArchetypes);
  app.configure(customArchetypeTalents);
  app.configure(customArmor);
  app.configure(customCareers);
  app.configure(customGear);
  app.configure(customMotivations);
  app.configure(customSettings);
  app.configure(customSkills);
  app.configure(customTalents);
  app.configure(customVehicles);
  app.configure(customWeapons);
};
