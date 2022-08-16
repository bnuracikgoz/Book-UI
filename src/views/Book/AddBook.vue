<template>
  <div class="mx-auto w-1/2 m-auto">
    <div class="border bg-white p-8 rounded-md shadow-md mt-8 mb-4 h-[650px]">
      <div class="flex justify-between">
        <h1
          class="text-3xl font-bold mt-4 mb-8 text-[#354259] underline decoration-indigo-500 underline-offset-4"
        >
          Add Book
        </h1>
        <button
          class="text-[#354259] my-5 p-3 rounded-md hover:bg-gray-500 hover:text-[#BDD6D2]"
          @click="goToHomePage"
        >
          Return Home
        </button>
      </div>
      <div class="grid grid-cols-1">
        <div class="grid grid-cols-1 gap-4">
          <div class="flex flex-col">
            <label class="flex-none mr-4">Book Name *</label>
            <input
              type="text"
              class="w-full p-2 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none grow"
              v-model.trim="item.title"
            />
          </div>
          <div class="flex flex-col">
            <label class="flex-none mr-4">Author *</label>
            <input
              type="text"
              class="w-full p-2 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none grow"
              v-model.trim="item.author"
            />
          </div>
          <div class="flex flex-col">
            <label class="flex-none mr-4">Description</label>
            <input
              type="text"
              class="w-full p-2 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none grow"
              v-model.trim="item.description"
            />
          </div>
          <div class="flex flex-col">
            <label class="flex-none mr-4">Image URL *</label>
            <input
              type="text"
              class="w-full p-2 form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none grow"
              v-model.trim="item.imageURL"
            />
          </div>
        </div>
        <div class="flex justify-center">
          <button
            class="bg-blue-500 px-4 py-2 rounded-md text-white mt-4 hover:shadow-lg hover:bg-blue-600 w-24"
            @click="saveBook"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useStore } from "../../store";
import paths from "../../router";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useToast } from "vue-toastification";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const toast = useToast();

    const item = ref({
      imageURL: "",
      title: "",
      description: "",
      author: "",
      status: 0,
    });

    const rules = {
      imageURL: { required },  
      title: { required },  
      // description: { required },
      author: { required },
    };

    const v$ = useVuelidate(rules, item);

    const saveBook = () => {
      v$.value.$touch();
      if (v$.value.$invalid) {
        toast.error("Please, fill in the required fields", {
          timeout: 3500,
        });
        return;
      }
      let lastItem = store.state.books[store.state.books.length - 1].bookID + 1;
      item.bookID = lastItem;
      store.commit("addBook", item.value);
      toast.success(`${item.value.title} ADDED`, {
        timeout: 3500,
      });
      item.value = {};
      // goToHomePage()
    };

    const goToHomePage = () => {
      router.push({ name: paths.RouteName.home });
    };

    return {
      saveBook,
      item,
      goToHomePage,
    };
  },
});
</script>
