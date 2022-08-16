import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("../views/Home/Home.vue");
const BookList = () => import("../views/Book/BookList.vue");
const AddBook = () => import("../views/Book/AddBook.vue");
const GetToUser = () => import("../views/User/GetToUser.vue");
const SetToUser = () => import("../views/User/SetToUser.vue");

const RouteName = {
  home: "home",
  bookList: "bookList",
  addBook: "addBook",
  setToUser: "setToUser",
  getToUser: "getToUser",
};

const routes = [
  {
    name: RouteName.home,
    path: "/",
    components: {
      main: Home,
    },
  },
  {
    name: RouteName.bookList,
    path: "/bookList",
    components: {
      main: BookList,
    },
  },

  {
    name: RouteName.addBook,
    path: "/addBook",
    components: {
      main: AddBook,
    },
  },
  {
    name: RouteName.setToUser,
    path: "/setToUser",
    components: {
      main: SetToUser,
    },
  },
  {
    name: RouteName.getToUser,
    path: "/getToUser",
    components: {
      main: GetToUser,
    },
  },
];

const paths = createRouter({
  history: createWebHistory(),
  routes,
});

export default { paths, RouteName };
