export function addTask({ commit, getters }, payload) {
  commit("addTask", Object.assign(payload, { id: getters.nextId }));
}

export function updateTask({ commit }, payload) {
  commit("updateTask", payload);
}

export function deleteTask({ commit }, payload) {
  commit("deleteTask", payload);
}
