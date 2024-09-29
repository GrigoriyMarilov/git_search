<template>
  <div class="home-page">
    <ScrollProgress />
    <SearchComponent :set-loading="setLoading" />
    <div class="container">
      <RepositoriesList :repositories="repositories" :is-loading="isLoading" />
      <RepositoriesList :repositories="savedRepositories" />
    </div>
  </div>
</template>

<script>
import RepositoriesList from "@/components/repositories/repositories.vue";
import SearchComponent from "@/components/search/search.vue";
import { mapGetters } from "vuex";
import ScrollProgress from "@/components/scroll-progress/ScrollProgress.vue";

export default {
  name: "HomePage",
  components: { ScrollProgress, SearchComponent, RepositoriesList },
  computed: {
    ...mapGetters(["getRepositories", "getSavedRepositories"]),
    repositories() {
      return this.getRepositories;
    },
    savedRepositories() {
      return this.getSavedRepositories;
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    setLoading(loadingState) {
      this.isLoading = loadingState;
    },
  },
};
</script>

<style scoped>
.home-page {
  padding-inline: 20px;
}

.container {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 80px;
}
</style>
