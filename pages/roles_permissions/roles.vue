<template>
    <main v-if="hasViewPermission">
        <h4 class="fw-bold py-3 mb-4">
            <span class="text-muted fw-light">Dashboard / </span>
            <span id="pageTitle">{{ pageTitle }}</span>
        </h4>
        <h4 class="fw-semibold mb-4">{{ pageTitle }}</h4>

        <p class="mb-4">
            A role provided access to predefined menus and features so that depending on <br />
            assigned role an administrator can have access to what user needs.
        </p>
        <!-- Role cards -->
        <div class="row g-4">
            <div class="col-xl-4 col-lg-6 col-md-6" v-for="roleData in roleDatas" :key="roleData.id">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-end mt-1">
                            <div class="role-heading">
                                <h4 class="mb-1">{{ roleData.title }}</h4>
                                <a href="javascript:void(0);" data-bs-toggle="modal" class="role-edit-modal"><span>Edit Role</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-4 col-lg-6 col-md-6">
                <div class="card h-100">
                    <div class="row h-100">
                        <div class="col-sm-5">
                            <div class="d-flex align-items-end h-100 justify-content-center mt-sm-0 mt-3">
                                <img src="~/assets/img/illustrations/add-new-roles.png" class="img-fluid mt-sm-4 mt-md-0"
                                    alt="add-new-roles" width="83" />
                            </div>
                        </div>
                        <div class="col-sm-7" v-if="hasCreatePermission">
                            <div class="card-body text-sm-end text-center ps-sm-0">
                                <button class="btn btn-primary mb-2 text-nowrap add-new-role" @click="handleCreate">
                                    Add New Role
                                </button>
                                <p class="mb-0 mt-1">Add role, if it does not exist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <!-- Role Table -->
                <div class="card">
                    <div class="card-datatable table-responsive pt-0">
                        <div class="row w-100 p-4 pe-0">
                            <div class="col-6 head-label">
                                <h5 class="card-title mb-0">{{ pageTitle }}</h5>
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th v-if="hasEditPermission || hasDeletePermission">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="userDatas.length > 0">
                                    <tr v-for="userData in userDatas" :key="userData.id">
                                        <td class="col1">{{ userData.id }}</td>
                                        <td class="col2">{{ userData.name }}</td>
                                        <td class="col3">
                                            <span v-if="userData.role_rlt">{{ userData.role_rlt.roles.title }}</span>
                                            <span v-else class="text-danger">Not Assigned</span>
                                        </td>
                                        <td class="col4" v-if="hasEditPermission || hasDeletePermission">
                                            <button type="button" class="btn btn-icon btn-label-warning" v-if="hasEditPermission" @click="handleEdit(userData.id)">
                                                <span class="fa-solid fa-pen-to-square"></span>
                                            </button>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr class="text-center">
                                        <td colspan="7">No Data Found!</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                        <CommonPagination @change="refetchData" :currentPage="currentPage" :perPage="perPage"
                            :totalPages="totalPages" :totalData="totalData" />
                    </div>
                </div>
                <!--/ Role Table -->
            </div>
        </div>
        <!--/ Role cards -->
        <CommonModalsRolePermissionModal 
            :showModal="showRolePermissionsModal" 
            :pageTitle="pageTitle" 
            :modalSize="modalSize" 
            :isCreate="isCreate"
            :isEdit="isEdit" 
            :form="form"
            @refetchData="refetchData" 
            @resetFormData="resetFormData"
            @closeModal="handleCloseFormModal"
        />
        
        <CommonModalsBaseModal :showModal="showRoleAssignModal" :pageTitle="pageTitle" :modalSize="modalSizeRP" :isCreate="isCreateRP"
            :isEdit="isEditRP" @createRecord="handleEdit" @updateRecord="handleEdit" @closeModal="handleCloseFormModal">
            <form class="row px-2" autocomplete="off">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 mt-4">
                            <label for="select" class="form-label">Select Role:</label>
                            <select v-model="form.roles_id" class="select2 form-select form-select-lg" data-allow-clear="true">
                                <option v-for="roleData in roleDatas" :key="roleData.id" :value="roleData.id">
                                    {{ roleData.title }}
                                </option>
                            </select>
                        </div>
                        <input type="hidden" v-model="form.id" />
                    </div>
                </div>
            </form>
        </CommonModalsBaseModal>
    </main>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
});
const pageTitle = ref("Roles List");
useHead({
    title: pageTitle.value + " | Admin Panel WIS",
});

