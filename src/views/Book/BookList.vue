<template>
  <vue-final-modal v-model="showModal">
    <div class="h-screen flex items-center">
      <div class="bg-white h-64 w-1/3 mx-auto rounded-md">
        <div class="text-center items-center h-1/3 mt-8">
          <div class="h-full flex w-full items-center justify-center font-bold text-lg">Are you sure you want to delete the <span class="text-slate-500 mx-1"> {{ deleteBookItem.title }}</span>?</div>
          <div class="flex justify-center">
            <button class=" bg-red-500 hover:bg-red-600   p-3 mt-8 rounded-md   hover:text-[#BDD6D2] mr-2 text-slate-50"  @click="deleteBook(deleteBookItem.bookID)">Yes, Delete</button>
            <button class=" bg-[#BDD6D2]   text-[#354259]  p-3 mt-8 rounded-md hover:bg-gray-500 hover:text-[#BDD6D2] "  @click="showModal = false">No, Return</button>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
  <div class="mx-20 grid content-center">
    <div class="border bg-white p-4 rounded-md shadow-md mt-8 mb-4 h-[650px]">
      <div class="flex justify-between">
        <h1
          class="text-3xl font-bold mt-4 mb-8 text-[#354259] underline decoration-indigo-500 underline-offset-4"
        >
          Book List
        </h1>
        <button
          class=" text-[#354259] my-5 p-3 rounded-md hover:bg-gray-500 hover:text-[#BDD6D2]"
          @click="goToHomePage"
        >
          Return Home
        </button>
      </div>
      <div v-for="item in getBookList" :key="item.bookID">
        <div class="flex h-40 border mb-4 p-4">
          <div class="w-20 mr-4 flex-none">
            <img class="h-full object-contain" :src="item.imageURL" alt="" />
          </div>
          <div class="grow">
            <p class="text-4xl font-normal text-[#354259] ">
              {{ item.title }}
            </p>
            <p class="text-gray-300 font-medium text-lg">
              {{ item.author }}
            </p>
          </div>
          <div class="text-center">
            <p
              class="text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800 border-2 border-green-800 p-2 mb-2"
              v-if="item.status === 0"
            >
              IN STORE
            </p>
            <p
              class="text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800 p-2 border-2 border-red-800 mb-2"
              v-else
            >
              AT USER
            </p>
            <button
              class="text-red-700"
              v-if="item.status !== 1"
              @click="openModal(item)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <p class="text-xl font-bold text-center">
      currentPage => {{ currentPage }}
    </p> -->
    <div class="flex justify-center">
      <pagination />
    </div>
  </div>
</template>
<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "../../store";
import Pagination from "../../components/Pagination.vue";
import paths from "../../router";
import { useRouter } from "vue-router";
import { $vfm, VueFinalModal, ModalsContainer } from "vue-final-modal";
import { useToast } from "vue-toastification";

export default defineComponent({
  components: {
    Pagination,
    VueFinalModal,
    ModalsContainer,
  },
  setup() {
    const showModal = ref(false);

    const deleteBookItem = ref('')

    const store = useStore();
    const router = useRouter();

    const toast = useToast();

   

    const currentPage = computed(() => {
      return store.state.pagination.current_page - 1;
    });

    const perPage = computed(() => {
      return store.state.pagination.per_page;
    });

    const getBookList = computed(() => {
      let paginationList = [];
      let index = currentPage.value * perPage.value;
      for (let i = index; i < index + 3; i++) {
        if (store.state.books[i]) {
          paginationList.push(store.state.books[i]);
        }
      }
      return paginationList;
    });

    const openModal = (book) => {
      showModal.value = !showModal.value;
      deleteBookItem.value = book
    }

    const deleteBook = (bookID) => {
      store.commit("deleteBook", bookID);
      showModal.value = !showModal.value;
      toast.success(`${deleteBookItem.value.title} DELETED`, {
        timeout: 3500
      });
    };

    const goToHomePage = () => {
      router.push({ name: paths.RouteName.home });
    };

    return {
      getBookList,
      deleteBook,
      currentPage,
      goToHomePage,
      showModal,
      deleteBookItem,
      openModal,
      toast 
    };
  },
});
</script>
<style scoped></style>
