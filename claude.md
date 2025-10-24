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
- **SCSS Migration**: All SCSS removed, migrated to styled-components
- **TypeScript Build**: All TypeScript compilation errors resolved
- **Component Consolidation**: Removed `/packages/ui` folder, moved components to emporium package

### 🚧 In Progress
- **NextJS Integration**: Migrating to use NextJS as primary frontend
  - ✅ TypeScript compilation working
  - ⚠️ SSR runtime issues with legacy app (expected)
  - Next: Make `/emporium` page client-side only

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
1. **Fix SSR Issues**: Make `/emporium` page client-side only with `'use client'`
2. **Remove Nx dependency**: Migrate legacy app away from Nx
3. **Simplify dev setup**: Single port, no legacy build system
4. **Clean up SCSS remnants**: Remove `.scss.old` files once verified

### Future Enhancements
- Real-time updates with Socket.io
- Profile page with Discord avatar
- Token refresh mechanism
- Additional auth providers (GitHub, Google)
- Package upgrades (Nx → latest, Bootstrap 4 → 5)
- Complete migration to styled-components for all component styles

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
- ✅ SCSS completely removed from build
- ✅ TypeScript build errors resolved
- ✅ Component architecture simplified

## 📝 Recent Migration Work (October 24, 2025)

### SCSS to styled-components Migration
- Renamed all 10 SCSS files to `.scss.old`
- Created `GlobalStyles.tsx` with all global CSS
- Converted component-specific styles (gear.tsx, critical.tsx)
- Integrated styled-components into both legacy app and NextJS

### TypeScript Cleanup
Fixed **50+ TypeScript errors** including:
- Component prop type mismatches (handleClose optional in 5 components)
- Missing ID state in edit mode (CustomSkills, CustomVehicles, CustomTalents)
- Data attribute conflicts (type → data-type)
- Type conversion issues (string → number for rarity)
- Selector type assertions (gearDice)
- Modal callback wrapping
- Firebase stub parameter updates
- Promise resolver fixes
- Redux action type assertions

### Component Architecture
- Moved `ControlButtonSet` and `DeleteButton` from UI package to emporium
- Removed `/packages/ui` folder entirely
- Updated all 10+ imports from `@emporium/ui` to new locations
- Fixed path aliases in tsconfig

---

**Last Updated**: October 24, 2025
**Stack**: React 18 + FeathersJS 5 + Postgres 16 + NextJS 16 + styled-components
