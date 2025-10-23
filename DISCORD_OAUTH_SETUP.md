# Discord OAuth Setup Guide

## 1. Create a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"**
3. Give it a name (e.g., "Genesys Emporium")
4. Click **"Create"**

## 2. Configure OAuth2

1. In the left sidebar, click **"OAuth2"**
2. Click **"Add Redirect"** and add:
   ```
   http://localhost:3030/oauth/discord/callback
   ```
3. For production, add your production URL:
   ```
   https://yourdomain.com/oauth/discord/callback
   ```
4. Click **"Save Changes"**

## 3. Get Your Credentials

1. In the **"OAuth2"** section, you'll see:
   - **Client ID** - Copy this
   - **Client Secret** - Click **"Reset Secret"** if needed, then copy it

2. Update your `.env` file with these values:
   ```env
   DISCORD_CLIENT_ID=your_actual_client_id_here
   DISCORD_CLIENT_SECRET=your_actual_client_secret_here
   JWT_SECRET=generate-a-random-secret-key-here
   ```

## 4. Generate a JWT Secret

For the JWT_SECRET, generate a secure random string. You can use:

```bash
# Option 1: Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Option 2: OpenSSL
openssl rand -hex 64
```

## 5. Test the Setup

1. Restart the API server:
   ```bash
   cd apps/api
   yarn dev
   ```

2. Visit the OAuth URL in your browser:
   ```
   http://localhost:3030/oauth/discord
   ```

3. You should be redirected to Discord to authorize the app

## 6. OAuth Flow

### Backend Flow:
1. User clicks "Login with Discord" → redirects to `/oauth/discord`
2. Discord redirects back to `/oauth/discord/callback` with code
3. FeathersJS exchanges code for Discord profile
4. Server creates/updates user and discord_auth records
5. Server generates JWT token
6. Server redirects to frontend with token: `http://localhost:4200?token=JWT_TOKEN`

### Frontend Flow:
1. React app extracts token from URL
2. Stores token in localStorage
3. Includes token in all API requests
4. Token expires after 7 days (configured in app.ts)

## Database Schema

The Discord auth system uses two tables:

### `users` (Core user table)
- `id` - Primary key
- `email` - User email
- `username` - Display name
- `created_at`, `updated_at`

### `discord_auth` (Auth provider table)
- `id` - Primary key
- `user_id` - Foreign key to users.id
- `discord_id` - Discord user ID (unique)
- `discord_username` - Discord username
- `discord_discriminator` - Discord #tag
- `discord_avatar` - Avatar hash
- `discord_email` - Email from Discord
- `access_token` - OAuth access token
- `refresh_token` - OAuth refresh token
- `created_at`, `updated_at`

This separation allows you to add other auth providers (GitHub, Google, etc.) in the future by creating additional `*_auth` tables that reference `users.id`.

## Troubleshooting

### "Invalid OAuth2 redirect_uri"
- Make sure the callback URL in Discord matches exactly: `http://localhost:3030/oauth/discord/callback`
- Check for trailing slashes

### "Client credentials are invalid"
- Double-check your CLIENT_ID and CLIENT_SECRET in `.env`
- Make sure to restart the API server after changing `.env`

### Token not working
- Check JWT_SECRET is set in `.env`
- Token expires after 7 days by default
- Clear localStorage and login again
