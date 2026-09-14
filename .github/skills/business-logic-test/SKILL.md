---
name: business-logic-test
description: "Use when writing or reviewing business-logic tests that are not reducer action tests. Prefer focused, real behavior checks and keep fixtures minimal and readable."
---

# Business Logic Test Guidance

## Core rules

- Prefer testing real behavior over mocks or shallow assertions.
- Keep tests small, deterministic, and easy to read.
- For business logic tests, prefer reusable builders whenever the same fixture shape is used across multiple tests or is complex enough to hide intent in inline literals.
- Builder factories must not accept a generic `overrides` parameter; define the default object and then mutate it through chained setter methods.
- Keep fixtures minimal and local when they are only used in a single test.
- Use explicit inputs and explicit assertions for calculation, transformation, and validation logic.
- Favor clarity over abstraction when writing one-off business rules.
- When a business-logic fixture is reused, give it a typed builder based on the actual domain type or exported interface instead of a loose inline object.

## Preferred patterns

- Write simple, direct tests for pure functions and domain logic.
- Keep assertions focused on outputs, edge cases, and invalid inputs.
- If the same fixture is reused across several business-logic tests, extract a small helper or builder.
- Prefer builder methods like withWeight, withReps, withStartDate, or withEndDate over repeating literal objects.
- Name tests around the business rule they validate, not the implementation details.

## Avoid

- Repeating large inline object literals for the same domain shape across multiple tests.
- Creating shared abstractions for a single-use fixture when a local value is clearer.
- MOCK-heavy tests that assert on mocked behavior instead of actual outputs.
- Using ad hoc, untyped fixture objects when a domain model or interface already exists.

## Repository-specific expectation

This rule applies to non-reducer business logic tests as well: if the same data shape is reused, prefer a small typed builder/helper. Reducer action tests should still follow the dedicated unit-test skill, but business-logic tests should not fall back to repeated inline fixtures when a clear builder pattern would improve readability and consistency.
