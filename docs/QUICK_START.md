# 🚀 Quick Start - Genesys Emporium

## Start Everything

```bash
yarn dev
```

This starts:
- 🐘 Postgres (Docker) - port 5432
- 🔧 API Server - port 3030
- ⚛️ Emporium App - port 4200

## URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Emporium App** | http://localhost:4200 | Main application |
| **NextJS** | http://localhost:3000 | Auth gateway (optional) |
| **API** | http://localhost:3030 | Backend API |
| **Database** | localhost:5432 | Postgres |

## Keyboard Shortcuts in TUI

- **Tab** / **Shift+Tab** - Switch between services
- **Ctrl+C** - Stop all services

## Common Commands

```bash
# Development
yarn dev              # Start all services (recommended)
yarn dev:emporium     # Start only emporium app (port 4200)
yarn dev:nextjs       # Start only NextJS auth gateway (port 3000)
yarn dev:api          # Start only API (port 3030)
yarn dev:db           # Start only database (port 5432)

# Building
yarn build            # Build everything
yarn build:emporium   # Build emporium app only
yarn build:nextjs     # Build NextJS only

# Database
yarn migrate          # Run migrations
yarn migrate:rollback # Rollback migrations
yarn db:reset         # Reset database
yarn db:seed          # Seed test data
```

## First Time Setup

1. **Discord OAuth** (Required for login)
   - Make sure `.env` has Discord credentials
   - See [Discord OAuth Setup](DISCORD_OAUTH_SETUP.md) for details

2. **Start everything**
   ```bash
   yarn dev
   ```

3. **Login Flow (Two Options)**

   **Option A: Via Emporium Direct (Recommended)**
   - Open http://localhost:4200
   - Click "Login with Discord"
   - Authorize on Discord
   - You're logged in! 🎉

   **Option B: Via NextJS Auth Gateway**
   - Open http://localhost:3000
   - Click "Login with Discord"
   - After auth, redirects to http://localhost:4200
   - Done! 🎉

## Troubleshooting

### Port in use
```bash
lsof -i :3000  # NextJS
lsof -i :3030  # API
lsof -i :4200  # Emporium
lsof -i :5432  # Database
```

### Database not starting
```bash
docker compose down
docker compose up
```

### API won't connect to DB
```bash
# Check DB is running
docker ps | grep postgres

# Check logs
docker compose logs postgres
```

### Clear everything
```bash
# Stop all
Ctrl+C

# Clean Docker
docker compose down -v

# Clean node modules (if needed)
rm -rf node_modules
yarn install
```

## Stack

- **Frontend**: React 18 + Redux + Reactstrap (port 4200)
- **Auth Gateway**: NextJS 16 (port 3000, optional)
- **Backend**: FeathersJS 5 + Koa (port 3030)
- **Database**: Postgres 16 (port 5432)
- **Auth**: Discord OAuth 2.0
- **Build**: Nx (legacy) + Turborepo
- **Dev Tools**: Docker Compose, TypeScript

## Documentation

See the `/docs` folder for all documentation:

- `QUICK_START.md` - This file
- `MIGRATION_SUMMARY.md` - Recent changes and architecture
- `SESSION_COMPLETE.md` - Full migration history
- `DISCORD_OAUTH_SETUP.md` - Discord setup guide
- `TURBOREPO_SETUP.md` - Turborepo details
- `AUTH_IMPLEMENTATION_SUMMARY.md` - Auth details

Also check the root `CLAUDE.md` for a quick overview.

## Need Help?

1. Check documentation files above
2. Check `.env` has correct credentials
3. Make sure Docker is running
4. Make sure ports are available

---

**Everything should work with just `yarn dev`!** 🎉
