<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex items-center -space-x-px">
      <li class="curs" @click.prevent="gotoPageStep(-1)">
        <a
          href="#"
          class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span class="sr-only">Previous</span>
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </li>

      <li
        v-for="(page, index) in pageList"
        :key="index"
        @click.prevent="gotoPage(page)"
      >
        <a
          href="#"
          :class="{
            'bg-blue-500 text-white': current_page === index + 1,
            'bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-100':
              current_page !== index + 1,
          }"
          class="block py-2 px-3 leading-tight border border-gray-300"
          >{{ index + 1 }}</a
        >
      </li>

      <li @click.prevent="gotoPageStep(1)">
        <a
          href="#"
          class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <span class="sr-only">Next</span>
          <svg
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const perPage = ref(3);
    const maxPagelinks = ref(3);
    const current_page = ref(1);

    const listCount = computed(() => {
      return store.state.books.length;
    });

    store.commit("changeTotal", Math.ceil(listCount.value / perPage.value));
    store.commit("changeCurrentPage", 1);

    const totalPage = computed(() => {
      store.commit("changeTotal", Math.ceil(listCount.value / perPage.value));
      return Math.ceil(listCount.value / perPage.value);
    });

    watch(
      () => totalPage.value,
      () => {
         current_page.value = totalPage.value
         store.commit("changeCurrentPage", totalPage.value);
      }
    );

    const pageList = computed(() => {
      const pages = [];
      for (let index = 1; index <= totalPage.value; index++) {
        pages.push(index);
      }

      let startIndex = current_page.value - (maxPagelinks.value + 1) / 2 - 1;
      let endIndex = current_page.value + (maxPagelinks.value + 1) / 2;
      if (startIndex < 0) {
        endIndex = endIndex - startIndex;
        startIndex = 0;
      }

      if (endIndex > totalPage.value) {
        startIndex = startIndex + (totalPage.value - endIndex);
        endIndex = totalPage.value;
      }

      startIndex = Math.max(startIndex, 0);

      return pages.slice(startIndex, endIndex);
    });

    const gotoPageStep = (step) => {
      if (
        current_page.value + step > totalPage.value ||
        current_page.value + step === 0
      ) {
        return;
      }
      current_page.value += step;
      store.commit("changeCurrentPage", current_page.value);
    };

    const gotoPage = (page) => {
      if (current_page === page) {
        return;
      }
      current_page.value = page;
      store.commit("changeCurrentPage", page);
    };

    return {
      current_page,
      totalPage,
      pageList,
      gotoPageStep,
      gotoPage,
      listCount,
    };
  },
});
</script>
