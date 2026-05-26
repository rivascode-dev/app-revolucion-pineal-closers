# Refactoring Guidelines and Data Efficiency Standard

This document defines the behavioral and architectural rules the AI agent must strictly follow to prevent dead code, redundant states, and inefficient database calls.

## 1. The "Step Back" Protocol (Mandatory Checklist)
Before committing any changes, the agent must evaluate the surrounding architecture:
- **State Redundancy**: Does the new relational data make any existing global props, static variables, or local state obsolete?
- **Declarative Data Flow**: Can we access the data directly and declaratively (e.g., `parent.child?.property`) instead of executing imperative `.map` transforms on the server?
- **Realtime Integrity**: Will the database schema change affect active realtime listeners? (e.g., ensure WebSocket payloads retain matching structures).
- **Strict Typing**: Have TypeScript interfaces been extended to support the new nested relational database object structures?

## 2. Optimized Database and Network Access
- **Single-Query Principle**: Always prefer establishing physical PostgreSQL Foreign Key constraints to perform unified relational queries (`.select('*, relation(fields)')`) instead of doing sequential in-memory queries.
- **Dead Code Elimination**: Proactively clean up any unused imports, parameters, functions, or interface definitions generated or made obsolete by a refactoring task.
