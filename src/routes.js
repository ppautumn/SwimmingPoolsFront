import _ from 'lodash'
import Timetable from '@/pages/timetable.vue'
import Trainings from '@/pages/trainings.vue'
import Prices from '@/pages/prices.vue'
import ContactUs from '@/pages/contact-us.vue'
import Register from '@/pages/register.vue'
import Login from '@/pages/login.vue'
import Profile from '@/pages/profile.vue'
import Book from '@/pages/book.vue'

export const routes = [
    {path: '/', component: Timetable},
    {path: '/timetable', component: Timetable},
    {path: '/trainings', component: Trainings},
    {path: '/prices', component: Prices},
    {path: '/contact-us', component: ContactUs},
    {path: '/register', component: Register},
    {path: '/login', component: Login},
    {path: '/profile', component: Profile},
    {path: '/book', component: Book, props: route => _.pick(route.query, ['date', 'time', 'visitType', 'bibaboba'])},
]