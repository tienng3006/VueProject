<template>
  <div
    @dblclick="onToggle(task)"
    :class="[task.reminder ? 'reminder' : '', 'task']"
  >
    <h3>
      {{ task.text }}
      <i class="fas fa-times" @click="deleteTask(task.id)"></i>
    </h3>
    <p>{{ task.day }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Task",
  props: ["task"],
  methods: {
    ...mapActions(["deleteTask", "toggleReminder"]),
    onToggle(task) {
      const updTask = { ...task, reminder: !task.reminder };
      this.toggleReminder(updTask);
    },
  },
};
</script>

<style scope>
.fas {
  color: red;
}

.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.task.reminder {
  border-left: 5px solid green;
}

.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
