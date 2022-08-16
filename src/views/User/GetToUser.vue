<template>
  <div class="mx-auto w-1/2 m-auto">
    <div class="border bg-white p-8 rounded-md shadow-md mt-8 mb-4 h-[650px]">
      <div class="flex justify-between">
        <h1
          class="text-3xl font-bold mt-4 mb-8 text-[#354259] underline decoration-indigo-500 underline-offset-4"
        >
          Get from User
        </h1>
        <button
          class="text-[#354259] my-5 p-3 rounded-md hover:bg-gray-500 hover:text-[#BDD6D2]"
          @click="goToHomePage"
        >
          Return Home
        </button>
      </div>
      <div v-if="bookList.length > 0" class="grid col-span-1">
        <div>
          <div class="flex justify-center">
            <div class="mb-3 xl:w-96">
              <select
                v-model="selectedBookID"
                class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option
                  v-for="item in bookList"
                  :key="item.bookID"
                  :value="item.bookID"
                >
                  {{ item.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="user.userID" class="flex flex-col text-center mt-8">
          <p>
            <span class="font-bold">Identity Number:</span>
            {{ user.identityNumber }}
          </p>
          <p>
            <span class="font-bold">Name Surname:</span> {{ user.nameSurname }}
          </p>
          <p><span class="font-bold">Adress:</span> {{ user.address }}</p>
        </div>
        <div class="flex justify-center">
          <button
            class="bg-blue-500 px-4 py-2 rounded-md text-white mt-4 hover:shadow-lg hover:bg-blue-600 w-36"
            @click="getUser"
          >
            Get from User
          </button>
        </div>
      </div>
      <div v-else>
        <div
          class="flex items-center p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
          role="alert"
        >
          <svg
            class="inline flex-shrink-0 mr-3 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div class="text-lg">There's no book.</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "../../store/index";
import paths from "../../router";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import { useToast } from "vue-toastification";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const selectedBookID = ref(0);

    const toast = useToast();

    // const user = ref(store.state.users.filter((x) => x.assignedBookID == store.state.books.filter((i) => i.status == 1)[0].bookID)[0]);
    const user = ref("");

    const userList = () => {
      return store.state.users;
    };

    const bookList = computed(() => {
      return store.state.books.filter((x) => x.status === 1);
    });

    const rules = {
      assignedBookID: { required },
    };

    const v$ = useVuelidate(rules, user);

    const getUser = () => {
      v$.value.$touch();
      if (v$.value.$invalid) {
        toast.error("Please, select book", {
          timeout: 3500,
        });
        return;
      }

      store.state.books.filter((x) => x.bookID === user.value.assignedBookID)[0].status = 0;
      let selectBook = store.state.books.filter((x) => x.bookID == selectedBookID.value)[0];
      
      store.commit("deleteUser", user.value.userID);
      user.value = {}
      toast.success(`${selectBook.title} has been getted from user`, {
        timeout: 3500,
      });

    };

    const goToHomePage = () => {
      router.push({ name: paths.RouteName.home });
    };

    watch(
      () => selectedBookID.value,
      () => {
        user.value = store.state.users.filter(
          (x) => x.assignedBookID == selectedBookID.value
        )[0];
      }
    );

    return {
      userList,
      bookList,
      user,
      getUser,
      goToHomePage,
      selectedBookID,
    };
  },
});
</script>
