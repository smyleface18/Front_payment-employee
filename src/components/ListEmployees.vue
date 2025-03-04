<script setup>
import RowEmployee from './RowEmployee.vue';
import Modal from './Modal.vue';
import CreateEmployee from './CreateEmployee.vue';
import { ref, onMounted } from 'vue';


let employees = ref();
let popup = ref(false);
let PaginationData = ref({
    Page: 1,
    NumberPage: "",
    elements: 5,
    sectionEmployess: [

    ],
    init: 0,
    end: 0
});
PaginationData.value.end = PaginationData.value.elements;

const fetchEmployees = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8080/Employee/listEmployees", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        employees.value = await response.json();
        employees.value = [...employees.value].reverse()
    } catch (err) {
        error.value = err.message;
    }

    setDataPage()
    getSectionEmployee()
}




onMounted(fetchEmployees);

function setDataPage() {
    if (employees.value.length > 0) {
        PaginationData.value.NumberPage = Math.ceil(employees.value.length / PaginationData.value.elements);
    } else {
        PaginationData.value.NumberPage = 0;
    }
}

function getSectionEmployee(){
    PaginationData.value.sectionEmployess = [...employees.value]
                .slice(PaginationData.value.init,PaginationData.value.end)

}

function NextPage(){
    if (PaginationData.value.end < employees.value.length) {
        PaginationData.value.init += PaginationData.value.elements;
        PaginationData.value.end +=  PaginationData.value.elements;
        PaginationData.value.Page++;
        setDataPage()
        getSectionEmployee()
    }
}

function PreviousPage(){
    if (PaginationData.value.init > 0) {
    PaginationData.value.init -= PaginationData.value.elements;
    PaginationData.value.end -= PaginationData.value.elements;
    PaginationData.value.Page--;
    setDataPage()
    getSectionEmployee()
    
    }
}
</script>
<template>
    <div>
        <Modal :ViewPopup="popup" @closePopup="popup = false"   >
            <CreateEmployee @employeeRegistered="popup = false"></CreateEmployee>
        </Modal>
        <div class="w-full h-full flex items-center p-5">
            <!-- component -->
            <div class="w-full ">

                <div
                    class="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <div class="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                        <div class="flex items-center justify-between p-5">
                            <div>
                                <h3 class="text-lg font-semibold text-slate-800">Lista de empleados</h3>
                            </div>
                            <div class="flex flex-col hover:scale-110 ">
                                <button @click="popup = !popup" 
                                    class="flex select-none items-center gap-2 cursor-pointer  rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white "
                                    type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        aria-hidden="true" stroke-width="2" class="w-4 h-4">
                                        <path
                                            d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z">
                                        </path>
                                    </svg>
                                    Agregar empleado
                                </button>
                            </div>
                        </div>

                    </div>
                    <div class="p-0 ">
                        <table class="w-full mt-4 text-left table-auto min-w-max">
                            <thead>
                                <tr>
                                    <th
                                        class="p-4 transition-colors  border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            class="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                            Empleado
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="2" stroke="currentColor" aria-hidden="true"
                                                class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                        </p>
                                    </th>
                                    <th
                                        class="p-4 transition-colors border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            class="flex items-center justify-between gap-2 font-sans text-sm font-normal leading-none text-slate-500">
                                            Función
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="2" stroke="currentColor" aria-hidden="true"
                                                class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                        </p>
                                    </th>
                                    <th
                                        class="p-4 transition-colors  border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            class="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                            Numero de identidad
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="2" stroke="currentColor" aria-hidden="true"
                                                class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                        </p>
                                    </th>
                                    <th
                                        class="p-4 transition-colors  border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            class="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                            Pagos
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke-width="2" stroke="currentColor" aria-hidden="true"
                                                class="w-4 h-4">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
                                            </svg>
                                        </p>
                                    </th>
                                    <th
                                        class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            class="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-for="empoloyee in PaginationData.sectionEmployess">
                                <RowEmployee :employee="empoloyee"></RowEmployee>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex items-center justify-between p-3">
                        <p class="block text-sm text-slate-500">
                            Pagina {{ PaginationData.Page }} de {{ PaginationData.NumberPage }}
                        </p>
                        <div class="flex gap-1">
                            <button
                                @click="PreviousPage()"
                                class="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                Anterior
                            </button>
                            <button
                                @click="NextPage()"
                                class="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>