<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps(["employee"])
</script>
<template>
    <tr>
        <td class="p-4 border-b border-slate-200">
            <div class="flex items-center gap-3">
                <svg class="relative inline-block h-9 w-9 !rounded-full object-cover object-center text-[#1d293d] "
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g fill="none" fill-rule="evenodd">
                        <path
                            d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                        <path fill="currentColor"
                            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M8.5 9.5a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0m9.758 7.484A7.99 7.99 0 0 1 12 20a7.99 7.99 0 0 1-6.258-3.016C7.363 15.821 9.575 15 12 15s4.637.821 6.258 1.984" />
                    </g>
                </svg>
                <div class="flex flex-col">
                    <p class="text-sm font-semibold text-slate-700">
                        {{ props.employee.name + " " + props.employee.lastname }}
                    </p>
                    <p class="text-sm text-slate-500">
                        {{ props.employee.email }}
                    </p>
                </div>
            </div>
        </td>
        <td class="p-4 border-b border-slate-200">
            <div class="flex flex-col">
                <p class="text-sm font-semibold text-slate-700">
                    {{ props.employee.category.rol }}
                </p>
                <p class="text-sm text-slate-500">
                    {{ props.employee.category.department }}
                </p>
            </div>
        </td>
        <td class="p-4 border-b border-slate-200">
            <div class="w-max">
                <div
                    class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-slate-100 text-slate-500">
                    <span class="">{{ props.employee.identityNumber }}</span>
                </div>
            </div>
        </td>
        <td class="p-4 border-b border-slate-200 text-slate-500">
            <RouterLink :to="{ name: 'EmployeePayments', query: { idEmployee: props.employee.id } }">
                <svg class="mx-auto hover:cursor-pointer hover:scale-130" xmlns="http://www.w3.org/2000/svg"
                    width="1.5em" height="1.5em" viewBox="0 0 16 16">
                    <path fill="currentColor"
                        d="M12.32 8a3 3 0 0 0-2-.7H5.63A1.59 1.59 0 0 1 4 5.69a2 2 0 0 1 0-.25a1.59 1.59 0 0 1 1.63-1.33h4.62a1.59 1.59 0 0 1 1.57 1.33h1.5a3.08 3.08 0 0 0-3.07-2.83H8.67V.31H7.42v2.3H5.63a3.08 3.08 0 0 0-3.07 2.83a2 2 0 0 0 0 .25a3.07 3.07 0 0 0 3.07 3.07h4.74A1.59 1.59 0 0 1 12 10.35a2 2 0 0 1 0 .34a1.59 1.59 0 0 1-1.55 1.24h-4.7a1.59 1.59 0 0 1-1.55-1.24H2.69a3.08 3.08 0 0 0 3.06 2.73h1.67v2.27h1.25v-2.27h1.7a3.08 3.08 0 0 0 3.06-2.73v-.34A3.06 3.06 0 0 0 12.32 8" />
                </svg>
            </RouterLink>
        </td>

    </tr>

</template>