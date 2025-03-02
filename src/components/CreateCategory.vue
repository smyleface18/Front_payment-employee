<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const emit = defineEmits(["closePopup","Registered"])

let CategoryData = ref({
    rol: "",
    department: "",
    salaryXhour: 0,
});


async function registerEmployee(){
    
    const response = await fetch("http://127.0.0.1:8080/Category/addCategory",{
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body:JSON.stringify(CategoryData.value)
    })
    if(!response.ok){
        Swal.fire({                    
                    text: "No se puedo registrar el cargo",
                    icon: "error"})
        }
        else{
            Swal.fire({                    
                    text: "Se registro el cargo correctamente",
                    icon: "success"})
                    emit('Registered')
        }
}
</script>
<template>
    <div class="flex flex-col justify-center items-center">
            <h5 class="font-semibold text-2xl text-center py-2 text-slate-900">
                Registrar empleado
            </h5>
            <form  @submit.prevent="registerEmployee" method="post" class="flex flex-col w-[60%] space-y-5 text-slate-900 font-medium justify-center">
                <div class=" space-x-2 flex ">
                    <span class="">Rol</span>
                    <input v-model="CategoryData.rol" type="text" placeholder="nombre del cargo" required class="bg-slate-200 rounded text-center w-full">
                </div>
                <div class=" space-x-2 flex ">
                    <span>Departamento</span>
                    <input v-model="CategoryData.department" type="text" required placeholder="Departamento asignado" class="bg-slate-200 rounded text-center w-full">
                </div>
                <div class="space-x-2 flex ">
                    <span>Salario Por hora </span>
                    <input v-model="CategoryData.salaryXhour" type="number" placeholder="valor de hora" class="bg-slate-200 rounded text-center w-full">
                </div>
                <input type="submit" value="Registrar"  class="flex select-none items-center gap-2 cursor-pointer  rounded bg-slate-800 py-2.5 px-4  font-semibold text-white ">
            </form>
    </div>
</template>