# Turborepo Development Environment

## 🚀 Quick Start

```bash
# Start everything (Docker, API, Web) with one command
yarn dev
```

This will start:
- 🐘 **Postgres** (via Docker Compose) on port 5432
- 🔧 **API Server** (FeathersJS) on port 3030
- ⚛️ **Web Dev Server** (React) on port 4200

## 📦 What is Turborepo?

Turborepo orchestrates your monorepo development with:
- ✅ **Parallel execution** - Runs multiple tasks at once
- ✅ **Smart caching** - Only rebuilds what changed
- ✅ **Task dependencies** - Ensures things run in order
- ✅ **Beautiful TUI** - Tabbed terminal interface

## 🎯 Available Commands

### Development
```bash
yarn dev          # Start all services (DB + API + Web) with TUI
yarn dev:web      # Start only the React dev server
yarn dev:api      # Start only the API server
yarn dev:db       # Start only the database
```

### Building
```bash
yarn build        # Build all workspaces
yarn build:web    # Build only the web app
```

### Other
```bash
yarn test         # Run tests
yarn lint         # Run linting
```

## 📂 Workspace Structure

```
genesys-emporium/
├── apps/
│   ├── api/              # FeathersJS API (@genesys-emporium/api)
│   │   └── package.json  # Scripts: dev, build, migrate
│   └── db/               # Docker Compose wrapper
│       └── package.json  # Scripts: db, db:down
├── packages/
│   └── emporium/         # React App (@genesys-emporium/web)
│       └── package.json  # Scripts: dev, build
├── turbo.json            # Turborepo configuration
└── package.json          # Root workspace orchestration
```

## ⚙️ Turborepo Configuration

### Task Pipeline (`turbo.json`)

```json
{
  "ui": "tui",  // Enable tabbed terminal UI
  "tasks": {
    "dev": {
      "dependsOn": ["^db"],  // Wait for DB before starting
      "cache": false,         // Don't cache dev servers
      "persistent": true      // Keep running
    },
    "db": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### Task Dependencies

```
┌─────────┐
│   db    │  Starts first (Docker Compose)
└────┬────┘
     │
     ├─────► api   (waits 3s for DB, then starts)
     │
     └─────► web   (starts immediately)
```

## 🖥️ Terminal UI (TUI)

When you run `yarn dev`, you'll see a tabbed interface:

```
┌─────────────────────────────────────────────┐
│ ● @genesys-emporium/db  (postgres)         │
│ ● @genesys-emporium/api (feathers)         │
│ ● @genesys-emporium/web (react)            │
└─────────────────────────────────────────────┘
```

### Keyboard Shortcuts
- **Tab** / **Shift+Tab** - Switch between tasks
- **Ctrl+C** - Stop all services
- **Ctrl+Z** - Background (not recommended)

## 🔄 How It Works

1. **You run**: `yarn dev`
2. **Turbo reads**: `turbo.json` configuration
3. **Turbo starts**: `db` task (docker compose up)
4. **Turbo waits**: For DB to be healthy
5. **Turbo starts**: `dev` tasks in parallel
   - API waits 3 seconds for DB connection
   - Web starts immediately
6. **TUI displays**: All logs in separate tabs

## 🐛 Troubleshooting

### DB not starting
```bash
# Check if port 5432 is in use
lsof -i :5432

# Manually start DB
yarn dev:db
```

### API connection errors
```bash
# Check .env file has correct DB credentials
cat .env | grep POSTGRES

# Check DB is running
docker ps | grep postgres
```

### Port conflicts
```bash
# Check ports
lsof -i :3030  # API
lsof -i :4200  # Web
lsof -i :5432  # DB
```

### Turbo cache issues
```bash
# Clear Turbo cache
rm -rf .turbo
```

## 🔧 Customization

### Change ports
Edit `.env`:
```env
API_PORT=3030
POSTGRES_PORT=5432
```

Edit `nx.json` for web port (currently 4200)

### Change task order
Edit `turbo.json` and modify `dependsOn`:
```json
{
  "dev": {
    "dependsOn": ["^db", "^api"]  // Web waits for API too
  }
}
```

### Disable TUI
Edit `turbo.json`:
```json
{
  "ui": "stream"  // Stream logs instead of TUI
}
```

## 🎓 Learn More

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Turborepo TUI](https://turbo.build/repo/docs/reference/run#--ui)
- [Task Dependencies](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks#dependencies-between-tasks)

## ✨ Benefits Over Plain Scripts

### Before (with concurrently):
```bash
# Messy interleaved logs
concurrently "yarn dev:db" "yarn dev:api" "yarn dev:web"
[db] Starting...
[web] Compiling...
[db] Ready
[api] Error: DB not ready
```

### After (with Turborepo):
```bash
# Clean tabbed interface with dependencies
yarn dev
● @genesys-emporium/db   ✓ Ready
● @genesys-emporium/api  ✓ Listening on :3030
● @genesys-emporium/web  ✓ Compiled successfully
```

## 🚦 Next Steps

1. ✅ Run `yarn dev` to test everything
2. ✅ Visit http://localhost:4200
3. ✅ Check API at http://localhost:3030
4. ✅ Test Discord OAuth login

Everything should work together seamlessly! 🎉
