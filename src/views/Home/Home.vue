<template>
  <div class="grid grid-cols-2 content-center justify-items-center h-screen mt-auto">
    <div class="w-1/2 bg-white shadow-xl hover:shadow-2xl p-8 rounded-md ">
      <div class="flex flex-col">
        <h2 class="font-bold text-xl text-center rounded-md bg-[#354259] p-8 text-white">Book Store Operations</h2>
        <button class=" bg-[#BDD6D2]   text-[#354259]  p-3 mt-14 rounded-md hover:bg-gray-500 hover:text-[#BDD6D2] " @click="goToAddBook">New Book</button>
        <button class=" bg-[#BDD6D2]   text-[#354259]  p-3 mt-8 rounded-md hover:bg-gray-500 hover:text-[#BDD6D2] " @click="goToBooklist">Book List</button>
      </div>
    </div>
    <div class="w-1/2 bg-white shadow-xl hover:shadow-2xl p-8 rounded-md">
      <div class="w-full flex flex-col text-center">
        <h2 class="font-bold text-xl text-center rounded-md bg-[#354259] p-8 text-white">User Operations</h2>
        <button class=" bg-[#BDD6D2]   text-[#354259]  p-3 mt-14 rounded-md hover:bg-gray-500 hover:text-[#BDD6D2] " @click="goSetToUser">Set to User</button>
        <button class="  bg-[#BDD6D2]   text-[#354259]  p-3 mt-8 rounded-md hover:bg-gray-500 hover:text-[#BDD6D2] " @click="goGetToUser">Get from User</button>
      </div>
    </div>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import paths from "../../router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const goToBooklist = () => {
      router.push({ name: paths.RouteName.bookList });
    };

    const goToAddBook = () => {
      router.push({ name: paths.RouteName.addBook });
    };
    const goSetToUser = () => {
      router.push({ name: paths.RouteName.setToUser });
    };
    const goGetToUser = () => {
      router.push({ name: paths.RouteName.getToUser });
    };

    return {
      goToBooklist,
      goToAddBook,
      goSetToUser,
      goGetToUser,
    };
  },
});
</script>
