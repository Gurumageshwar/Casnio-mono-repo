# CLAUDE.md — Casino NX Monorepo

> This file provides comprehensive context for AI assistants (Claude, Copilot, Gemini, etc.)
> working inside this NX Angular monorepo. Read this before making any code changes.

---

## 🏗️ Project Overview

This is an **NX monorepo** containing **5 casino frontend applications** built with **Angular 18** and **SCSS**.
All apps share a common dependency set and a set of shared libraries.

| App      | Brand Name          | Dev Port | Existing Repo                     |
|----------|---------------------|----------|-----------------------------------|
| `lemon`  | Lemon Casino        | 4200     | `casino-front-lemon`              |
| `fireball` | Fireball Casino   | 4201     | `casino-front-fireball`           |
| `wmw`    | WatchMeWin Casino   | 4202     | `casino-front-watchmewin`         |
| `luckera`| Luckera Casino      | 4203     | `casino-front-luckera`            |
| `bison`  | PlayBison Casino    | 4204     | `casino-front-playbison`          |

---

## 📁 Workspace Structure

```
casino-nx/
├── apps/
│   ├── lemon/            ← Lemon Casino Angular app
│   ├── fireball/         ← Fireball Casino Angular app
│   ├── wmw/              ← WatchMeWin Casino Angular app
│   ├── luckera/          ← Luckera Casino Angular app
│   └── bison/            ← PlayBison Casino Angular app
│
├── libs/
│   ├── shared/
│   │   ├── ui/           ← @casino/shared-ui       — Shared Angular UI components
│   │   ├── services/     ← @casino/shared-services — Injectable services (API, auth)
│   │   └── models/       ← @casino/shared-models   — Interfaces/types (no Angular deps)
│   └── loyalty/          ← @casino/loyalty         — Loyalty program feature module
│
├── tools/                ← Custom NX executors and scripts
├── nx.json               ← NX workspace config
├── tsconfig.base.json    ← Root TypeScript config with path aliases
├── tsconfig.json         ← Root TS config (extended by all apps)
├── package.json          ← Single root package.json (all deps here)
├── .eslintrc.json        ← Root ESLint config
└── CLAUDE.md             ← This file
```

---

## ⚡ Common NX Commands

### Serve / Develop

```bash
# Serve a single app
nx serve lemon
nx serve fireball
nx serve wmw
nx serve luckera
nx serve bison

# With proxy config (already configured per-app)
nx serve lemon --configuration=development
```

### Build

```bash
# Build single app
nx build lemon
nx build lemon --configuration=production

# Build all apps in parallel
nx run-many --target=build --all

# Build only affected apps (by git diff vs. main)
nx affected --target=build
```

### Test & Lint

```bash
nx test lemon
nx lint lemon

nx run-many --target=test --all
nx run-many --target=lint --all

nx affected --target=test
nx affected --target=lint
```

### Dependency Graph

```bash
nx graph          # Opens visual graph in browser
nx affected:graph # Shows only affected projects
```

### Generate Code

```bash
# New Angular component in an app
nx g @nx/angular:component my-comp --project=lemon --style=scss

# New Angular service in shared-services lib
nx g @nx/angular:service my-service --project=shared-services

# New feature module in lemon
nx g @nx/angular:module my-feature --project=lemon

# New standalone component
nx g @nx/angular:component my-comp --project=lemon --standalone
```

---

## 📦 Shared Libraries

### `@casino/shared-ui` — `libs/shared/ui`

- **Purpose**: Reusable Angular UI components (buttons, cards, modals, spinners)
- **Imports allowed**: `@casino/shared-models` only
- **Usage**:
  ```typescript
  import { ButtonComponent } from '@casino/shared-ui';
  ```

### `@casino/shared-services` — `libs/shared/services`

- **Purpose**: Injectable Angular services shared across all apps
- **Key services**: `CasinoApiService`, `AuthService`
- **Imports allowed**: `@casino/shared-models` only
- **Usage**:
  ```typescript
  import { AuthService, CasinoApiService } from '@casino/shared-services';
  ```

### `@casino/shared-models` — `libs/shared/models`

- **Purpose**: Pure TypeScript interfaces and types — **no Angular dependencies**
- **Key models**: `CasinoGame`, `Promotion`, `LoyaltyTier`, `PlayerBalance`, `AppEnvironment`
- **Imports allowed**: none (must be leaf node)
- **Usage**:
  ```typescript
  import { CasinoGame, LoyaltyTier } from '@casino/shared-models';
  ```

### `@casino/loyalty` — `libs/loyalty`

- **Purpose**: Loyalty program Angular feature module — shared across all 5 brands
- **Imports allowed**: `@casino/shared-ui`, `@casino/shared-services`, `@casino/shared-models`
- **Usage**:
  ```typescript
  import { LoyaltyModule } from '@casino/loyalty';
  ```

---

## 🏷️ NX Tags & Module Boundaries

Projects are tagged to enforce dependency rules:

