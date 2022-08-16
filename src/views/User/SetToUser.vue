<template>
  <div class="mx-auto w-1/2 m-auto">
    <div class="border bg-white p-8 rounded-md shadow-md mt-8 mb-4 h-[650px]">
      <div class="flex justify-between">
        <h1
          class="text-3xl font-bold mt-4 mb-8 text-[#354259] underline decoration-indigo-500 underline-offset-4"
        >
          Set to User
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
            <div class="mb-3 w-full">
            <label class="flex-none mr-4">Select Book *</label>
              <select
                v-model="user.assignedBookID"
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

        <div class="grid grid-cols-1">
          <div class="grid grid-cols-1 gap-4">
            <div class="flex flex-col">
              <label class="flex-none mr-4">Identity number *</label>
              <input
                type="text"
                class="w-full p-2 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none grow"
                 v-model="user.identityNumber"
              />
            </div>

            <div class="flex flex-col">
              <label class="flex-none mr-4">Name and Surname *</label>
              <input
                type="text"
                class="w-full p-2 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none grow" 
                v-model="user.nameSurname"
              />
            </div>

            <div class="flex flex-col">
              <label class="flex-none mr-4">Adress *</label>
              <input
                type="text"
                class="w-full p-2 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none grow" 
                v-model="user.address"
              />
            </div>
            
          </div>
        </div>

        <!-- <input
          v-model="user.identityNumber"
          type="text"
          placeholder="identity number"
        />
        <input
          v-model="user.nameSurname"
          type="text"
          placeholder="Name and Surname"
        />
        <textarea v-model="user.address" type="text" placeholder="address" /> -->
        <div class="flex justify-center">
          <button
            class="bg-blue-500 px-4 py-2 rounded-md text-white mt-4 hover:shadow-lg hover:bg-blue-600 w-28"
            @click="setUser"
          >
            Set to User
          </button>
        </div>
        <!-- <button class="bg-blue-300" @click="setUser">Set to User</button> -->
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
import { defineComponent, ref, computed, reactive } from "vue";
import { useStore } from "../../store";
import paths from "../../router";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useToast } from "vue-toastification";

export default defineComponent({
  setup() {
    const dropdownShow = ref(true);

    const store = useStore();
    const router = useRouter();

    const toast = useToast();

    const user = ref({
      userID: 0,
      assignedBookID: 0,
      identityNumber: "",
      address: "",
      nameSurname: "",
    });

    const rules = {
      nameSurname: { required },  
      address: { required },  
      identityNumber: { required },
      assignedBookID: { required },
    };

    const v$ = useVuelidate(rules, user);   

    const bookList = computed(() => {
      return store.state.books.filter((x) => x.status === 0);
    });
  

    const setUser = () => {
       v$.value.$touch();
      if (v$.value.$invalid) {
        toast.error("Please, fill in the required fields", {
          timeout: 3500,
        });
        return;
      }


      let lastItem = store.state.users[store.state.users.length - 1].userID + 1;
      user.value.userID = lastItem;
      store.state.books.filter(x => x.bookID == user.value.assignedBookID)[0].status = 1

      store.commit("addUser", user.value);

      let book = store.state.books.filter(x => x.bookID ==  user.value.assignedBookID)[0]
      user.value = {}
      toast.success(`${book.title} has been setted to user`, {
        timeout: 3500,
      });

      
    };

    const goToHomePage = () => {
      router.push({ name: paths.RouteName.home });
    };

    return {
      dropdownShow,
      bookList,
      user,
      setUser,
      goToHomePage,
    };
  },
});
</script>
