# 🚀 Quick Start - Genesys Emporium

## Start Everything

```bash
yarn dev
```

This starts:
- 🐘 Postgres (Docker)
- 🔧 API Server (port 3030)
- ⚛️ React App (port 4200)

## URLs

| Service | URL |
|---------|-----|
| **Web App** | http://localhost:4200 |
| **API** | http://localhost:3030 |
| **Database** | localhost:5432 |

## Keyboard Shortcuts in TUI

- **Tab** / **Shift+Tab** - Switch between services
- **Ctrl+C** - Stop all services

## Common Commands

```bash
# Development
yarn dev              # Start all services
yarn dev:web          # Start only web
yarn dev:api          # Start only API
yarn dev:db           # Start only database

# Building
yarn build            # Build everything
yarn build:web        # Build web only

# Database
cd apps/api
yarn migrate          # Run migrations
yarn migrate:rollback # Rollback migrations
```

## First Time Setup

1. **Discord OAuth** (Required for login)
   - Already configured in `.env`
   - Discord App: https://discord.com/developers/applications/1430941123093991648

2. **Start everything**
   ```bash
   yarn dev
   ```

3. **Visit app**
   - Open http://localhost:4200
   - Click "Login with Discord"
   - Done! 🎉

## Troubleshooting

### Port in use
```bash
lsof -i :3030  # Check API port
lsof -i :4200  # Check web port
lsof -i :5432  # Check DB port
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

- **Frontend**: React 18 + Redux + Reactstrap
- **Backend**: FeathersJS 5 + Koa
- **Database**: Postgres 16
- **Auth**: Discord OAuth 2.0
- **Build**: Nx + Turborepo

## Documentation

- `SESSION_COMPLETE.md` - Full session summary
- `DISCORD_OAUTH_SETUP.md` - Discord setup guide
- `TURBOREPO_SETUP.md` - Turborepo details
- `AUTH_IMPLEMENTATION_SUMMARY.md` - Auth details

## Need Help?

1. Check documentation files above
2. Check `.env` has correct credentials
3. Make sure Docker is running
4. Make sure ports are available

---

**Everything should work with just `yarn dev`!** 🎉
