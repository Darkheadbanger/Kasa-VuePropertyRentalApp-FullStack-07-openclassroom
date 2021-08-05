<!-- ProductDetailsModal.vue -->
<template>
<!-- modals -->
    <div class="modal fade" id="product-details-modal" ref="modalElement">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="product-details-modal-title">Product Details</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Product name: {{ post.name }}</p>
                    <p>Product price: {{ post.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';
 
export default {
    data() {
        return {
            modalElement: null,
        };
    },
    mounted() {
        this.modalElement = new Modal(this.$refs.modal);

        this.modalElement.addEventListener('hide.bs.modal', this.$emit('hide'));

        if (this.show) {
            this.modalElement.show();
        }
    },
    props: {
        post: {
            required: true,
            type: Object,
        },
        show: {
            default: false,
            required: false,
            type: Boolean,
        },
    },
    watch: {
        show(show) {
            if (this.modalElement) {
                show ? this.modalElement.show() : this.modalElement.hide();
            }
        },
    },
};
</script>