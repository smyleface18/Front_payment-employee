<script setup>
import RowPaymentFull from './RowPaymentFull.vue';
import { ref, onMounted } from 'vue';


let Payments = ref();
let PaginationData = ref({
    Page: 1,
    NumberPage: "",
    elements: 5,
    sectionPayments: [

    ],
    init: 0,
    end: 5
});

const fetchEmployees = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8080/Payments/listPaymentRecords", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        Payments.value = await response.json();
        Payments.value = [...Payments.value].reverse()
    } catch (err) {
        error.value = err.message;
    }

    setDataPage()
    getSectionEmployee()
}




onMounted(fetchEmployees);

    
function setDataPage() {
    if (Payments.value.length > 0) {
        PaginationData.value.NumberPage = Math.ceil(Payments.value.length / PaginationData.value.elements);
    } else {
        PaginationData.value.NumberPage = 0;
    }
}

function getSectionEmployee(){
    PaginationData.value.sectionPayments = [...Payments.value]
                .slice(PaginationData.value.init,PaginationData.value.end)

}

function NextPage(){
    if (PaginationData.value.end < Payments.value.length) {
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
        <div class="w-full h-full flex items-center p-5">
            <!-- component -->
            <div class="w-full ">

                <div
                    class="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <div class="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                        <div class="flex items-center justify-between p-5">
                            <div>
                                <h3 class="text-lg font-semibold text-slate-800">Lista de pagos</h3>
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
                                            Id de pago
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
                                            Horas
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
                                            Pago
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
                                        class="p-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                                        <p
                                            class="flex items-center justify-between gap-2 font-sans text-sm  font-normal leading-none text-slate-500">
                                        </p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-for="payment in PaginationData.sectionPayments">
                                <RowPaymentFull :payment="payment"></RowPaymentFull>
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