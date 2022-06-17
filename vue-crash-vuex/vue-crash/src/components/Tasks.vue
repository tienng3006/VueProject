<template>
  <div v-for="task in tasks" :key="task.id">
    <Task :task="task" />
  </div>
</template>

<script>
import Task from "@/components/Task.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Tasks",
  components: {
    Task,
  },
  methods: {
    ...mapActions(["fetchTasks"]),
  },
  computed: {
    ...mapGetters(["tasks"]),
  },
  created() {
    this.fetchTasks();
  },
};
</script>
