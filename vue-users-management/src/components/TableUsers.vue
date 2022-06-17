<template>
  <div class="data-table mt-5">
    <DataTable
      :value="users"
      sresponsiveLayout="scroll"
      :paginator="true"
      :rows="8"
      filterDisplay="menu"
      v-model:filters="filters"
      :rowHover="true"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    >
      <template #header>
        <div class="flex justify-content-between">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </template>
      <Column field="username" header="Username" :sortable="true"></Column>
      <Column field="email" header="Email" :sortable="true"></Column>
      <Column field="address" header="Address" :sortable="true"></Column>
      <Column :exportable="false" style="min-width: 8rem">
        <template #body="slotProps">
          <Button
            icon="pi pi-pencil"
            class="p-button-rounded p-button-success mr-2"
            @click="updateUser(slotProps.data)"
          />
          <Button
            icon="pi pi-trash"
            class="p-button-rounded p-button-warning"
            @click="confirmDeleteUser(slotProps.data)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
  <Dialog
    v-model:visible="userDialog"
    :style="{ width: '450px' }"
    header="User Details"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Username</label>
      <InputText
        id="name"
        v-model.trim="user.username"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !user.username }"
      />
      <small class="p-error" v-if="submitted && !user.username"
        >Name is required.</small
      >
    </div>
    <div class="field">
      <label for="name">Password</label>
      <InputText
        id="password"
        v-model.trim="user.password"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !user.password }"
      />
      <small class="p-error" v-if="submitted && !user.password"
        >Password is required.</small
      >
    </div>
    <div class="field">
      <label for="email">Email</label>
      <InputText
        id="email"
        v-model.trim="user.email"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !user.email }"
      />
      <small class="p-error" v-if="submitted && !user.email"
        >Email is required.</small
      >
    </div>
    <div class="field">
      <label for="address" class="mb-3">Address</label>
      <InputText id="address" v-model.trim="user.address" autofocus />
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="saveUser"
      />
    </template>
  </Dialog>
  <Dialog
    v-model:visible="deleteUserDialog"
    :style="{ width: '450px' }"
    header="Confirm"
    :modal="true"
  >
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span v-if="user"
        >Are you sure you want to delete <b>{{ user.username }}</b
        >?</span
      >
    </div>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        class="p-button-text"
        @click="deleteUserDialog = false"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        class="p-button-text"
        @click="dlUser"
      />
    </template>
  </Dialog>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      userDialog: false,
      submitted: false,
      user: {},
      deleteUserDialog: false,
    };
  },
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
  },
  methods: {
    ...mapActions(["fetchUsers", "deleteUser", "editUser"]),
    hideDialog() {
      this.userDialog = false;
      this.submitted = false;
    },
    confirmDeleteUser(user) {
      this.user = user;
      this.deleteUserDialog = true;
    },
    dlUser() {
      this.deleteUser(this.user.id);
      this.deleteUserDialog = false;
      this.user = {};
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "User Deleted",
        life: 3000,
      });
    },
    saveUser() {
      this.submitted = true;
      if (
        this.user.username.trim() &&
        this.user.email.trim() &&
        this.user.password.trim()
      ) {
        this.editUser(this.user);
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "User Edited",
          life: 3000,
        });
        this.userDialog = false;
        this.user = {};
      }
    },
    updateUser(user) {
      this.user = { ...user };
      this.userDialog = true;
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

<style lang="scss" scoped>
.data-table {
  width: 80%;
  margin: 50px auto;
}

table {
  background-color: black !important;
}
</style>
