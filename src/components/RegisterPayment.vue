<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';

const props = defineProps(["valueHour","idEmployee"])
const emit = defineEmits(["Registered"])

const simpleOvertime = 40;
const overtime = 48;
let fullPayment = ref(0);
let hoursWorked = ref(0);

let paymentData = ref({
    hour: hoursWorked,
    money: fullPayment,
    employee: {
        id:props.idEmployee
    }
})

console.log(props.idEmployee)
function calulatorPayment() {
    if(hoursWorked.value <= simpleOvertime){
        return hoursWorked.value * props.valueHour;
    }
    else if (hoursWorked.value > simpleOvertime && hoursWorked.value <= overtime){
        return  (hoursWorked.value - simpleOvertime)*(props.valueHour*1.2) + (simpleOvertime*props.valueHour); 
    }
    else if (hoursWorked.value > overtime) {
        return (hoursWorked.value - overtime)*(props.valueHour*1.4) + (overtime-simpleOvertime)*(props.valueHour*1.2) + (simpleOvertime*props.valueHour)
    }
    else {
        return 0;
    }
}

async function registerPayment(){
    
    const response = await fetch("http://127.0.0.1:8080/Payments/addPayment",{
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body:JSON.stringify(paymentData.value)
    })
    if(!response.ok){
        Swal.fire({                    
                    text: "No se puedo registrar el pago",
                    icon: "error"})
        }
        else{
            Swal.fire({                    
                    text: "Se registro el pago correctamente",
                    icon: "success"})
                    emit('Registered')
        }
}
</script>
<template>
    <div class="flex flex-col justify-center items-center w-full">
            <h5 class="font-semibold text-2xl text-center py-5 text-slate-900">
                Registrar pago
            </h5>
            <form  @submit.prevent="registerPayment" method="post" class="flex flex-col w-[80%] items-center space-y-5 text-slate-900 font-mono text-xl justify-center h-full">
                <p>Salario x hora: <span class="bg-slate-200 rounded px-5">{{ props.valueHour.toLocaleString('en') }}</span></p>
                <div class="text-center">
                    <span>Cantidad de horas: </span>
                    <input v-model="hoursWorked" type="number" class="bg-slate-200 rounded text-center" required>
                </div>
                <div class="bg-slate-200 rounded px-5">
                    {{  fullPayment.toLocaleString('en') }}
                </div>
                
                <input @click="fullPayment = calulatorPayment()" type="submit" value="Registrar"  class="flex select-none items-center gap-2 cursor-pointer  rounded bg-slate-800 py-2.5 px-4  font-semibold text-white ">
            </form>
            <button @click="fullPayment = calulatorPayment()" class="flex select-none items-center gap-2 cursor-pointer  rounded bg-slate-200 py-2.5 px-4  font-semibold ml-[80%] mt-10">Pre calcular</button>
    </div>
</template>