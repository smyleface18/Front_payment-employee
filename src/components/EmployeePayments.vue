<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import ListPaymentsEmployee from "./ListPaymentsEmployee.vue";
import Modal from "./Modal.vue";
import RegisterPayment from "./RegisterPayment.vue";

const route = useRoute();
const error = ref()
const ID_EMPLOYEE = route.query.idEmployee;
let employee = ref({
    id: "",
    identityNumber : "",
    name : "",
    lastname : "",
    email : "",
    img : "",
    category: {
        salaryXhour: "",
    },
    payments: [],
});
let loading = ref(true);
let popup = ref(false);

const fetchEmployees = async () => {
    try {
        const response = await fetch(
            `http://127.0.0.1:8080/Employee/Employee/${ID_EMPLOYEE}`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        employee.value = await response.json();
       
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

onMounted(fetchEmployees);
</script>
<template>
    <div class="h-full flex-col flex items-center justify-start">
        <div class="w-3/4 bg-slate-800 h-2/5 flex flex-col items-center text-white space-y-5 p-5 rounded-b-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24">
                <g fill="none" fill-rule="evenodd">
                    <path
                        d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                    <path fill="currentColor"
                        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.99 7.99 0 0 1 12 20a7.99 7.99 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984" />
                </g>
            </svg>
            <div class="space-y-5">
                <div class="flex space-x-5 justify-center">
                    <p class="text-xl">
                        <span class="font-semibold">Nombre: </span>{{ employee.name }}
                    </p>
                    <p class="text-xl">
                        <span class="font-semibold">Apellidos: </span>{{ employee.lastname }}
                    </p>
                    <p class="text-xl">
                        <span class="font-semibold"># identidad: </span>{{ employee.identityNumber }}
                    </p>
                </div>
                <div class="flex space-x-5 justify-center">
                    <p class="text-xl">
                        <span class="font-semibold">Email: </span>{{ employee.email }}
                    </p>
                    <p class="text-xl">
                        <span class="font-semibold">Rol: </span>{{
                            employee.category.rol + "(" + employee.category.department + ")"
                        }}
                    </p>
                    <p class="text-xl">
                        <span class="font-semibold">Salario por hora: </span>{{
                            employee.category.salaryXhour.toLocaleString("en") }} $
                    </p>
                </div>
            </div>
        </div>
        <ListPaymentsEmployee v-if="!(loading )" :payments="employee.payments"
            :valueHour="employee.category.salaryXhour" :idEmployee="ID_EMPLOYEE"></ListPaymentsEmployee>
    </div>
</template>
