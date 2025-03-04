<script setup>


const props = defineProps(["category"])
</script>
<template>
    <tr>
        <td class="p-4 border-b border-slate-200">
            <div class="flex items-center gap-3">
                <div class="flex flex-col">
                    <p class="text-sm font-semibold text-slate-700">
                        {{ props.category.id }}
                    </p>
                </div>
            </div>
        </td>
        <td class="p-4 border-b border-slate-200">
            <div class="flex flex-col">
                <p class="text-sm font-semibold text-slate-700">
                    {{ props.category.rol}}
                </p>
            </div>
        </td>
        <td class="p-4 border-b border-slate-200">
            <div class="w-max">
                <div
                    class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap bg-slate-100 text-slate-500">
                    <span class="">{{ props.category.department }}</span>
                </div>
            </div>
        </td>
        <td class="p-4 border-b border-slate-200">
            <div class="w-max">
                <div
                    class="relative grid items-center px-2 py-1 font-sans text-xs font-bold uppercase rounded-md select-none whitespace-nowrap ">
                    <span class="">{{ props.category.salaryXhour.toLocaleString('en') }} $</span>
                </div>
            </div>
        </td>

    </tr>

</template>