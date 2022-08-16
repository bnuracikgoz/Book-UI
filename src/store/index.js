import { createStore } from "vuex";
import VuexPersistence from "vuex-persist/dist/cjs/index.js";

const vuexLocal = new VuexPersistence({
  key: "state",
  // strictMode: true,
  // storage: window.localStorage,
  // reducer: state => (state),
  reducer: (state) => state,
});

const store = createStore({
  plugins: [vuexLocal.plugin],
  state() {
    return {
      count: 0,
      books: [
        {
          bookID: 1,
          imageURL: "../../public/images/sefiller.PNG",
          title: "Sefiller",
          description: "Sefiller Açıklama",
          author: "Victor Hugo",
          status: 0,
        },
        {
          bookID: 2,
          imageURL: "https://static.nadirkitap.com/fotograf/36980/14/Kitap_201907301111436.jpg",
          title: "Vadideki Zambak",
          description: "Vadideki Zambak açıklama",
          author: "Balzac",
          status: 1,
        },
        {
          bookID: 3,
          imageURL: "https://img.kitapyurdu.com/v1/getImage/fn:147978/wh:true/wi:800",
          title: "Suç ve Ceza",
          description: "Suç ve Ceza açıklama",
          author: "Dostoyevski",
          status: 1,
        },
        {
          bookID: 4,
          imageURL: "https://images-na.ssl-images-amazon.com/images/I/41KXYhApcNS._SY344_BO1,204,203,200_QL70_ML2_.jpg",
          title: "Satranç",
          description: "Satranç açıklama",
          author: "Stefan Zweig",
          status: 0,
        },
        {
          bookID: 5,
          imageURL: "https://img.kitapyurdu.com/v1/getImage/fn:10882467/wh:true/wi:800",
          title: "Araba Sevdası",
          description: "Araba Sevdası açıklama",
          author: "Recaizade Mahmut Ekrem",
          status: 0,
        }
      ],
      users: [
        {
          userID: 1,
          assignedBookID: 2,
          identityNumber: "17905549188",
          address: "adres bilgisi",
          nameSurname: "Ahmet Bakır",
        },
        {
          userID: 2,
          assignedBookID: 3,
          identityNumber: "17905549189",
          address: "adres bilgisi",
          nameSurname: "Aslı Bakmaz",
        }
      ],
      pagination: {
        totalPage: 0,
        per_page: 3,
        current_page: 1,
        last_page: 0,
        from: 0,
        to: 0,
      },
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    deleteUser(state, item) {
      state.users = state.users.filter(x => x.userID !== item)
    },
    deleteBook(state, bookID) {
      state.books = state.books.filter((x) => x.bookID !== bookID);
    },
    addBook(state, item) {
      state.books.push(item);
    },
    addUser(state, item) {
      state.users.push(item);
    },
    changeTotal(state, index) {
      state.pagination.totalPage = index;
    },
    changeCurrentPage(state, index) {
      state.pagination.current_page = index;
    },
    setPagination(state, item) {
      state.pagination = item;
    },
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
  },
});

export function useStore() {
  return store;
}

export default store;
