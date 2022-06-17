<template>
  <header>
    <h1>{{ title }}</h1>
    <Button v-show="homePage" :text="showAddTask ? 'Close' : 'Add Task'" :color="showAddTask ? 'red' : 'green'"
      @btn-click="$emit('toggle-add-task')" />
    <a @click="updateTitle" class="btn">Doi ten</a>
  </header>
</template>

<script>
import Button from "@/components/Button.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  components: {
    Button
  },
  props: ["showAddTask"],
  computed: {
    ...mapGetters(['title']),
    homePage() {
      if (this.$route.path === '/') {
        return true
      }
      else return false
    }
  },
  methods: {
    ...mapActions(['updateTitle'])
  }
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
