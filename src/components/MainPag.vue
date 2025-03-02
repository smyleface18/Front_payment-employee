<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>
<template>
    <div class="flex ">
       <div class="flex flex-col justify-center w-1/5 h-full  py-5   bg-[#1d293d]   text-white">
            <ul class="w-full  flex flex-col space-y-10">
                    <RouterLink to="/ListCategories">
                        <p class="text-center hover:bg-[#ffffff]  hover:text-[#1d293d] p-2 font-semibold text-xl w-full">
                            Lista de cargos
                        </p>
                    </RouterLink>
                    <RouterLink to="/ListPaymentsFull">
                        <p class="text-center hover:bg-[#ffffff] hover:text-[#1d293d]  p-2 font-semibold text-xl w-full">
                            Lista de pagos
                        </p>
                    </RouterLink>
                    <RouterLink to="/ListEmployees">
                        <p class="text-center hover:bg-[#ffffff] hover:text-[#1d293d]  p-2 font-semibold text-xl w-full">
                            Lista de empleados
                        </p>
                    </RouterLink>
            </ul>
       </div>
       <RouterView class="flex justify-center items-center w-4/5  " ></RouterView>
    </div>
</template>