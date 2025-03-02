<script setup>



const props = defineProps(["ViewPopup"]);
const emit = defineEmits(["closePopup","employeeRegistered"]);

</script>

<template>
    <div v-show="props.ViewPopup" class="absolute z-10 w-[120vw] h-full bg-[#000000a0] flex  items-center ">
        <div class="w-1/3 h-3/4 bg-white rounded p-5 center">
            <div class=" w-full flex justify-end">
                <button @click="emit('closePopup')" class="flex  select-none items-center gap-2 cursor-pointer  rounded bg-red-400 py-2.5 px-4  font-semibold text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 1216 1312"><path fill="currentColor" d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68"/></svg>
                </button>
            </div>
            <slot></slot>
          
        </div>
    </div>
</template>
<style>
    .center{
        margin-left: calc(30vw);
    }
</style>
