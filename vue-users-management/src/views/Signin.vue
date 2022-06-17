<template>
  <Toast />
  <div class="form-demo mt-7">
    <div class="flex justify-content-center">
      <div class="card text-white p-4">
        <div class="align-items-center justofy-content-center img"></div>

        <h2 class="text-center">Sign In</h2>
        <p class="text-center">Sign in by entering the information below</p>
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid mt-5">
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="name"
                v-model="v$.name.$model"
                :class="{ 'p-invalid': v$.name.$invalid && submitted }"
              />
              <label
                for="name"
                :class="{ 'p-error': v$.name.$invalid && submitted }"
                >Username</label
              >
            </div>
            <small
              v-if="
                (v$.name.$invalid && submitted) || v$.name.$pending.$response
              "
              class="p-error"
              >{{ v$.name.required.$message.replace("Value", "Name") }}</small
            >
          </div>
          <div class="field">
            <div class="p-float-label">
              <Password
                :feedback="false"
                id="password"
                v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                toggleMask
              />
              <label
                for="password"
                :class="{ 'p-error': v$.password.$invalid && submitted }"
                >Password</label
              >
            </div>
            <small
              v-if="
                (v$.password.$invalid && submitted) ||
                v$.password.$pending.$response
              "
              class="p-error"
              >{{
                v$.password.required.$message.replace("Value", "Password")
              }}</small
            >
          </div>
          <Button
            v-ripple
            type="submit"
            label="Submit"
            class="mt-2"
            :disabled="isFormValid"
          />
          <div class="text-center">
            <p>Don't have an account?</p>
            <router-link to="/sign-up">SIGN UP</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapActions, mapGetters } from "vuex";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      name: "",
      password: "",
      submitted: false,
      showMessage: false,
    };
  },
  validations() {
    return {
      name: {
        required,
      },
      password: {
        required,
      },
    };
  },
  methods: {
    ...mapActions(["fetchUsers"]),
    handleSubmit(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }
      const index = this.users.find(
        (user) => user.password === this.password && user.username === this.name
      );
      if (index) {
        localStorage.setItem("username", this.name);
        this.$router.push("/dashboard");
      } else {
        this.$toast.add({
          severity: "warn",
          summary: "Username or password incorrect",
          life: 3000,
        });
      }
    },
    resetForm() {
      this.name = "";
      this.password = "";
      this.submitted = false;
    },
  },
  computed: {
    ...mapGetters(["users"]),
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin: 0 auto;
  background-size: cover;
  background-image: url("https://preview.colorlib.com/theme/bootstrap/login-form-19/images/xbg.jpg.pagespeed.ic.3DwAHJh7F3.webp");
}
.card {
  width: 450px;
  background-color: #000232;
  height: 750px;
  border-radius: 10px;
}

p {
  color: #ffffff80;
}
a {
  color: #b689b0;
  display: flex;
  justify-content: center;
}
.field {
  margin-bottom: 2rem;
}

button {
  background-color: #b689b0;
  border: #b689b0;
  height: 50px;
}

button:hover {
  background-color: #9c6c96 !important;
}

@media screen and (max-width: 600px) {
  .card {
    width: 80%;
  }
}
</style>
