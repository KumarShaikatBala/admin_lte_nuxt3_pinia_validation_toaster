<template>
    <main v-if="hasViewPermission">
        <h4 class="fw-bold py-3 mb-4">
            <span class="text-muted fw-light">Dashboard / </span>
            <span id="pageTitle">{{ pageTitle }}</span>
        </h4>
        <div class="card">
            <div class="card-datatable table-responsive pt-0">
                <div class="row w-100 p-4 pe-0">
                    <div class="col-6 head-label">
                        <h5 class="card-title mb-0">{{ pageTitle }}</h5>
                    </div>
                    <div class="col-6" v-if="hasCreatePermission">
                        <span class="create-new btn btn-primary float-end" @click="handleCreate">
                            <i class="ti ti-plus me-sm-1"></i>
                            <span class="d-none d-sm-inline-block">Add New Record</span>
                        </span>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Title</th>
                            <th>Guard Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-if="permissionDatas.length > 0">
                            <tr v-for="permissionData in permissionDatas" :key="permissionData.id">
                                <td class="col1">{{ permissionData.id }}</td>
                                <td class="col2" v-if="permissionData.permission_titles">{{ permissionData.permission_titles.title }}</td>
                                <td class="col3">{{ permissionData.guard_name }}</td>
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

        <CommonModalsBaseModal :showModal="showFormModal" :pageTitle="pageTitle" :modalSize="modalSize" :isCreate="isCreate"
            :isEdit="isEdit" @createRecord="handleSubmit" @updateRecord="handleSubmit" @closeModal="handleCloseFormModal">
            <form class="row px-2" autocomplete="off">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 mb-3">
                            <label for="title" class="form-label">Permission Name <small class="text-info">(Exp.: Tuition
                                    Fees Management)</small></label>
                            <input type="text" class="form-control" placeholder="Permission Name" v-model="form.title" />
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
const pageTitle = ref("Permissions List");
useHead({
    title: pageTitle.value + " | Admin Panel WIS",
});

const guardsToBeChecked = "permissions_management_view,permissions_management_create,permissions_management_edit,permissions_management_delete";
const { checkGuards } = useCheckGuards(guardsToBeChecked);

const {
    hasViewPermission,
    hasCreatePermission,
    hasEditPermission,
    hasDeletePermission
} = checkGuards();

const isCreate = ref(false);
const isEdit = ref(false);
const permissionDatas = ref([]);
const currentPage = ref(1);
const perPage = ref(9);
const totalPages = ref(0);
const totalData = ref(0);
const modalSize = ref("");
const showFormModal = ref(false);
const form = ref({
    id: "",
    title: "",
});

async function fetchData() {
    try {
        const response = await useMyFetch(
            "admin/permission/fetchData",
            {
                params: {
                    page: currentPage.value,
                    perPage: perPage.value,
                }
            }
        );
        if (response) {
            permissionDatas.value = response.data.getData.data;
            currentPage.value = response.data.getData.current_page;
            totalPages.value = response.data.getData.last_page;
            totalData.value = response.data.getData.total;
        }
    } catch (error) {
        console.error(error);
    }
}

fetchData();

function refetchData(pageNumber) {
    currentPage.value = pageNumber;
    fetchData();
}

function resetFormData() {
    form.value.id = "";
    form.value.title = "";
}

function handleErrors() {
    let errorMessages = [];

    if (!form.value.title) {
        errorMessages.push("Title is required!");
    }
    if (errorMessages.length > 0) {
        for (const message of errorMessages) {
            toastr.error(message);
        }
        return;
    }
}

function handleCreate() {
    isCreate.value = true;
    handleShowFormModal();
    resetFormData();
}

async function handleSubmit() {
    try {
        handleErrors();
        if (isCreate.value) {
            try {
                const response = await useMyFetch(
                    "admin/permission/store",
                    {
                        method: "POST",
                        body: JSON.stringify(form.value)
                    }
                );
                if (response.status === "success") {
                    toastr.success(response.message);
                    handleCloseFormModal();
                    resetFormData();
                    fetchData();
                }
            } catch (error) { }
        }
    } catch (error) {
        toastr.error("Something went wrong! Please try again later.");
        console.error('Error:', error.response.status, '-', error.response.statusText);
    }
}
function handleShowFormModal() {
    showFormModal.value = true;
}

function handleCloseFormModal() {
    showFormModal.value = false;
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