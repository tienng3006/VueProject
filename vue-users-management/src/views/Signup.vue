<template>
  <div class="form-demo mt-7">
    <Toast />
    <div class="flex justify-content-center">
      <div class="card text-white">
        <div class="img">
          <span class="title">Sign Up</span>
        </div>
        <form
          @submit.prevent="handleSubmit(!v$.$invalid)"
          class="p-fluid p-4 mt-5"
        >
          <div class="field">
            <div class="p-float-label">
              <InputText
                id="name"
                v-model="v$.name.$model"
                :class="{ 'p-invalid': v$.name.$invalid && submitted }"
                aria-describedby="name-error"
              />
              <label
                for="name"
                :class="{ 'p-error': v$.name.$invalid && submitted }"
                >Username</label
              >
            </div>
            <span v-if="v$.name.$error && submitted">
              <span
                id="name-error"
                v-for="(error, index) of v$.name.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.name.$invalid && submitted) || v$.name.$pending.$response
              "
              class="p-error"
              >{{
                v$.email.required.$message.replace("Value", "Username")
              }}</small
            >
          </div>
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope" />
              <InputText
                id="email"
                v-model="v$.email.$model"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                aria-describedby="email-error"
              />
              <label
                for="email"
                :class="{ 'p-error': v$.email.$invalid && submitted }"
                >Email</label
              >
            </div>
            <span v-if="v$.email.$error && submitted">
              <span
                id="email-error"
                v-for="(error, index) of v$.email.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.email.$invalid && submitted) || v$.email.$pending.$response
              "
              class="p-error"
              >{{ v$.email.required.$message.replace("Value", "Email") }}</small
            >
          </div>
          <div class="field">
            <div class="p-float-label">
              <Password
                id="password"
                v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                toggleMask
                aria-describedby="password-error"
                :feedback="false"
              />
              <label
                for="password"
                :class="{ 'p-error': v$.password.$invalid && submitted }"
                >Password</label
              >
            </div>
            <span v-if="v$.password.$error && submitted">
              <span
                id="password-error"
                v-for="(error, index) of v$.password.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.password.$invalid && submitted) ||
                v$.password.$pending.$response
              "
              class="p-error"
              >{{
                v$.password.required.$message.replace("Value", "Password")
              }}</small
            >
          </div>
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-map-marker" />
              <InputText id="address" v-model="address" />
              <label for="address">Address</label>
            </div>
          </div>
          <Button type="submit" label="Submit" class="mt-2" />
          <div class="text-center">
            <p>Have an accout?</p>
            <router-link to="/sign-in">SIGN IN</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { email, required, helpers, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapActions, mapGetters } from "vuex";

const alpha = helpers.regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/
);

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      name: "",
      email: "",
      password: "",
      address: "",
      submitted: false,
      showMessage: false,
    };
  },
  validations() {
    return {
      name: {
        required,
        maxLength: helpers.withMessage(
          "Username limit 10 characters",
          maxLength(10)
        ),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        alpha: helpers.withMessage(
          "Password at least 8 characters, upper and lower case letters, at least one number and one special character",
          alpha
        ),
      },
    };
  },
  methods: {
    ...mapActions(["addUser", "fetchUsers"]),
    handleSubmit(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      }
      const index = this.users.find((user) => user.username === this.name);
      if (index) {
        this.$toast.add({
          severity: "warn",
          summary: "Username available",
          life: 3000,
        });
        return;
      }
      const newUser = {
        username: this.name,
        password: this.password,
        email: this.email,
        address: this.address,
      };
      this.addUser(newUser);
      this.resetForm();
      this.$router.push("/sign-in");
    },
    resetForm() {
      this.name = "";
      this.email = "";
      this.password = "";
      this.address = "";
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
.card {
  width: 450px;
  background-color: #000232;
  height: 750px;
  border-radius: 10px;
}
.img {
  background-image: url("https://preview.colorlib.com/theme/bootstrap/login-form-03/images/xbg_1.jpg.pagespeed.ic.R5QWIA8_nZ.webp");
  width: 100%;
  z-index: 1;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 70px 15px 74px 15px;
  border-radius: 10px 10px 0 0;
}
.title::before {
  content: "";
  display: block;
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(54, 84, 99, 0.7);
  border-radius: 10px 10px 0 0;
}
.title {
  font-weight: bold;
  font-size: 30px;
  color: #fff;
  line-height: 1.2;
  text-align: center;
}

.field {
  margin-bottom: 2rem;
}

a {
  color: #b689b0;
}

p {
  color: #ffffff80;
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
