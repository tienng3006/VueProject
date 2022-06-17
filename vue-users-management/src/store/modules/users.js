import axios from "axios";

const state = {
  users: [],
};

const getters = {
  users: (state) => state.users,
};

const actions = {
  async fetchUsers({ commit }) {
    const res = await axios.get(
      "https://628f1d00dc47852365396d53.mockapi.io/usersmanagement/users"
    );
    commit("setUsers", res.data);
  },
  async addUser({ commit }, newUser) {
    const res = await axios.post(
      "https://628f1d00dc47852365396d53.mockapi.io/usersmanagement/users",
      newUser
    );
    commit("newUser", res.data);
  },
  async deleteUser({ commit }, id) {
    await axios.delete(
      `https://628f1d00dc47852365396d53.mockapi.io/usersmanagement/users/${id}`
    );
    commit("removeUser", id);
  },
  async editUser({ commit }, user) {
    const res = await axios.put(
      `https://628f1d00dc47852365396d53.mockapi.io/usersmanagement/users/${user.id}`,
      user
    );
    commit("updateUser", res.data);
  },
};

const mutations = {
  setUsers: (state, users) => (state.users = users),
  newUser: (state, user) => state.users.push(user),
  removeUser: (state, id) =>
    (state.users = state.users.filter((user) => user.id !== id)),
  updateUser(state, updUser) {
    const index = state.users.findIndex((user) => user.id === updUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updUser);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
