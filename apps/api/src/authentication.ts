import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { OAuthStrategy, OAuthProfile } from '@feathersjs/authentication-oauth';
import type { Application } from './declarations';
import { Knex } from 'knex';

// Discord OAuth profile structure
interface DiscordProfile extends OAuthProfile {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email?: string;
}

// Custom Discord strategy
class DiscordStrategy extends OAuthStrategy {
  async getEntityData(profile: DiscordProfile, existing: any, params: any) {
    const knex: Knex = this.app.get('knexClient');

    // Check if discord_auth entry exists
    const discordAuth = await knex('discord_auth')
      .where('discord_id', profile.id)
      .first();

    if (discordAuth) {
      // Update Discord auth info
      await knex('discord_auth')
        .where('discord_id', profile.id)
        .update({
          discord_username: profile.username,
          discord_discriminator: profile.discriminator,
          discord_avatar: profile.avatar,
          discord_email: profile.email,
          access_token: params.accessToken,
          refresh_token: params.refreshToken,
          updated_at: knex.fn.now()
        });

      // Return the existing user
      return knex('users').where('id', discordAuth.user_id).first();
    }

    // Create new user
    const [newUser] = await knex('users')
      .insert({
        email: profile.email || `${profile.username}@discord.local`,
        username: profile.username,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      })
      .returning('*');

    // Create Discord auth entry
    await knex('discord_auth')
      .insert({
        user_id: newUser.id,
        discord_id: profile.id,
        discord_username: profile.username,
        discord_discriminator: profile.discriminator,
        discord_avatar: profile.avatar,
        discord_email: profile.email,
        access_token: params.accessToken,
        refresh_token: params.refreshToken,
        created_at: knex.fn.now(),
        updated_at: knex.fn.now()
      });

    return newUser;
  }

  async getRedirect(data: any, params: any) {
    // Redirect to frontend with token
    const { accessToken } = data;
    return `http://localhost:4200?token=${accessToken}`;
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('discord', new DiscordStrategy());

  app.use('authentication', authentication);

  app.service('authentication').hooks({
    before: {
      create: [],
      remove: []
    },
    after: {
      create: [],
      remove: []
    }
  });
};
