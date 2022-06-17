<template>
  <AddTask v-show="showAddTask" />
  <Tasks />
</template>

<script>
import Tasks from "../components/Tasks";
import AddTask from "../components/AddTask";
export default {
  name: "Home",
  props: ["showAddTask"],
  components: {
    Tasks,
    AddTask,
  },
};
</script>
