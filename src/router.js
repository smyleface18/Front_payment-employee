import { createRouter, createWebHashHistory } from "vue-router";
import ListEmployees from "./components/ListEmployees.vue";
import EmployeePayments from "./components/EmployeePayments.vue";
import ListPaymentsFull from "./components/ListPaymentsFull.vue";
import ListCategories from './components/ListCategorys.vue'

const routes = [
    {
        path: '/',
        component: ListEmployees
    },
    {
        path: '/ListEmployees',
        component: ListEmployees
    },
    {
        path: '/ListPaymentsFull',
        component: ListPaymentsFull
    },
    {
        path: '/ListCategories',
        component: ListCategories
    },
    {
        path: '/EmployeePayments',
        name: 'EmployeePayments',
        component: EmployeePayments
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;