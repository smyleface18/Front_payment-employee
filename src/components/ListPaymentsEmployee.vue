<script setup>
import Modal from './Modal.vue';
import {  ref } from 'vue';
import RowPayment from './RowPayment.vue';
import RegisterPayment from './RegisterPayment.vue';

const props = defineProps(["payments","valueHour","idEmployee"])



let popup = ref(false);
let PaginationData = ref({
    Page: 1,
    NumberPage: "",
    elements: 2,
    sectionPayments: [

    ],
    init: 0,
    end: 2
});

function setDataPage() {
    if (props.payments.length > 0) {
        PaginationData.value.NumberPage = Math.ceil(props.payments.length / PaginationData.value.elements);
    } else {
        PaginationData.value.NumberPage = 0;
    }
}

function getSectionEmployee() {
    PaginationData.value.sectionPayments = [...props.payments].reverse()
        .slice(PaginationData.value.init, PaginationData.value.end)

}

function NextPage() {
    if (PaginationData.value.end < props.payments.length) {
        PaginationData.value.init += PaginationData.value.elements;
        PaginationData.value.end +=  PaginationData.value.elements;
        PaginationData.value.Page++;
        setDataPage()
        getSectionEmployee()
    }
}

function PreviousPage() {
    if (PaginationData.value.init > 0) {
        PaginationData.value.init -=  PaginationData.value.elements;
        PaginationData.value.end -=  PaginationData.value.elements;
        PaginationData.value.Page--;
        setDataPage()
        getSectionEmployee()
    }
}


setDataPage()
getSectionEmployee()

</script>
<template>
            <Modal :ViewPopup="popup" @closePopup="popup = false"  >
                <RegisterPayment @Registered="popup = false" :valueHour="props.valueHour" :idEmployee="props.idEmployee"></RegisterPayment>
            </Modal>
    <div class="w-full flex justify-center">
        <div class="w-3/4 h-full flex items-center">
            <!-- component -->
            <div class="w-full ">

                <div
                    class="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <div class="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                        <div class="flex items-center justify-between p-5">
                            <div>
                                <h3 class="text-lg font-semibold text-slate-800">Lista de pagos</h3>
                            </div>
                            <div class="flex flex-col hover:scale-110 ">
                                <button @click="popup = !popup"
                                    class="flex select-none items-center gap-2 cursor-pointer  rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white "
                                    type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor" d="M10.25 9A6.25 6.25 0 0 0 4 15.25v3.25h40v-3.25A6.25 6.25 0 0 0 37.75 9zM4 32.75V21h40v11.75A6.25 6.25 0 0 1 37.75 39h-27.5A6.25 6.25 0 0 1 4 32.75m27.25-3.25a1.25 1.25 0 1 0 0 2.5h5.5a1.25 1.25 0 1 0 0-2.5z"/></svg>
                                    Agregar Pago
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
                                            Horas trabajadas
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
                                            Valor del pago
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
                                <RowPayment :payment="payment" :valueHour="props.valueHour"></RowPayment>
                            </tbody>
                        </table>
                    </div>
                    <div class="flex items-center justify-between p-3">
                        <p class="block text-sm text-slate-500">
                            Pagina {{ PaginationData.Page }} de {{ PaginationData.NumberPage }}
                        </p>
                        <div class="flex gap-1">
                            <button @click="PreviousPage()"
                                class="rounded border border-slate-300 py-2.5 px-3 text-center text-xs font-semibold text-slate-600 transition-all hover:opacity-75 focus:ring focus:ring-slate-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button">
                                Anterior
                            </button>
                            <button @click="NextPage()"
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