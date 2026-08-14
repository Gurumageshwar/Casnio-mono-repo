# Casino NX Monorepo

An **NX Angular 18 monorepo** containing all 5 EBA Technologies casino frontends.

## Apps

| App | Brand | Port | Command |
|-----|-------|------|---------|
| `lemon` | Lemon Casino | 4200 | `nx serve lemon` |
| `fireball` | Fireball Casino | 4201 | `nx serve fireball` |
| `wmw` | WatchMeWin Casino | 4202 | `nx serve wmw` |
| `luckera` | Luckera Casino | 4203 | `nx serve luckera` |
| `bison` | PlayBison Casino | 4204 | `nx serve bison` |

## Shared Libraries

| Import | Path | Purpose |
|--------|------|---------|
| `@casino/shared-ui` | `libs/shared/ui` | UI components |
| `@casino/shared-services` | `libs/shared/services` | Auth, API services |
| `@casino/shared-models` | `libs/shared/models` | TypeScript interfaces |
| `@casino/loyalty` | `libs/loyalty` | Loyalty program module |

## Quick Start

```bash
# Install dependencies
npm install

# Serve an app
nx serve lemon

# Build all apps
nx run-many --target=build --all

# Run tests for affected projects
nx affected --target=test

# View dependency graph
nx graph
```

## Documentation

See [`CLAUDE.md`](./CLAUDE.md) for full AI assistant context, conventions, and command reference.
