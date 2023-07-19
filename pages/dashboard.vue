<script setup lang="js">
useHead({
    title: "Login | Admin Panel ",
});

definePageMeta({
    middleware: ["auth"],
    layout: "default",
});
const { $axios } = useNuxtApp()



/*
function getPosts() {
  $axios.get('/user',{
  })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
}

getPosts()
*/







/*
const guardsToBeChecked = "dashboard_management_view,dashboard_management_create,dashboard_management_edit,dashboard_management_delete";
const { checkGuards } = useCheckGuards(guardsToBeChecked);
const {
    hasViewPermission,
    hasCreatePermission,
    hasEditPermission,
    hasDeletePermission
} = checkGuards();

*/






</script>

<template>

            <!-- Content Header (Page header) -->
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Dashboard</h1>
                        </div><!-- /.col -->
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active">Dashboard v1</li>
                            </ol>
                        </div><!-- /.col -->

                    </div><!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
            <!-- /.content-header -->

            <!-- Main content -->
            <section class="content">
                <div class="container-fluid">
                    <!-- Small boxes (Stat box) -->
                    <div class="row">
                        <div class="col-lg-3 col-6">
                            <!-- small box -->
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3>150</h3>

                                    <p>New Orders</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-bag"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-6">
                            <!-- small box -->
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3>53<sup style="font-size: 20px">%</sup></h3>

                                    <p>Bounce Rate</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-stats-bars"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-6">
                            <!-- small box -->
                            <div class="small-box bg-warning">
                                <div class="inner">
                                    <h3>44</h3>

                                    <p>User Registrations</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-person-add"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-6">
                            <!-- small box -->
                            <div class="small-box bg-danger">
                                <div class="inner">
                                    <h3>65</h3>

                                    <p>Unique Visitors</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-pie-graph"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                    </div>
                </div><!-- /.container-fluid -->
            </section>
            <!-- /.content -->

<!--    <div v-if="hasViewPermission">
        <div class="content-wrapper">
            &lt;!&ndash; Content Header (Page header) &ndash;&gt;
            <div class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1 class="m-0">Dashboard</h1>
                        </div>&lt;!&ndash; /.col &ndash;&gt;
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active">Dashboard v1</li>
                            </ol>
                        </div>&lt;!&ndash; /.col &ndash;&gt;
                        
                    </div>&lt;!&ndash; /.row &ndash;&gt;
                </div>&lt;!&ndash; /.container-fluid &ndash;&gt;
            </div>
            &lt;!&ndash; /.content-header &ndash;&gt;

            &lt;!&ndash; Main content &ndash;&gt;
            <section class="content">
                <div class="container-fluid">
                    &lt;!&ndash; Small boxes (Stat box) &ndash;&gt;
                    <div class="row">
                        <div class="col-lg-3 col-6">
                            &lt;!&ndash; small box &ndash;&gt;
                            <div class="small-box bg-info">
                                <div class="inner">
                                    <h3>150</h3>

                                    <p>New Orders</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-bag"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        &lt;!&ndash; ./col &ndash;&gt;
                        <div class="col-lg-3 col-6">
                            &lt;!&ndash; small box &ndash;&gt;
                            <div class="small-box bg-success">
                                <div class="inner">
                                    <h3>53<sup style="font-size: 20px">%</sup></h3>

                                    <p>Bounce Rate</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-stats-bars"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        &lt;!&ndash; ./col &ndash;&gt;
                        <div class="col-lg-3 col-6">
                            &lt;!&ndash; small box &ndash;&gt;
                            <div class="small-box bg-warning">
                                <div class="inner">
                                    <h3>44</h3>

                                    <p>User Registrations</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-person-add"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        &lt;!&ndash; ./col &ndash;&gt;
                        <div class="col-lg-3 col-6">
                            &lt;!&ndash; small box &ndash;&gt;
                            <div class="small-box bg-danger">
                                <div class="inner">
                                    <h3>65</h3>

                                    <p>Unique Visitors</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-pie-graph"></i>
                                </div>
                                <a href="#" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        &lt;!&ndash; ./col &ndash;&gt;
                    </div>
                </div>&lt;!&ndash; /.container-fluid &ndash;&gt;
            </section>
            &lt;!&ndash; /.content &ndash;&gt;
        </div>
    </div>-->
</template>

<style scoped></style>