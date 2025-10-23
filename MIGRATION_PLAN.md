# Genesys Emporium - NextJS Migration Plan

## Current State

### Old Application (`packages/emporium`)
- **Framework**: React with Nx
- **State Management**: Redux (actions.tsx, reducers.tsx, changeState.tsx)
- **Auth**: Was Firebase (removed), temp user ID
- **Routing**: React Tabs
- **Styling**: SCSS + Reactstrap (Bootstrap)
- **Build**: Webpack via Nx

### New Application (`apps/web`)
- **Framework**: NextJS 15 (App Router)
- **Auth**: FeathersJS + Discord OAuth ✅ WORKING
- **API**: FeathersJS with Postgres ✅ WORKING
- **Styling**: TailwindCSS

## Key Features to Migrate

### 1. Character Management
- Character list view
- Character creation/deletion
- Character data editing (24 data types):
  - Archetype, Career, Skills, Talents, Abilities
  - Gear, Weapons, Armor, Motivations
  - Experience, Injuries, Critical hits
  - Notes, description, story

### 2. Vehicle Management
- Vehicle list
- Vehicle data editing (4 types)
- Vehicle stat blocks

### 3. Custom Data Management
- 11 custom content types users can create:
  - Custom archetypes, careers, talents, weapons, armor, etc.
- Import/export custom data
- Read access control

### 4. Print Layout
- Character sheet printing
- Multiple theme support (CRB, KF, ROT, SOTB)
- Print-optimized layouts

### 5. Static Game Data
- Extensive JSON data files (archetypes, careers, talents, weapons, etc.)
- Theme-specific images and assets
- Game rules and content from source books

## Migration Strategy

### Phase 1: Foundation & Data Layer ✅ COMPLETED
- [x] Set up FeathersJS API
- [x] Create database schema
- [x] Implement Discord OAuth
- [x] Test authentication flow

### Phase 2: Core Character Features (NEXT)
**Goal**: Basic character CRUD operations

**Tasks**:
1. Create character list page (`/characters`)
   - Fetch characters from API
   - Display character cards with basic info
   - "Create New Character" button

2. Create character creation page (`/characters/new`)
   - Form with basic fields (name, archetype, career, setting)
   - Save to database via API
   - Redirect to character detail page

3. Create character detail page (`/characters/[id]`)
   - Tabbed interface (like old app)
   - Character data sections
   - Edit functionality

4. Update dashboard
   - Show character count
   - Recent characters
   - Quick actions

**Data Migration**:
- Copy static JSON data files to NextJS public directory
- Create utilities to load game data
- Set up data contexts/hooks for accessing game data

**State Management Decision**:
- **Option A**: Keep Redux (familiarity, existing logic)
- **Option B**: Use React Context + Hooks (simpler, NextJS-friendly)
- **Option C**: Use Zustand (lightweight Redux alternative)
- **Recommendation**: Start with React Context, add Zustand if needed

### Phase 3: Character Editing Features
**Goal**: Full character editing capabilities

**Tasks**:
1. Implement all 24 character data types
2. Skills management UI
3. Talents pyramid/selection
4. Equipment management (gear, weapons, armor)
5. XP tracking and spending
6. Auto-save functionality

**Components to Migrate**:
- `DataPage.tsx` → Tabbed character editor
- `Attributes.tsx` → Character stats
- `TalentList.tsx` → Talent management
- All gear/equipment components

### Phase 4: Vehicle System
**Goal**: Vehicle management

**Tasks**:
1. Vehicle list page
2. Vehicle detail/edit page
3. Vehicle data types (4 types)
4. Vehicle stat blocks

### Phase 5: Custom Data Management
**Goal**: User-created content

**Tasks**:
1. Custom data list pages (11 types)
2. Custom data creation/editing
3. Import/export functionality
4. Read access control

### Phase 6: Print Layouts
**Goal**: Print-friendly character sheets

**Tasks**:
1. Print layout components
2. Theme system (CRB, KF, ROT, SOTB)
3. Print-specific CSS
4. PDF generation (optional: use react-pdf or puppeteer)

### Phase 7: Polish & Features
**Tasks**:
1. User settings/preferences
2. Theme switching
3. Dark mode
4. Mobile responsiveness
5. Loading states and error handling
6. Optimistic updates
7. Offline support (PWA)

## Technical Decisions

### Routing
- Use NextJS App Router
- `/characters` - List
- `/characters/new` - Create
- `/characters/[id]` - Detail/Edit
- `/characters/[id]/print` - Print view
- `/vehicles`, `/vehicles/[id]` - Vehicle pages
- `/custom/[type]` - Custom data pages

### API Integration
- Use FeathersJS client (already set up)
- Create custom hooks for data fetching:
  - `useCharacters()` - List characters
  - `useCharacter(id)` - Get single character
  - `useCharacterData(id, type)` - Get character data by type
  - `useGameData(type)` - Get static game data

### State Management
- Authentication: Context + localStorage (already working)
- Character data: React Query or SWR for caching
- Form state: React Hook Form
- Global state: Zustand (if needed)

### Styling
- TailwindCSS for utility-first styling
- shadcn/ui for component library (optional)
- Keep some SCSS for complex layouts (print)

### Data Files
- Move from `src/assets/data` → `public/data`
- Load via fetch in hooks
- Consider moving to database for better caching

## Migration Workflow

### Step-by-Step Process
1. **Don't delete old app yet** - Keep as reference
2. **Migrate piece by piece** - One feature at a time
3. **Test thoroughly** - Each feature before moving on
4. **Keep both apps running** - Can compare side-by-side

### Code Reuse Strategy
- **Can reuse**: Component logic, data structures, utilities
- **Need to update**: Routing, Redux → hooks, Firebase → Feathers
- **Need to rewrite**: Styling (SCSS → Tailwind)

## Estimated Timeline

- **Phase 2** (Core CRUD): 1-2 days
- **Phase 3** (Full editing): 3-5 days
- **Phase 4** (Vehicles): 1-2 days
- **Phase 5** (Custom data): 2-3 days
- **Phase 6** (Print): 2-3 days
- **Phase 7** (Polish): 2-3 days

**Total**: 11-18 days of focused development

## Next Immediate Steps

1. **Test auth persistence** - Verify login persists on refresh ✅
2. **Create character list page** - Start with basic character display
3. **Create character creation form** - Simple MVP version
4. **Test full flow** - Create → Save → View → Edit → Delete

## Notes

- Old app had extensive Redux logic - we can reference it but don't need to copy it exactly
- Many components can be simplified with modern React patterns
- Print layouts are complex - might want to tackle those last
- Consider using a component library to speed up UI development
- The game data (JSON files) is valuable - preserve it carefully
