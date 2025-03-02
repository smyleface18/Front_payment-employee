<script setup>
import { onMounted, ref } from 'vue';
import Swal from 'sweetalert2';

const emit = defineEmits(["closePopup","employeeRegistered"])

let employeeData = ref({
    name: "",
    lastname: "",
    email: "",
    identityNumber: "",
    category: {
        id: ""
    }
});


let categorys = ref();


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
}

onMounted(getCategorys)

async function registerEmployee(){
    
    const response = await fetch("http://127.0.0.1:8080/Employee/addEmployee",{
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body:JSON.stringify(employeeData.value)
    })
    if(!response.ok){
        Swal.fire({                    
                    text: "No se puedo registrar el empleado",
                    icon: "error"})
        }
        else{
            Swal.fire({                    
                    text: "Se registro el empleado correctamente",
                    icon: "success"})
                    emit('employeeRegistered')
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
                    <span class="">Nombre</span>
                    <input v-model="employeeData.name" type="text" placeholder="nombre del empleado" required class="bg-slate-200 rounded text-center w-full">
                </div>
                <div class=" space-x-2 flex ">
                    <span>Apellidos</span>
                    <input v-model="employeeData.lastname" type="text" required placeholder="apellidos del empleado" class="bg-slate-200 rounded text-center w-full">
                </div>
                <div class="space-x-2 flex ">
                    <span>Correo </span>
                    <input v-model="employeeData.email" type="email" placeholder="correo electronico" class="bg-slate-200 rounded text-center w-full">
                </div>
                <div class=" space-x-2 flex  ">
                    <span># Identidad</span>
                    <input v-model="employeeData.identityNumber" type="number" placeholder="numero de identidad" required class="bg-slate-200 rounded text-center ">
                </div>
                <div class="flex flex-col">
                    <label  for="category">Selecciona un cargo</label>
                    <select v-model="employeeData.category.id"  name="categorys"   class="w-64 border-2 border-gray-700 rounded px-3 py-2 focus:ring focus:ring-blue-300 bg-white text-gray-700"   required>
                        <option  v-for="category in categorys" :key="category.id" :value="category.id" class="bg-slate-200 rounded" >{{ category.rol+"("+category.department+")" }}</option>
                    </select>
                </div>

                <input type="submit" value="Registrar"  class="flex select-none items-center gap-2 cursor-pointer  rounded bg-slate-800 py-2.5 px-4  font-semibold text-white ">
            </form>
    </div>
</template>