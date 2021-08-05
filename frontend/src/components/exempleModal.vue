<!-- ProductList.vue -->
<template>
    <ul>
        <li v-for="product in products" v-bind:key="product.id">
            <span>{{ product.name }}</span>
            <button v-on:click="showDetails(product)">Details</button>
        </li>
    </ul>
    <portal to="modals" v-if="showModal">
        <product-details-modal
            v-bind:product="product"
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
            product: null,
            products: [],
            showModal: false,
        };
    },
    methods: {
        showDetails(product) {
            this.product = product;
            this.showModal = true;
        },
    },
    mounted() {
        // Load products from API or something
        // Save array of product results to this.products
    },
};
</script>


