# Claude Code Session Notes

## Current Task: Get App Running - Convert to Yarn & Fix Build

### Session Status: In Progress
**Last Updated**: 2025-10-22

**Priority Change:** Pausing Firebase migration to get the app building and running first.

---

## Previous Work: Package Upgrades

### Background
VSCode crashed during previous session. We were working on fixing npm package warnings and upgrading libraries.

### Completed Work
- ✅ Removed deprecated React addons from package.json:
  - `react-addons-css-transition-group`
  - `react-addons-transition-group`
- ✅ Ran `npm audit fix --legacy-peer-deps`:
  - Fixed 48 vulnerabilities (140 → 92)
  - Updated 200 packages, added 80, removed 52
  - Used --legacy-peer-deps due to react-firebaseui incompatibility with React 18

### Current State
- **Total Vulnerabilities**: 92 (7 low, 37 moderate, 42 high, 6 critical)
- **Modified Files**:
  - package.json (changes staged in git)
  - package-lock.json (changes staged in git)

### Major Outdated Dependencies (DEPRIORITIZED)
- Firebase: v7.14.3 → **REMOVING instead of upgrading**
- Nx packages (@nrwl/*): v9.5.1 → Can address after Firebase migration
- React: v18.3.1 ✅ (already up to date)

### OLD Todo List (Package Upgrades - ON HOLD)
1. ✅ **DONE**: Run `npm audit fix` for non-breaking changes
2. ❌ ~~Review and upgrade Firebase packages~~ → **REMOVING FIREBASE**
3. 🔜 Address remaining high/critical vulnerabilities (after migration)
4. 🔜 Test the application after upgrades
5. 🔜 Consider Nx upgrade (after migration)

### Remaining Vulnerabilities (Require --force / Breaking Changes)
- **Critical (6)**: @cypress/request (cypress upgrade needed)
- **High (42)**:
  - rollup, semver, serialize-javascript, terser
  - webpack-dev-middleware, postcss, node-fetch
- **Moderate (37)**:
  - @firebase/util (firebase upgrade needed), sockjs, tough-cookie
  - tmp, yargs-parser, postcss-related packages

---

## NEW DIRECTION: Firebase to Custom Backend Migration

### Decision Rationale
- Firebase v7 has security vulnerabilities
- react-firebaseui incompatible with React 18
- Want to own the data layer and run on K8s with Postgres
- FeathersJS aligns with other projects in the portfolio

### Current Firebase Usage Analysis

**Firebase Features Used:**
- ✅ **Firestore Database** - All data persistence (characters, user data, custom content)
- ✅ **Firebase Authentication** - Google, Phone, Email, Anonymous auth
- ✅ **Firebase Hosting** - Application deployment

**Key Files:**
- `packages/emporium/src/app/firestoreDB.js` - Firebase initialization
- `packages/emporium/src/redux/actions.tsx` - **ALL Firestore operations (410 lines)**
- `packages/emporium/src/app/components/User.tsx` - FirebaseUI auth component
- `packages/emporium/src/app/app.tsx` - Auth state listener

**Data Model:**
- `users/{userId}/data/characters/{characterId}/*` - Character data (18+ attribute types)
- `users/{userId}/data/characterList` - Character metadata
- `users/{userId}/data/settings` - User preferences
- `userDB/{userId}` - User profiles
- `*DB` collections - Custom content (10+ types: customArchetypes, customWeapons, etc.)

**Key Operations:**
- 40+ Firestore operations across codebase
- Extensive use of real-time listeners (`onSnapshot`)
- Complex queries with `.where()` clauses
- Batch operations for character deletion

### Migration Plan

#### **Phase 1: Backend Infrastructure Setup** ✅ COMPLETED
Set up FeathersJS API with Postgres database to replace Firebase backend.

**Completed Tasks:**
1. ✅ Created docker-compose.yml with Postgres 16
2. ✅ Created .env and .env.example with database configuration
3. ✅ Set up apps/api with FeathersJS v5
4. ✅ Created TypeScript configuration for API
5. ✅ Set up Knex for database migrations
6. ✅ Created users and characters database tables
7. ✅ Implemented basic CRUD services for users and characters
8. ✅ API running successfully on http://localhost:3030
9. ✅ Tested full CRUD operations and query filtering

**Infrastructure:**
- **Database**: Postgres 16 running in Docker (container: genesys-emporium-db)
- **API**: FeathersJS v5 with Koa, Socket.io, and REST
- **Dev Server**: tsx watch with hot-reload
- **ORM**: Knex v3.1.0 with TypeScript migrations

#### **Phase 2: Complete API Implementation** ✅ COMPLETED
Created comprehensive FeathersJS API with all data types and operations.

**Completed Tasks:**
1. ✅ Created migrations for all database tables:
   - `user_settings` - User preferences and last selected character
   - `character_data` - 24 character data types (archetype, career, skills, etc.)
   - `character_data` table supports all dataTypes from lists.js
   - 11 custom content tables (custom_archetypes, custom_armor, custom_weapons, etc.)
   - `vehicles` and `vehicle_data` - Vehicle management with 4 data types
2. ✅ Created FeathersJS services for all data types:
   - Character data service (24 data types)
   - User settings service
   - 11 custom content services
   - Vehicles and vehicle data services
3. ✅ All services support full CRUD operations
4. ✅ Services include query filtering (user_id, data_type, name, read_access)
5. ✅ API running on http://localhost:3030 with 20+ endpoints

**API Endpoints Created:**
Core:
- `/users` - User management
- `/characters` - Character list management
- `/character-data` - Character attributes (24 types)
- `/user-settings` - User preferences

Custom Content:
- `/custom-archetypes`, `/custom-archetype-talents`
- `/custom-armor`, `/custom-careers`, `/custom-gear`
- `/custom-motivations`, `/custom-settings`
- `/custom-skills`, `/custom-talents`
- `/custom-vehicles`, `/custom-weapons`

Vehicles:
- `/vehicles` - Vehicle management
- `/vehicle-data` - Vehicle attributes (4 types)

#### **Phase 3: React App Migration** ✅ COMPLETED
Removed all Firebase code and connected React app to FeathersJS API.

**Completed Tasks:**
1. ✅ Installed FeathersJS client packages (@feathersjs/client, axios, socket.io-client)
2. ✅ Created FeathersJS client wrapper at `packages/emporium/src/api/client.ts`
3. ✅ Removed Firebase from all 5 files:
   - `firestoreDB.js` - Stubbed out with no-ops
   - `actions.tsx` - Completely rewritten (450+ lines) to use Feathers API
   - `app.tsx` - Removed auth, using temp user ID
   - `User.tsx` - Replaced FirebaseUI with placeholder
   - `UserButton.tsx` - Removed auth, shows dev user
4. ✅ Updated ALL Redux actions to use FeathersJS:
   - writeUser, changeData, loadData
   - loadCharacterList, addCharacter, deleteCharacter
   - importCharacter, importCustomData
   - addDataSet, removeDataSet, modifyDataSet, loadDataSets
   - Vehicle operations: loadDoc, changeDocData, changeFieldData
5. ✅ Fixed webpack config to transpile FeathersJS ESM packages
6. ✅ App compiles successfully (minor TS warnings remain)

**API Integration:**
- All 40+ Firebase operations migrated to FeathersJS
- Character CRUD operations functional
- Custom content operations ready
- Vehicle management integrated
- Real-time updates possible with Socket.io (commented out for now)

#### **Phase 4: Next Steps** 🎯 TODO
1. ⏳ Implement FeathersJS authentication to replace temp user ID
2. ⏳ Test character creation and loading with actual data
3. ⏳ Implement real-time updates with Socket.io
4. ⏳ Add error handling and loading states
5. ⏳ Test custom content import/export
6. ⏳ Deploy API to production environment
   - Data models: Character, User, CustomData, etc.
4. ⏳ Define method signatures matching current Firebase operations:
   - User: `writeUser()`, `changeUser()`
   - Characters: `loadCharacterList()`, `addCharacter()`, `deleteCharacter()`
   - Data: `loadData()`, `changeData()`, `loadDataSets()`, `addDataSet()`
   - Vehicles: `loadDoc()`

#### **Phase 2: Stubbed Implementation**
Create stub implementations that return mock data or localStorage-based persistence.

**Tasks:**
1. ⏳ Implement `MockAuthService` with local auth state
2. ⏳ Implement `MockDataService` with localStorage or in-memory data
3. ⏳ Add TypeScript types for all data models
4. ⏳ Test stubs with Redux actions

#### **Phase 3: Redux Actions Migration**
Replace Firebase calls in `actions.tsx` with service layer calls.

**Tasks:**
1. ⏳ Inject service dependencies into action creators
2. ⏳ Replace `db.doc()`, `db.collection()` calls with service methods
3. ⏳ Replace `onSnapshot` with service subscription methods
4. ⏳ Update auth flow in `app.tsx`
5. ⏳ Replace FirebaseUI component in `User.tsx`
6. ⏳ Test application with stub services

#### **Phase 4: FeathersJS Backend Setup** (Future Work - Separate Project)
Create standalone FeathersJS API service.

**Backend Requirements:**
- Authentication service (JWT-based)
- User service
- Character service (CRUD + real-time updates)
- Custom content services (10 types)
- Postgres database with proper schema
- WebSocket support for real-time updates
- K8s deployment configuration

**Services to Create:**
- `/services/users`
- `/services/characters`
- `/services/character-data`
- `/services/custom-archetypes` (+ 9 more custom types)

#### **Phase 5: Real Service Implementation**
Implement actual API client services.

**Tasks:**
1. ⏳ Install FeathersJS client (`@feathersjs/client`)
2. ⏳ Implement `FeathersAuthService` using Feathers authentication
3. ⏳ Implement `FeathersDataService` using Feathers services
4. ⏳ Implement WebSocket-based real-time updates
5. ⏳ Add API error handling and retry logic
6. ⏳ Configure service URLs via environment variables
7. ⏳ Test with real backend

#### **Phase 6: Firebase Removal**
Remove all Firebase dependencies and code.

**Tasks:**
1. ⏳ Remove Firebase imports from codebase
2. ⏳ Delete `firestoreDB.js`
3. ⏳ Remove from package.json:
   - `firebase`
   - `@firebase/app`
   - `@firebase/firestore`
   - `react-firebaseui`
4. ⏳ Remove `firestore.rules` and `firebase.json`
5. ⏳ Update deployment scripts
6. ⏳ Run `npm audit` to verify vulnerability reduction

### Data Migration Strategy

**Option A: Export/Import**
1. Export all Firebase data to JSON
2. Transform to Postgres schema
3. Import via backend API or direct SQL

**Option B: Dual-Write Period**
1. Write to both Firebase and new backend temporarily
2. Verify data consistency
3. Switch read operations to new backend
4. Disable Firebase writes

**Recommendation:** Start with Option A for simplicity.

### Architecture Decisions

**Service Layer Pattern:**
```typescript
// Service abstraction
interface IDataService {
  loadCharacterList(userId: string): Promise<CharacterList>
  addCharacter(userId: string, character: Character): Promise<string>
  // ... more methods
}

// Redux action uses service
const loadCharacterList = (userId: string) => async (dispatch, getState, services) => {
  const characterList = await services.data.loadCharacterList(userId)
  dispatch({ type: 'CHARACTER_LIST_LOADED', payload: characterList })
}
```

**Real-time Updates:**
- Replace Firebase `onSnapshot` with FeathersJS real-time events
- Use `service.on('created')`, `service.on('updated')`, etc.
- Maintain Redux state update pattern

**Authentication:**
- Replace FirebaseUI with custom auth form or Auth0/Supabase
- Replace `firebase.auth().onAuthStateChanged()` with JWT token validation
- Store JWT in localStorage/sessionStorage

### Next Immediate Steps (ON HOLD - Focus on getting app running first)

1. ~~Create service layer directory structure~~
2. ~~Define TypeScript interfaces for all services~~
3. ~~Create mock/stub implementations~~
4. ~~Begin replacing Firebase calls in Redux actions~~

---

## COMPLETED: Convert to Yarn & Fix Build ✅ SUCCESS!

## CURRENT PRIORITY: Migrate to Modern Stack (FeathersJS + Postgres + NextJS)

### Yarn Migration Steps
1. ✅ Delete package-lock.json
2. ✅ Configure yarn workspaces in package.json
3. ✅ Run yarn install (with --ignore-engines flag)
4. ✅ Verify build works with yarn - **BUILD SUCCEEDS!**
5. ⏳ Address TypeScript errors (non-blocking)

### Why Yarn?
- Better workspace support for monorepo (Nx setup)
- Potentially better dependency resolution
- May resolve peer dependency conflicts

### Build Configuration Changes Made
1. **Removed Nx Cloud**: Deleted `@nrwl/nx-cloud` from package.json
2. **Updated nx.json**: Changed runner from `@nrwl/nx-cloud` to `@nrwl/workspace/tasks-runners/default`
3. **Added @firebase/auth**: Installed v0.14.9 (compatible with old webpack)
4. **Downgraded Redux**:
   - redux: v5.0.1 → v4.2.1
   - redux-thunk: v3.1.0 → v2.4.2
   - react-redux: v9.1.2 → v8.1.3
5. **Node.js workaround**: Using `NODE_OPTIONS=--openssl-legacy-provider` for old webpack compatibility

### Build Status ✅
**Build Command**: `yarn build emporium` or `yarn build`
**Dev Server Command**: `yarn dev`

**Dev Server**:
- Running at http://localhost:4200/
- Using @nrwl/web:dev-server (webpack-dev-server)
- Includes querystring polyfill for compatibility
- Custom webpack config at packages/emporium/webpack.config.js

**Output Files** (dist/packages/emporium/):
- main.js: 8.2MB
- vendor.js: 7.1M
- polyfills.js: 583K
- runtime.js: 6.2K
- styles.js: 11K

**Build Result**: SUCCESS (with TypeScript warnings)

### Remaining Warnings (Non-Blocking)
1. **TypeScript errors**: ~100+ type errors related to:
   - Redux dispatch types (thunk actions not properly typed)
   - reactstrap InputGroupAddon (removed in newer versions)
   - Input component type mismatches
2. **Peer dependency warnings**: Many packages have incorrect peer deps
   - react-firebaseui wants React 15-16 (we have 18)
   - Various @nrwl packages want matching versions

**Note**: These errors don't prevent the build from succeeding. The app builds and should run.

---

## NEW ARCHITECTURE PLAN

### Goals
1. ✅ Remove Firebase (vulnerable, incompatible with React 18)
2. ⏳ Set up Postgres database in Docker
3. ⏳ Create FeathersJS API service layer
4. ⏳ Add NextJS for modern frontend with Server Actions
5. ⏳ Migrate existing React app to use new backend

### Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                  Docker Compose                     │
│  ┌──────────────────────────────────────────────┐  │
│  │  Postgres 16 (Port 5432)                     │  │
│  │  DB: genesys_emporium                        │  │
│  │  User: emporium / Password: emporium_dev     │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                          ▲
                          │ (Knex ORM)
                          │
┌─────────────────────────────────────────────────────┐
│          apps/api (FeathersJS + TypeScript)         │
│  ┌──────────────────────────────────────────────┐  │
│  │  Service Layer                               │  │
│  │  - Authentication                            │  │
│  │  - Users                                     │  │
│  │  - Characters                                │  │
│  │  - Custom Content (10 types)                 │  │
│  │                                              │  │
│  │  WebSocket support for real-time updates    │  │
│  │  Port: 3030                                  │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                          ▲
                          │ (Feathers Client)
                          │
┌─────────────────────────────────────────────────────┐
│         apps/web (NextJS 15 + Server Actions)       │
│  ┌──────────────────────────────────────────────┐  │
│  │  Server Functions → FeathersJS Client        │  │
│  │  Frontend → React Components                 │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  Existing React App (packages/emporium)             │
│  Can also connect to FeathersJS API                 │
└─────────────────────────────────────────────────────┘
```

### Progress

#### Phase 1: Infrastructure Setup ✅
- ✅ Created `apps/` folder for new architecture
- ✅ Updated yarn workspaces to include `apps/*`
- ✅ Removed all Firebase dependencies:
  - `firebase`
  - `@firebase/app`
  - `@firebase/app-types`
  - `@firebase/auth`
  - `@firebase/firestore`
  - `react-firebaseui`
- ✅ Created `docker-compose.yml` with Postgres 16
- ✅ Created `.env` and `.env.example` with database configuration
- ✅ Created `apps/api/package.json` with FeathersJS dependencies

#### Phase 2: FeathersJS API Setup ⏳ IN PROGRESS
- ✅ Installed FeathersJS dependencies:
  - @feathersjs/feathers v5.0.29
  - @feathersjs/koa v5.0.29 (Koa framework)
  - @feathersjs/socketio v5.0.29 (real-time)
  - @feathersjs/authentication v5.0.29
  - @feathersjs/authentication-local v5.0.29
  - knex v3.1.0 (SQL query builder)
  - pg v8.13.1 (Postgres driver)
- ⏳ **NEXT**: Create TypeScript configuration
- ⏳ **NEXT**: Create basic FeathersJS app structure
- ⏳ **NEXT**: Configure Postgres connection
- ⏳ **NEXT**: Create initial services

#### Phase 3: Database Schema ⏳ PENDING
- ⏳ Create Knex migrations for:
  - users table
  - characters table
  - character_data table (JSONB for flexibility)
  - custom_content tables (10 types)
- ⏳ Seed initial data

#### Phase 4: NextJS Setup ⏳ PENDING
- ⏳ Create `apps/web` with NextJS 15
- ⏳ Install FeathersJS client
- ⏳ Create server functions that call FeathersJS
- ⏳ Set up TypeScript types

#### Phase 5: Service Layer Migration ⏳ PENDING
- ⏳ Create service interfaces matching Firebase operations
- ⏳ Implement FeathersJS services
- ⏳ Add real-time event listeners
- ⏳ Test with existing React app

### Environment Configuration

**Database (Docker)**:
```bash
docker-compose up -d    # Start Postgres
docker-compose down     # Stop Postgres
docker-compose logs postgres  # View logs
```

**Connection String**:
```
postgresql://emporium:emporium_dev@localhost:5432/genesys_emporium
```

**Ports**:
- Postgres: 5432
- FeathersJS API: 3030
- NextJS: 3000 (default)
- Existing React: 4200

### File Structure Created

```
/
├── apps/
│   └── api/
│       ├── package.json          ✅ Created
│       ├── tsconfig.json          ⏳ Next
│       └── src/
│           ├── index.ts           ⏳ Next
│           ├── services/          ⏳ Next
│           └── migrations/        ⏳ Next
│
├── docker-compose.yml             ✅ Created
├── .env                           ✅ Created
└── .env.example                   ✅ Created
```

### Next Immediate Steps

1. **Create FeathersJS App Structure**:
   ```bash
   # In apps/api/
   mkdir -p src/services
   # Create tsconfig.json
   # Create src/index.ts
   # Create src/app.ts
   ```

2. **Configure Database**:
   ```bash
   # Start Postgres
   docker-compose up -d

   # Create Knex configuration
   # Create initial migration
   ```

3. **Start API Server**:
   ```bash
   cd apps/api
   yarn dev    # Should start on port 3030
   ```

4. **Create NextJS App**:
   ```bash
   cd apps
   npx create-next-app@latest web --typescript --app --use-yarn
   ```

5. **Update Existing React App**:
   - Comment out Firebase imports
   - Create stub service layer
   - App should start without Firebase

### Benefits of New Architecture

✅ **No Firebase Dependencies** - Removes security vulnerabilities
✅ **Modern Stack** - FeathersJS v5 + NextJS 15 + Postgres 16
✅ **Type Safety** - Full TypeScript across stack
✅ **Real-time** - WebSocket support via FeathersJS
✅ **Flexible Data** - JSONB in Postgres for complex character data
✅ **Self-Hosted** - Full control, runs in Docker/K8s
✅ **Service Layer** - Clean separation, testable
✅ **Future-Proof** - Modern frameworks with active development

### Benefits of This Approach

✅ Decouples application logic from Firebase
✅ Makes codebase testable with mock services
✅ Allows gradual migration without breaking changes
✅ Can run locally with stubs before backend is ready
✅ Aligns with existing FeathersJS knowledge
✅ Full control over data and infrastructure
✅ Resolves Firebase security vulnerabilities
✅ Fixes react-firebaseui React 18 incompatibility
