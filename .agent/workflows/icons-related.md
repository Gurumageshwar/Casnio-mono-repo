---
description: AI Instruction: Implement Common SVG Icon Registration in Nx Monorepo
---

Implement a centralized SVG icon registration system for an Angular Nx monorepo using Angular Material (`MatIconRegistry`).

The implementation should allow:

- A single source of truth for icon names.
- Brand-specific SVG files.
- Shared icon usage across all applications.
- Compile-time safety.
- No hardcoded icon names.
- Automatic registration during application startup.

---

# Requirements

## 1. Create a Shared Icon Library

Create a shared library.

Example

```
libs/
└── shared/
    └── ui-icons/
        ├── src/
        │   ├── icon.enum.ts
        │   ├── icon.service.ts
        │   ├── icon.provider.ts
        │   ├── icon.config.ts
        │   └── index.ts
```

This library will be shared by every application.

---

# 2. Create Common Icon Enum

Create a common icon constant.

Example

```ts
export const COMMON_ICONS = {
  LOGO: 'logo',
  BRAND_LOGO: 'brand-logo',

  HOME: 'home',
  MENU: 'menu',
  CLOSE: 'close',

  SEARCH: 'search',

  USER: 'user',
  PROFILE: 'profile',

  WALLET: 'wallet',
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',

  SUCCESS: 'success',
  ERROR: 'error',

  CHECK: 'check'
} as const;

export type CommonIcon =
  typeof COMMON_ICONS[keyof typeof COMMON_ICONS];
```

Rules

- Never hardcode icon names.
- Always use constants.
- Every common icon should exist in every application.

---

# 3. Assets Structure

Each application should contain its own SVG files.

Example

```
apps/
├── lemon/
│   └── src/assets/icons/
│       ├── home.svg
│       ├── wallet.svg
│       ├── logo.svg
│       └── ...

├── bison/
│   └── src/assets/icons/
│       ├── home.svg
│       ├── wallet.svg
│       ├── logo.svg
│       └── ...

└── fireball/
    └── src/assets/icons/
```

Important

The filename must match the enum value.

Example

```
COMMON_ICONS.WALLET

↓

wallet.svg
```

Do not rename SVG files per brand.

The SVG content may differ.

The filename should remain the same.

---

# 4. Register Icons

Create an IconRegistryService.

Responsibilities

- Read all values from COMMON_ICONS.
- Register every SVG.
- Use MatIconRegistry.
- Use DomSanitizer.
- Load SVGs from

```
assets/icons/
```

Registration should happen automatically.

No manual registration inside components.

---

# 5. Register During App Initialization

Use

- APP_INITIALIZER

or

- provideAppInitializer (Angular 17+)

The application should register every icon before rendering.

Never register icons inside components.

Never register icons multiple times.

---

# 6. Component Usage

Incorrect

```html
<mat-icon svgIcon="wallet"></mat-icon>
```

Correct

Component

```ts
readonly Icons = COMMON_ICONS;
```

Template

```html
<mat-icon [svgIcon]="Icons.WALLET"></mat-icon>
```

Benefits

- IntelliSense
- Compile-time safety
- Refactoring support
- No typo errors

---

# 7. Brand Override

Every application should provide its own SVG.

Example

Lemon

```
assets/icons/wallet.svg
```

Bison

```
assets/icons/wallet.svg
```

Component code remains

```html
<mat-icon [svgIcon]="Icons.WALLET"></mat-icon>
```

Depending on the running application,

Angular automatically loads

```
assets/icons/wallet.svg
```

from that application's assets.

No code changes are required.

---

# 8. Brand-Specific Icons

Some icons may exist only in one application.

Example

```
lemon-special.svg
```

Do not add these to COMMON_ICONS.

Instead

Create a separate enum.

Example

```ts
export const LEMON_ICONS = {
    SPECIAL: 'lemon-special'
};
```

This enum should only be imported inside the Lemon application.

---

# 9. Build Flow

```
nx serve lemon

↓

Assets copied

↓

assets/icons/

↓

APP_INITIALIZER

↓

Register icons

↓

MatIconRegistry

↓

Application starts

↓

Components use

COMMON_ICONS.WALLET

↓

Angular Material loads

assets/icons/wallet.svg
```

---

# 10. Development Rules

✅ Use COMMON_ICONS everywhere.

✅ Never hardcode icon names.

✅ Every common icon must exist in every application.

✅ Register icons only once.

✅ Keep registration logic inside the shared library.

✅ Components should only consume enums.

✅ Use application assets for SVG files.

✅ Brand-specific icons should have separate enums.

---

# 11. Expected Benefits

- Single source of truth.
- Shared implementation.
- Brand-specific visuals.
- Easier maintenance.
- Better IntelliSense.
- Compile-time validation.
- No duplicated registration code.
- Easy onboarding for new applications.
- Easily scalable for future brands.