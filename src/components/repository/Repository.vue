<template>
  <div class="repository" v-if="repository">
    <div class="repository__header">
      <img :src="repository.owner.avatar_url" alt="Owner Avatar" class="avatar"/>

      <a class="repository_link" :href="repository.html_url" target="_blank">{{ String(repository.name) }}</a>

      <div class="stats">
        <svg aria-hidden="true" fill="#2C3E50" height="32" viewBox="0 0 16 16" width="32">
          <path
              d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
        </svg>
        {{ repository.stargazers_count }}
      </div>

      <div class="stats">
        <svg aria-hidden="true" fill="#2C3E50" height="32" viewBox="0 0 16 16" width="32">
          <path
              d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
        </svg>
        {{ repository.forks_count }}
      </div>

    </div>

    <p class="description" v-if="repository.description">{{
        repository.description
      }}</p>

    <div class="repository__button_box">
      <ButtonComponent class="repository__button" @click="showMore(repository.id)">
        Показать больше
      </ButtonComponent>
      <ButtonComponent class="repository__button" @click="like">
        <svg aria-hidden="true" height="32" viewBox="0 0 16 16" width="32">
          <path
              d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"
              fill-rule="evenodd"
              :fill="isLiked ? 'red' : 'currentColor'"
          ></path>

        </svg>
      </ButtonComponent>
    </div>
  </div>
</template>

<script>


import {mapGetters} from "vuex";
import ButtonComponent from "@/components/button/Button.vue";

export default {
  name: "RepositoryComponent",
  components: {ButtonComponent},
  props: {
    repository: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapGetters(['getSavedRepositories']),
    isLiked() {
      return this.getSavedRepositories.some(repo => repo.id === this.repository.id)
    }
  },
  methods: {
    showMore(id) {
      this.$router.push("repo/" + id);
    },
    like() {
      const liked = this.isLiked;
      const payload = {...this.repository, liked: !liked};

      if (liked) {
        this.$store.dispatch("deleteSavedRepository", this.repository.id);
      } else {
        this.$store.dispatch("saveRepository", payload);
      }
    },
  },
};
</script>

<style scoped>
.repository {
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  gap: 20px;
  flex-direction: column;
  background-color: #FFFFFF;
  color: inherit;
}

.stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.repository__header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.repository_link {
  font-weight: bold;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  margin-right: auto;
  font-size: 2rem;
  max-width: 40%;
}

.repository_link:hover {
  text-decoration: underline;
}

.avatar {
  display: block;
  height: 60px;
  width: 60px;
}


.description {
  color: inherit;
  text-align: left;
  font-size: 1.25rem;
}

.repository__button_box {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}
</style>