const guardsToBeChecked = "roles_management_view,roles_management_create,roles_management_edit,roles_management_delete";
const { checkGuards } = useCheckGuards(guardsToBeChecked);

const {
    hasViewPermission,
    hasCreatePermission,
    hasEditPermission,
    hasDeletePermission
} = checkGuards();

const isCreate = ref(false);
const isCreateRP = ref(false);
const isEdit = ref(false);
const isEditRP = ref(false);
const roleDatas = ref([]);
const currentPage = ref(1);
const perPage = ref(9);
const totalPages = ref(0);
const totalData = ref(0);
const modalSize = ref("modal-xl");
const modalSizeRP = ref("modal-sm");
const showRolePermissionsModal = ref(false);
const showRoleAssignModal = ref(false);
const userDatas = ref([]);

const form = ref({
    id: "",
    title: "",
    permission_ids: [],
});

const formRP = ref({
    id: "",
    roles_id : "",
});

const currentFormDataRP = ref([]);

async function fetchUser() {
    try {
        const response = await useMyFetch(
            "admin/user/fetchData",
            {
                params: {
                    page: currentPage.value,
                    perPage: perPage.value,
                }
            }
        );
        if (response) {
            userDatas.value = response.data.getData.data;
        }
    } catch (error) { }
}

fetchUser();

async function fetchData() {
    try {
        const response = await useMyFetch(
            "admin/role/fetchData",
            {
                params: {
                    page: currentPage.value,
                    perPage: perPage.value,
                }
            }
        );
        if (response) {
            roleDatas.value = response.data.getData.data;
            currentPage.value = response.data.getData.current_page;
            totalPages.value = response.data.getData.last_page;
            totalData.value = response.data.getData.total;
        }
    } catch (error) { }
}

fetchData();

function refetchData(pageNumber) {
    currentPage.value = pageNumber;
    fetchData();
}

function resetFormData() {
    form.value.id = "";
    form.value.title = "";
    form.value.permission_ids = [];
}

function handleCreate() {
    isCreate.value = true;
    handleShowRolePermissionsModal();
    resetFormData();
}

function handleEdit(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You are about to update a record!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!',
        customClass: {
            confirmButton: 'btn btn-primary me-1',
            cancelButton: 'btn btn-label-secondary'
        },
        buttonsStyling: false
    }).then(async function (result) {
        if (result.value) {
            try {
                const response = await useMyFetch(
                    "admin/rolesUser/" + id + "/edit"
                );
                if (response) {
                    handleShowRoleAssignModal();
                    isCreateRP.value = false;
                    isEditRP.value = true;
                    formRP.value = {
                        id: response.data.getData.id,
                        roles_id : response.data.getData.roles_id ,
                    };
                    currentFormDataRP.value = {
                        id: response.data.getData.id,
                        roles_id : response.data.getData.roles_id ,
                    };
                }
            } catch (error) { }
        }
    });
}

function handleShowRolePermissionsModal() {
    showRolePermissionsModal.value = true;
}

function handleShowRoleAssignModal() {
    showRoleAssignModal.value = true;
}

function handleCloseFormModal() {
    showRolePermissionsModal.value = false;
    showRoleAssignModal.value = false;
}
</script>

<style scoped>
.col1 {
    width: 20%;
}

.col2 {
    width: 40%;
}

.col3 {
    width: 40%;
}
</style>