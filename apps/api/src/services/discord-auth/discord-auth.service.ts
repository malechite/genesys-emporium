import { KnexService } from '@feathersjs/knex';
import type { Application } from '../../declarations';

export class DiscordAuthService extends KnexService {
  constructor(app: Application) {
    super({
      Model: app.get('knexClient'),
      name: 'discord_auth'
    });
  }

  // Find Discord auth by discord_id
  async findByDiscordId(discordId: string) {
    const result = await this.Model('discord_auth')
      .where('discord_id', discordId)
      .first();
    return result;
  }

  // Find Discord auth by user_id
  async findByUserId(userId: number) {
    const result = await this.Model('discord_auth')
      .where('user_id', userId)
      .first();
    return result;
  }
}

export const discordAuth = (app: Application) => {
  app.use('discord-auth', new DiscordAuthService(app));
};
