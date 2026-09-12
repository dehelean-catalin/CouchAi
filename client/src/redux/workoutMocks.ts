export function SetBuilder() {
  const set = { id: "set-1", reps: 10, weight: 10, isCompleted: false };

  return {
    setId(id: string) {
      set.id = id;
      return this;
    },
    isCompleted(isCompleted: boolean) {
      set.isCompleted = isCompleted;
      return this;
    },
    build() {
      return { ...set };
    },
  };
}
