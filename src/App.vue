<template>
  <div class="container mx-auto">
    <router-view name="main" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useStore } from "./store";

export default defineComponent({
  setup() {
    const store = useStore();
    // store.commit("saveState", [
    //   {
    //     bookID: 1,
    //     imageURL: "../../public/images/sefiller.PNG",
    //     title: "Sefiller",
    //     description: "Sefiller Açıklama",
    //     author: "Victor Hugo",
    //     status: 0,
    //   },
    //   {
    //     bookID: 2,
    //     imageURL: "../../public/images/sefiller.PNG",
    //     title: "Sefiller 2",
    //     description: "Sefiller Açıklama 2",
    //     author: "Victor Hugo 2",
    //     status: 1,
    //   },
    // ]);
  },
});
</script>

<style scoped></style>
