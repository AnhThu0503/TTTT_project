import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/transaction/add/chi',
      name: 'transaction-chi',

      component: () => import('../views/TransactionCreateChi.vue')
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('../views/TransactionList.vue')
    },
    {
      path: '/transaction/list',
      name: 'transaction/list',
      component: () => import('../views/transactionList_1.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    }
  ]
})
// Simulate an authentication check function
// function isAuthenticated() {
//   // Replace this with actual authentication logic
//   return !!localStorage.getItem('userToken')
// }

// // Add the beforeEach guard
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'signup' && !isAuthenticated()) {
//     // Redirect to signup page if not authenticated
//     next({ name: 'signup' })
//   } else {
//     next() // Allow navigation if authenticated or navigating to signup
//   }
// })
export default router
