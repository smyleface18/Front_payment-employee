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

    <form
      @submit.prevent="registerPayment"
      class="w-[80%] font-mono text-xl text-slate-900 space-y-8"
    >
      <!-- GRID -->
      <div class="grid grid-cols-2 gap-4 items-center">
        <!-- SALARIO X HORA -->
        <label class="font-semibold">Salario x hora:</label>
        <div class="bg-slate-200 rounded px-4 py-2 text-end">
          {{ props.valueHour.toLocaleString('en') }}
        </div>

        <!-- HORAS TRABAJADAS -->
        <label class="font-semibold">Cantidad de horas:</label>
        <input
          v-model="hoursWorked"
          type="number"
          class="bg-slate-200 rounded px-4 py-2 text-center w-full"
          required
        />

        <!-- TOTAL CALCULADO -->
        <label class="font-semibold">Total calculado:</label>
        <div class="bg-slate-200 rounded px-4 py-2 text-end">
          {{ fullPayment.toLocaleString('en') }}
        </div>
      </div>

      <!-- BOTÓNES -->
      <div class="flex justify-between mt-6">
        <button
          @click="fullPayment = calulatorPayment()"
          type="button"
          class="rounded bg-slate-200 py-2.5 px-4 font-semibold"
        >
          Pre calcular
        </button>

        <input
          @click="fullPayment = calulatorPayment()"
          type="submit"
          value="Registrar"
          class="cursor-pointer rounded bg-slate-800 py-2.5 px-6 font-semibold text-white"
        />
      </div>
    </form>
  </div>
</template>
