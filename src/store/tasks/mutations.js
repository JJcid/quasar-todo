export function addTask(state, payload) {
  state.tasks.push(payload);
  state.nextId = payload.id + 1;
}

export function updateTask(state, payload) {
  const index = state.tasks.findIndex(t => payload.id === t.id);
  state.tasks[index] = Object.assign(state.tasks[index], payload.updates);
}

export function deleteTask(state, payload) {
  const index = state.tasks.findIndex(t => payload === t.id);
  state.tasks.splice(index, 1);
}
