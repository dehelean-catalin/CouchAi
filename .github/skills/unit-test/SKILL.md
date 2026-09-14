---
name: unit-test
description: "Use when writing or reviewing unit tests in this repo. Focus on reducer and pure-function coverage, reusable fixtures, and deterministic assertions."
---

# Unit Test Guidance

## Core rules

- Prefer testing real behavior over mocks or shallow assertions.
- Keep tests small, deterministic, and easy to read.
- For reducer action tests only, reuse shared builders/helpers instead of writing inline object literals for repeated test data.
- Do not create inline reducer state fixtures inside every action test when the same shape is reused across multiple cases.
- When a reducer action test repeats the same workout or set shape, move it into a helper, factory, or builder and import it.
- Use named builders like `SetBuilder`, `WorkoutBuilder`, or other domain-specific helpers instead of duplicating reducer literals in each action spec.
- Builder factories must not accept a generic `overrides` parameter; instead, configure values explicitly with chaining methods like `withWeight`, `withReps`, `withStartDate`, or `withStatus`.
- Builder variables and return values in reducer action tests must be typed with the actual domain model or interface exported from the corresponding slice, not left as `any` or a locally invented object shape.
- Favor explicit expectations on state transitions and returned values over snapshot-only assertions.

## Preferred patterns

- For reducer action tests, use a builder/helper for repeated structures such as workouts, exercises, and sets.
- Keep assertions focused on the behavior under test.
- Add one failing test for each edge case: valid path, empty path, missing id, unchanged state.
- Keep test names descriptive and action-oriented.
- This rule is intentionally limited to reducer action tests; business-logic or utility tests do not need the same builder requirement unless they also test reducer state transitions.

## Avoid

- Inline reducer state fixtures used repeatedly for the same entity shape.
- Copy-pasting nearly identical reducer test data across multiple action tests.
- Test-only logic embedded in production code.
- Over-mocking dependencies that can be exercised directly.

## Example

Preferred:

```ts
const workout = WorkoutBuilder().withId("workout-1").build();
const state = reducer(
  initialState,
  completeWorkout({ workoutId: workout.id, endDate }),
);
```

Avoid:

```ts
const state = reducer(
  {
    workouts: [{ id: "workout-1", status: "in-progress", endDate: "", ... }],
    sets: {},
  },
  completeWorkout({ workoutId: "workout-1", endDate: "2026-09-14T18:00:00.000Z" }),
);
```

## Repository-specific expectation

This project already uses factory-style builders such as `SetBuilder` for reducer action tests. Follow that pattern for new reducer specs. If a reducer action test needs repeated workout or set data, add or extend a helper rather than writing inline fixtures in the test body. This requirement does not apply to unrelated non-reducer tests.
