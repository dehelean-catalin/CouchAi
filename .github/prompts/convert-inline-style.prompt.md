---
mode: agent
---

Convert a React Native inline style object into a StyleSheet class pattern that the app can use in a component.

Requirements:

- Take the inline style object from the user input.
- Output a valid `StyleSheet.create(...)` snippet.
- Use a camelCase-style class name like `styles.container` or `generatedStyle`.
- Preserve the exact property names and values from the object.
- If the user passes a complete JSX element with inline style, extract the style object from it.
- If the input is invalid, explain briefly what format is expected.
- Keep the result ready to paste into a React Native component.

Example:

Input:
`style={{ flex: 1, backgroundColor: 'red', padding: 12 }}`

Output:

```ts
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    padding: 12,
  },
});
```
