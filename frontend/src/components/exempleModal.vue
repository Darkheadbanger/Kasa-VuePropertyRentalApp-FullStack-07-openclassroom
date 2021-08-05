<!-- ProductList.vue -->

<template>
<!-- product-details-modal -->
    <ul>
        <li v-for="post in posts" v-bind:key="post.id">
            <span>{{ post.name }}</span>
            <button v-on:click="showDetails(post)">Details</button>
        </li>
    </ul>
    <portal to="modals" v-if="showModal">
        <product-details-modal
            v-bind:post="post"
            v-bind:show="showModal"
            v-on:hide="showModal = false"
        />
    </portal>
</template>

<script>
import ProductDetailsModal from './exempleModal2.vue';

export default {
    components: {
        ProductDetailsModal,
    },
    data() {
        return {
            post: null,
            products: [],
            showModal: false,
        };
    },
    methods: {
        showDetails(post) {
            this.post = post;
            this.showModal = true;
        },
    },
    mounted() {
        // Load products from API or something
        // Save array of product results to this.products
    },
};
</script>


