<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps(["payment","valueHour"])


</script>
<template>
    <tr>
        <td class="p-4 border-b border-slate-200">
            <div class="flex items-center gap-3">
                <div class="flex flex-col">
                    <p class="text-sm font-semibold text-slate-700">
                        {{ props.payment.id}}
                    </p>

                </div>
            </div>
        </td>
        <td class="p-4 border-b border-slate-200">
            <div class="flex flex-col">
                <p class="text-sm font-semibold text-slate-700">
                    {{ props.payment.hour}}
                </p>
            </div>
        </td>
        <td class="p-4 border-b border-slate-200">
            <div class="flex flex-col">
                <p class="text-sm font-semibold text-slate-700">
                    {{ props.payment.money.toLocaleString('en')}}
                </p>
            </div>
        </td>
        <td class="p-4 border-b border-slate-200">
            <div class="flex flex-col">
                <RouterLink :to="{ name: 'EmployeePayments', query: { idEmployee: props.payment.employee.id } }">
                    <p class="text-sm font-semibold text-slate-700">
                    {{ props.payment.employee.name + props.payment.employee.lastname}}
                    </p>
                </RouterLink>
            </div>
        </td>
    </tr>

</template>