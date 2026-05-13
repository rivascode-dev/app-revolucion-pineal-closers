# Naming Conventions

## 1. General Rules
- **Code Language**: English (Industry standard). Variables, functions, components, and internal comments.
- **UI Language**: Spanish. Labels, buttons, messages, and any text visible to the end user.
- **Files/Modules**: `PascalCase` (e.g., `UserProfile.tsx`).
- **Functions/Variables**: `camelCase` (e.g., `getUserData`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_COUNT`).

## 2. Specific Patterns
- **Booleans**: Mandatory state prefix (`is`, `has`, `can`, `should`). E.g., `isContacted`, `hasError`.
- **Events**:
  - **Interfaces/Props**: Prefix `on` (e.g., `onClick`, `onSubmit`).
  - **Implementations**: Prefix `handle` (e.g., `handleClick`, `handleSubmit`).
- **Database Mapping**: Use real database table names in queries (e.g., `seguimientos_iniciacion`), but map them to English interfaces (e.g., `FollowUpInitiation`).

## 3. Syntax & Style
- **Strings**: Use single quotes (`'`) for code. Double quotes (`"`) only for JSON or JSX attributes if forced by standard.
- **Imports**: Use absolute paths with the `@/` alias.
