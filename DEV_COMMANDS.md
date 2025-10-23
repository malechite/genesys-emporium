# Development Commands

## Database Management

### Quick Reset (keeps Docker volume, just reruns migrations)
```bash
yarn db:reset
```
This will:
- Rollback all migrations
- Run migrations again
- Keeps existing Docker container and volume

### Hard Reset (destroys Docker volume and recreates everything)
```bash
yarn db:reset:hard
```
This will:
- Stop and remove Docker containers
- Delete the `postgres_data` volume (all data lost)
- Start Docker containers
- Wait 3 seconds
- Run all migrations

**Use this when you need a completely clean slate!**

### Other Database Commands

```bash
# Create a new migration
yarn migrate:make <migration_name>

# Run migrations
yarn migrate

# Rollback last migration
yarn migrate:rollback

# Run seed files (for test data)
yarn db:seed

# Create a new seed file
cd apps/api && yarn db:seed:make <seed_name>
```

## Development Servers

```bash
# Start database
yarn dev:db

# Start API (requires DB to be running)
yarn dev:api

# Start web app
yarn dev:web

# Or use turbo to run all (might need config update)
yarn dev
```

## Testing OAuth Flow

After resetting the database, you'll need to sign in again with Discord as all users are deleted.

1. Reset database: `yarn db:reset` or `yarn db:reset:hard`
2. Restart API: `yarn dev:api`
3. Navigate to http://localhost:3000
4. Click "Sign in with Discord"
5. Approve the OAuth request
6. You should be redirected to the dashboard

## Docker Commands

```bash
# Start containers
docker compose up -d

# Stop containers
docker compose down

# Stop and remove volumes (delete all data)
docker compose down -v

# View logs
docker compose logs -f postgres

# Connect to database directly
docker exec -it genesys-emporium-db psql -U emporium -d genesys_emporium
```
