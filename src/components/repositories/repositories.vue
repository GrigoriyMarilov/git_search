<template>
  <div class="repositories">
    <SpinnerComponent v-if="isLoading" />
    <div class="list" v-else>
      <RepositoryComponent
        v-for="(item, index) in repositories"
        :key="index"
        class="repository"
        :repository="item"
      />
    </div>
  </div>
</template>

<script>
import RepositoryComponent from "@/components/repository/Repository.vue";
import SpinnerComponent from "@/components/spinner/Spinner.vue";

export default {
  name: "RepositoriesList",
  components: { SpinnerComponent, RepositoryComponent },
  props: {
    repositories: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.repositories {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.list {
  width: 100%;
}
</style>
