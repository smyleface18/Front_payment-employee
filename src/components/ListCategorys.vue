<script setup>
import Modal from './Modal.vue';
import { ref, onMounted } from 'vue';
import RowCategory from './RowCategory.vue';
import CreateCategory from './CreateCategory.vue';


let categorys = ref();
let popup = ref(false);
let PaginationData = ref({
    Page: 1,
    NumberPage: "",
    elements: 5,
    sectionCategories: [

    ],
    init: 0,
    end: 5
});

const getCategorys = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8080/Category/listCategorys",{
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        })

        if(!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }
        categorys.value = await response.json();
    }catch(err){

    }

    setDataPage()
    getSectionCategories()
}




onMounted(getCategorys)

function setDataPage() {
    if (categorys.value.length > 0) {
        PaginationData.value.NumberPage = Math.ceil(categorys.value.length / PaginationData.value.elements);
    } else {
        PaginationData.value.NumberPage = 0;
    }
}

function getSectionCategories(){
    PaginationData.value.sectionCategories = [...categorys.value]
                .slice(PaginationData.value.init,PaginationData.value.end)

}

function NextPage(){
    if (PaginationData.value.end < categorys.value.length) {
        PaginationData.value.init += PaginationData.value.elements;
        PaginationData.value.end +=  PaginationData.value.elements;
        PaginationData.value.Page++;
        setDataPage()
        getSectionCategories()
    }
}

function PreviousPage(){
    if (PaginationData.value.init > 0) {
    PaginationData.value.init -= PaginationData.value.elements;
    PaginationData.value.end -= PaginationData.value.elements;
    PaginationData.value.Page--;
    setDataPage()
    getSectionCategories()
    }
}
</script>
<template>
    <div>
        <Modal :ViewPopup="popup" @closePopup="popup = false"   >
            <CreateCategory @Registered="popup = false"></CreateCategory>
        </Modal>
        <div class="w-full h-full flex items-center p-5">
            <!-- component -->
            <div class="w-full ">

                <div
                    class="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
                    <div class="relative mx-4 mt-4 overflow-hidden text-slate-700 bg-white rounded-none bg-clip-border">
                        <div class="flex items-center justify-between p-5">
                            <div>
                                <h3 class="text-lg font-semibold text-slate-800">Lista de cargos</h3>
                            </div>
                            <div class="flex flex-col hover:scale-110 ">
                                <button @click="popup = !popup" 
                                    class="flex select-none items-center gap-2 cursor-pointer  rounded bg-slate-800 py-2.5 px-4 text-xs font-semibold text-white "
                                    type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		                                <path fill="currentColor" d="M4.616 20q-.691 0-1.153-.462T3 18.384V8.616q0-.691.463-1.153T4.615 7H9V5.615q0-.69.463-1.153T10.616 4h2.769q.69 0 1.153.462T15 5.615V7h4.385q.69 0 1.152.463T21 8.616v9.769q0 .69-.463 1.153T19.385 20zM10 7h4V5.615q0-.23-.192-.423T13.385 5h-2.77q-.23 0-.423.192T10 5.615z" />
	                                </svg>

                                    Agregar Cargo
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
                                            Rol
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
                                            Departamento
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
                                            valor del Pago
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
                            <tbody v-for="category in PaginationData.sectionCategories">
                                <RowCategory :category="category"></RowCategory>
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