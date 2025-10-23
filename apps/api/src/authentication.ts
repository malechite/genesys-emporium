import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import {
    OAuthStrategy,
    OAuthProfile,
    oauth
} from '@feathersjs/authentication-oauth';
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
        console.log(
            'getEntityData called with profile:',
            JSON.stringify(profile, null, 2)
        );
        console.log('getEntityData existing user:', existing);

        const knex: Knex = this.app!.get('knexClient');

        try {
            // If this is an existing user, update discord_auth and return user data
            if (existing) {
                console.log('Updating existing user discord_auth...');
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

                console.log('Updated discord_auth for existing user');
                return {
                    email: profile.email || existing.email,
                    username: profile.username
                };
            }

            // For new users, return the data needed to create the user
            // FeathersJS will create the user, then we'll add discord_auth in a hook
            console.log('Returning data for new user creation...');
            return {
                email: profile.email || `${profile.username}@discord.local`,
                username: profile.username,
                discordId: profile.id // Store Discord ID for future lookups
            };
        } catch (error) {
            console.error('Error in getEntityData:', error);
            throw error;
        }
    }

    async getRedirect(data: any, params: any) {
        // Redirect to frontend with token or error
        console.log(
            'OAuth redirect - full data:',
            JSON.stringify(data, null, 2)
        );
        console.log(
            'OAuth redirect - params:',
            JSON.stringify(params, null, 2)
        );

        // Check if this is an error
        if (data.name === 'GeneralError' || data.error) {
            console.error('OAuth error:', data);
            // Redirect to frontend with error
            const errorMessage = encodeURIComponent(
                data.data?.error || data.message || 'OAuth error'
            );
            return `http://localhost:3000/auth/callback?error=${errorMessage}`;
        }

        const { accessToken } = data;
        console.log('OAuth redirect - accessToken:', accessToken);

        if (!accessToken) {
            console.error('No access token in successful auth response!');
            return `http://localhost:3000/auth/callback?error=no_token`;
        }

        // URL encode the token to prevent corruption
        const encodedToken = encodeURIComponent(accessToken);
        return `http://localhost:3000/auth/callback?token=${encodedToken}`;
    }
}

export const authentication = (app: Application) => {
    const authentication = new AuthenticationService(app);

    authentication.register('jwt', new JWTStrategy());
    authentication.register('discord', new DiscordStrategy());

    app.use('authentication', authentication);

    // Configure OAuth - this creates the /oauth/:provider routes automatically
    app.configure(oauth());

    // Hook to create discord_auth entry after OAuth user creation
    app.service('users').hooks({
        after: {
            create: [
                async (context) => {
                    // Only run for OAuth authentication with Discord
                    const params = context.params as any;
                    if (
                        params.oauth?.provider === 'discord' &&
                        params.oauth?.profile
                    ) {
                        const user = context.result;
                        const profile = params.oauth.profile;
                        const knex: Knex = app.get('knexClient');

                        console.log(
                            'Creating discord_auth for new user:',
                            user.id
                        );

                        await knex('discord_auth').insert({
                            user_id: user.id,
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

                        console.log(
                            'discord_auth created for user:',
                            user.id
                        );
                    }

                    return context;
                }
            ]
        }
    });

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