| Tag              | Description                                          |
|------------------|------------------------------------------------------|
| `type:app`       | Top-level application (can import anything)          |
| `type:ui`        | UI component library (imports: `type:model` only)    |
| `type:service`   | Service library (imports: `type:model` only)         |
| `type:model`     | Pure types/interfaces (imports: nothing)             |
| `type:feature`   | Feature module (imports: ui, service, model)         |
| `scope:shared`   | Available to all apps                                |
| `app:lemon` etc. | App-scoped tag for per-app private libraries         |
| `domain:loyalty` | Loyalty domain feature                               |

---

## 🌍 Environment Files

Each app has its own environment files under `apps/<name>/src/environments/`:

```
environment.ts         ← Development (local dev server)
environment.prod.ts    ← Production build
```

The `AppEnvironment` interface is defined in `@casino/shared-models`:

```typescript
interface AppEnvironment {
  production: boolean;
  apiUrl: string;
  brand: string;           // 'lemon' | 'fireball' | 'wmw' | 'luckera' | 'bison'
  defaultLocale: string;
  supportedLocales: string[];
  firebaseConfig?: Record<string, string>;
}
```

---

## 🔀 Proxy Configuration

Each app has a proxy config at `apps/<name>/src/proxy.conf.json`.
Requests to `/api/*` are forwarded to the app's backend.

To use a proxy when serving:
```bash
nx serve lemon  # proxy.conf.json is pre-configured in project.json
```

To override the target for local dev, edit `apps/<name>/src/proxy.conf.json`.

---

## 🎨 Styling Conventions

- **SCSS** is used exclusively — no CSS files
- Global styles live in `apps/<name>/src/styles.scss`
- Shared SCSS variables and mixins belong in `libs/shared/ui/src/lib/styles/`
- Use Angular Material + Bootstrap 5 for base components
- Dark theme: background `#0d0d14`, text `#ffffff`
- Import shared styles in app's `styles.scss`:
  ```scss
  @import '@casino/shared-ui/styles/variables';
  @import '@casino/shared-ui/styles/mixins';
  ```

---

## 🧩 Angular Conventions

- **Modules** (not standalone components) — matches existing codebase pattern
- **Component files**: `.component.ts`, `.component.html`, `.component.scss`
- **Services**: `@Injectable({ providedIn: 'root' })` unless feature-scoped
- **Routing**: lazy-loaded feature modules via `loadChildren`
- **i18n**: Use `@angular/localize` — mark strings with `$localize` or `i18n` attributes
- **SSR**: Angular Universal — `@nguniversal/express-engine` (per-app opt-in)
- **State**: RxJS BehaviorSubjects + Services (no NgRx by default)

---

## 🔢 TypeScript Rules

- `strict: true` — enforced across all projects
- `noImplicitAny`: error
- `noUnusedLocals`: warn
- `noImplicitReturns`: error
- Path aliases (`@casino/*`) must be used for cross-library imports — **never relative paths**

---

## 📚 Key Dependencies

| Package               | Version  | Purpose                          |
|-----------------------|----------|----------------------------------|
| `@angular/core`       | ^18.2.3  | Core framework                   |
| `@angular/material`   | ^18.2.3  | UI component library             |
| `@angular/fire`       | ^18.0.1  | Firebase integration             |
| `rxjs`                | ^7.8.1   | Reactive streams                 |
| `apollo-angular`      | ^7.1.2   | GraphQL client                   |
| `swiper`              | ^8.4.7   | Touch slider (loyalty cards)     |
| `pixi.js`             | ^7.2.4   | Canvas/WebGL animations          |
| `firebase`            | 10.14.1  | Firebase SDK                     |
| `ngx-cookie-service`  | ^18.0.0  | Cookie management                |
| `bootstrap`           | ^5.3.3   | CSS framework                    |
| `zone.js`             | ^0.14.10 | Angular change detection         |

---

## 🚀 CI/CD Notes

- **Affected commands** should be used in CI to build/test only changed apps:
  ```bash
  nx affected --target=build --base=origin/main
  nx affected --target=test  --base=origin/main
  ```
- Build outputs: `dist/apps/<name>/`
- Cache: NX computation cache is enabled for `build`, `test`, `lint`, `extract-i18n`

---

## 📋 Do's and Don'ts

### ✅ DO
- Use `@casino/*` path aliases for all cross-library imports
- Add new shared logic to `libs/shared/services` or `libs/shared/ui`
- Tag new projects appropriately in `project.json` → `"tags": [...]`
- Use `nx affected` in CI to skip unaffected projects
- Keep `libs/shared/models` free of Angular dependencies (pure TS only)
- Write SCSS with BEM methodology for component styles

### ❌ DON'T
- Don't add app-specific code to shared libraries
- Don't use relative paths (`../../libs/...`) — use `@casino/*` aliases
- Don't add dependencies to `apps/<name>/package.json` — use the root `package.json`
- Don't import between apps (app-to-app imports are forbidden by module boundary rules)
- Don't bypass `nx run-many` by running Angular CLI directly for monorepo builds

---

## 🔗 Related Repos (Legacy — being migrated here)

| Original Repo                        | NX App    |
|--------------------------------------|-----------|
| `casino-front-lemon`                 | `lemon`   |
| `casino-front-fireball`              | `fireball`|
| `casino-front-watchmewin`            | `wmw`     |
| `casino-front-luckera`               | `luckera` |
| `casino-front-playbison`             | `bison`   |
