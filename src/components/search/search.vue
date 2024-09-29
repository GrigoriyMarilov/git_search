<template>
  <div class="search">
    <input
      class="input search__input"
      type="text"
      v-model="searchText"
      placeholder="Search..."
    />
    <ButtonComponent @click="copyToClipboard"> Копировать </ButtonComponent>
  </div>
</template>

<script>
import ButtonComponent from "@/components/button/Button.vue";

export default {
  name: "SearchComponent",
  components: { ButtonComponent },
  props: {
    setLoading: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      searchText: "",
      isCopied: false,
    };
  },

  methods: {
    copyToClipboard() {
      if (this.searchText) {
        this.isCopied = true;
        const d = this.searchText;
        navigator.clipboard.writeText(this.searchText).then(() => {
          this.searchText = "Copied!";

          setTimeout(() => {
            this.searchText = d;
            this.isCopied = false;
          }, 2000);
        });
      }
    },

    debounce(fn, delay) {
      let timeout;
      return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    async updateRepositories(text) {
      console.log("upadatatat", text);
      if (text && !this.isCopied) {
        this.setLoading(true);
        try {
          const response = await fetch(
            `https://api.github.com/search/repositories?q=${text}`
          );
          if (response.ok) {
            const data = await response.json();
            console.log(data.items);
            await this.$store.dispatch("updateRepositories", [...data.items]);
          }
        } catch (e) {
          console.error(e);
        } finally {
          this.setLoading(false);
        }
      }
    },
  },

  watch: {
    searchText: {
      handler(newValue) {
        const debouncedUpdate = this.debounce(this.updateRepositories, 1000);
        debouncedUpdate(newValue);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.search {
  height: 50px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.input {
  outline: none;
  border: none;
  height: 100%;
  background: #42b983;
  color: #ffffff;
  font-size: 2rem;
  padding-inline: 0.5rem;
}
</style>
