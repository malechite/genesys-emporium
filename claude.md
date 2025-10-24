# Genesys Emporium - Project Documentation

## 🚀 Quick Start

```bash
yarn dev    # Start everything (Docker DB, API, Legacy React App)
```

Visit http://localhost:4200 and log in with Discord!

## 📁 Project Structure

```
genesys-emporium/
├── apps/
│   ├── api/              # FeathersJS API (Port 3030)
│   ├── web/              # NextJS App (Port 3000) - Auth Gateway
│   └── db/               # Docker Compose wrapper
├── packages/
│   └── emporium/         # Legacy React App (Port 4200)
├── docs/                 # All documentation files
└── docker-compose.yml    # Postgres 16 database
```

## 🎯 Current Status

### ✅ Completed
- **Backend**: FeathersJS API with 20+ services
- **Database**: Postgres 16 with complete schema
- **Authentication**: Discord OAuth 2.0 fully functional
- **Legacy App**: React 18 app running on port 4200 with Discord auth
- **Dev Setup**: Turborepo orchestrating all services

### 🚧 In Progress
- **NextJS Integration**: Migrating to use NextJS as primary frontend
  - Currently: NextJS handles auth, redirects to legacy app (port 4200)
  - Goal: Integrate legacy app into NextJS

## 🔑 Architecture

### Current Setup
```
User → NextJS (port 3000) → Discord OAuth
                            ↓
                     Sets JWT token
                            ↓
        Redirects to Legacy App (port 4200)
                            ↓
              Legacy App uses JWT to call API
```

### Services
- **Postgres** (5432): Database
- **FeathersJS API** (3030): REST + WebSocket API
- **NextJS** (3000): Auth gateway
- **Legacy React** (4200): Main application (Nx + Webpack)

## 📚 Documentation

All detailed documentation is in the `/docs` folder:

- **[Quick Start Guide](docs/QUICK_START.md)** - Get up and running
- **[Discord OAuth Setup](docs/DISCORD_OAUTH_SETUP.md)** - Configure Discord auth
- **[Auth Implementation](docs/AUTH_IMPLEMENTATION_SUMMARY.md)** - How auth works
- **[Turborepo Setup](docs/TURBOREPO_SETUP.md)** - Dev environment details
- **[Session Complete](docs/SESSION_COMPLETE.md)** - Full migration history

## 🛠️ Development Commands

```bash
# Start all services
yarn dev              # Everything with Turborepo TUI
yarn dev:web          # Legacy React app only (port 4200)
yarn dev:api          # API server only (port 3030)
yarn dev:db           # Database only (Docker)

# Building
yarn build            # Build everything
yarn build:web        # Build legacy React app

# Database
yarn migrate          # Run migrations
yarn db:reset         # Reset database
yarn db:seed          # Seed data
```

## 🔐 Environment Variables

Required in `.env`:
```env
# Database
DATABASE_URL=postgresql://emporium:emporium_dev@localhost:5432/genesys_emporium

# API
API_PORT=3030
JWT_SECRET=<your-secret>

# Discord OAuth
DISCORD_CLIENT_ID=<your-client-id>
DISCORD_CLIENT_SECRET=<your-client-secret>
```

## 🎯 Next Steps

### Immediate Goals
1. **Remove Nx dependency**: Migrate legacy app away from Nx
2. **Integrate into NextJS**: Move legacy React code into NextJS
3. **Simplify dev setup**: Single port, no legacy build system

### Future Enhancements
- Real-time updates with Socket.io
- Profile page with Discord avatar
- Token refresh mechanism
- Additional auth providers (GitHub, Google)
- Package upgrades (Nx → latest, Bootstrap 4 → 5)

## 📊 API Endpoints

**Core Services**:
- `/users` - User management
- `/characters` - Character list
- `/character-data` - Character attributes (24 types)
- `/user-settings` - User preferences

**Custom Content** (11 types):
- `/custom-archetypes`, `/custom-archetype-talents`
- `/custom-armor`, `/custom-careers`, `/custom-gear`
- `/custom-motivations`, `/custom-settings`
- `/custom-skills`, `/custom-talents`
- `/custom-vehicles`, `/custom-weapons`

**Vehicles**:
- `/vehicles` - Vehicle management
- `/vehicle-data` - Vehicle attributes (4 types)

## 🧪 Testing

**Test the full flow**:
1. Start services: `yarn dev`
2. Visit http://localhost:4200
3. Click "Login with Discord"
4. Authorize on Discord
5. You should be logged in and see your username

## 🐛 Troubleshooting

### Port Conflicts
```bash
lsof -i :3000  # NextJS
lsof -i :3030  # API
lsof -i :4200  # Legacy React
lsof -i :5432  # Database
```

### Database Issues
```bash
docker compose down -v    # Reset database
docker compose up -d      # Start fresh
yarn db:reset             # Reset schema
```

### Auth Not Working
- Check Discord app credentials in `.env`
- Verify JWT_SECRET is set
- Check API logs for errors
- Clear localStorage and try again

## 📦 Tech Stack

**Frontend**:
- React 18
- Redux + Redux Thunk
- Reactstrap (Bootstrap 4)
- React Router v6

**Backend**:
- FeathersJS 5
- Koa framework
- Postgres 16
- Knex (migrations)

**Auth**:
- Discord OAuth 2.0
- JWT tokens (7-day expiration)

**Dev Tools**:
- Turborepo (orchestration)
- Nx (legacy build)
- TypeScript
- Docker Compose

## 🎊 Success Metrics

- ✅ Firebase completely removed
- ✅ 20+ FeathersJS endpoints working
- ✅ Discord OAuth fully functional
- ✅ Postgres database with comprehensive schema
- ✅ One-command dev setup (`yarn dev`)
- ✅ Complete documentation

---

**Last Updated**: October 23, 2025
**Stack**: React 18 + FeathersJS 5 + Postgres 16 + NextJS 16
