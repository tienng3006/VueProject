<template>
  <div class="text-center">
    <Toast />
    <h1 class="mt-5">Users Management</h1>
    <TableUsers />
  </div>
</template>

<script>
import TableUsers from "../components/TableUsers.vue";
export default {
  components: {
    TableUsers,
  },
  data() {
    return {
      username: "",
    };
  },
  mounted() {
    this.username = localStorage.getItem("username");
    this.$toast.add({
      severity: "success",
      summary: `Welcome ${this.username}`,
      life: 3000,
    });
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      this.$router.push("/sign-in");
    },
  },
};
</script>

<style scoped>
h1 {
  color: #000232;
}
button {
  background-color: #b689b0;
  border: #b689b0;
}
button:hover {
  background-color: #9c6c96 !important;
}
</style>
