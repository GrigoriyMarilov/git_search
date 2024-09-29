import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    repositories: [],

    savedRepositories:
      JSON.parse(localStorage.getItem("savedRepositories")) || [],
  },

  mutations: {
    setRepositories(state, repositories) {
      state.repositories = repositories;
    },

    setRepository(state, repository) {
      const existingRepoIndex = state.repositories.findIndex(
        (repo) => repo.id === repository.id
      );
      if (existingRepoIndex !== -1) {
        Vue.set(state.repositories, existingRepoIndex, repository);
      } else {
        state.repositories.push(repository);
      }
    },

    addSavedRepository(state, repository) {
      if (!state.savedRepositories.some((repo) => repo.id === repository.id)) {
        state.savedRepositories.unshift(repository);
        localStorage.setItem(
          "savedRepositories",
          JSON.stringify(state.savedRepositories)
        );
      }
    },

    removeSavedRepository(state, repositoryId) {
      state.savedRepositories = state.savedRepositories.filter(
        (repo) => repo.id !== repositoryId
      );
      localStorage.setItem(
        "savedRepositories",
        JSON.stringify(state.savedRepositories)
      );
    },
  },

  actions: {
    updateRepositories({ commit }, repositories) {
      commit("setRepositories", repositories);
    },

    saveRepository({ commit }, repository) {
      commit("addSavedRepository", repository);
    },

    deleteSavedRepository({ commit }, repositoryId) {
      commit("removeSavedRepository", repositoryId);
    },
  },

  getters: {
    getRepositories: (state) => state.repositories,

    getRepositoryById: (state) => (id) => {
      return state.repositories.find((repo) => String(repo.id) === String(id));
    },

    getSavedRepositories: (state) => {
      return state.savedRepositories;
    },
  },
});
