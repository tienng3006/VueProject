<template>
  <Menubar :model="items" />
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { label: "Home", icon: "pi pi-fw pi-home", to: "/" },
        { label: "Sign In", icon: "pi pi-fw pi-user", to: "/sign-in" },
        { label: "Sign Up", icon: "pi pi-fw pi-user-plus", to: "/sign-up" },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background-color: #fbd1b7;
  margin: 0;
}
nav {
  padding: 30px;
}
.p-menuitem-link {
  background-color: #2c3e50 !important;
}
.p-menubar {
  background-color: #2c3e50 !important;
}

.p-menuitem-text {
  color: white !important;
}
.p-menuitem-icon {
  color: white !important;
}
</style>
