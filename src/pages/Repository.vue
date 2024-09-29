<template>
  <div class="repository__page">
    <h1>Repository Details</h1>

    <SpinnerComponent v-if="isLoading" />

    <div v-if="repository" class="repository__details">
      <p><strong>ID:</strong> {{ repository.id }}</p>
      <p><strong>Full Name:</strong> {{ repository.full_name }}</p>
      <p><strong>Name:</strong> {{ repository.name }}</p>
      <p>
        <strong>Description:</strong>
        {{ repository.description || "No description available" }}
      </p>
      <p><strong>Forks:</strong> {{ repository.forks_count }}</p>
      <p><strong>Stars:</strong> {{ repository.stargazers_count }}</p>
      <p><strong>Open Issues:</strong> {{ repository.open_issues_count }}</p>
      <p><strong>Watchers:</strong> {{ repository.watchers_count }}</p>
      <p>
        <strong>Language:</strong> {{ repository.language || "Not specified" }}
      </p>
      <p><strong>Default Branch:</strong> {{ repository.default_branch }}</p>
      <p>
        <strong>Created At:</strong> {{ formatDate(repository.created_at) }}
      </p>
      <p>
        <strong>Updated At:</strong> {{ formatDate(repository.updated_at) }}
      </p>
      <p>
        <strong>License:</strong>
        {{ repository.license?.name || "No license specified" }}
      </p>
      <p>
        <strong>Homepage:</strong>
        <a
          v-if="repository.homepage"
          :href="repository.homepage"
          target="_blank"
          >{{ repository.homepage }}</a
        >
      </p>
      <p>
        <strong>URL:</strong>
        <a :href="repository.html_url" target="_blank">{{
          repository.html_url
        }}</a>
      </p>
    </div>

    <div v-else-if="!repository && !isLoading" class="repository__notfound">
      <p>Repository not found.</p>
    </div>
    <router-link to="/" class="link">Вернуться</router-link>
  </div>
</template>

<script>
import SpinnerComponent from "@/components/spinner/Spinner.vue";

export default {
  name: "RepositoryPage",
  components: { SpinnerComponent },

  computed: {
    id() {
      return this.$route.params.id;
    },
    storedRepository() {
      return this.$store.getters.getRepositoryById(this.id);
    },
  },
  data() {
    return {
      repository: null,
      isLoading: false,
    };
  },
  async created() {
    if (!this.storedRepository) {
      this.isLoading = true;
      try {
        this.repository = await fetch(
          `https://api.github.com/repositories/${this.id}`
        ).then((res) => {
          if (!res.ok) return null;
          return res.json();
        });
      } finally {
        this.isLoading = false;
      }
    }
  },

  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.repository__page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  color: inherit;
  box-shadow: 0 2px 8px rgba(26, 25, 25, 0.3);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.repository__details {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.repository__details p {
  font-size: 18px;
  margin: 10px 0;
}

.repository__details strong {
  color: #2c3e50;
}

.repository__details a {
  color: inherit;
  text-decoration: none;
}

.repository__details a:hover {
  text-decoration: underline;
}

.repository__notfound {
  text-align: center;
  font-size: 18px;
  color: #a40b17;
}

.repository__notfound p {
  margin-top: 20px;
}

.link {
  display: block;
  margin: 0 auto;
  color: inherit;
  font-size: 1.5rem;
  text-decoration: none !important;
  text-align: center;
}
</style>
