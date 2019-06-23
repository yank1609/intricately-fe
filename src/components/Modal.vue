<template>
  <div class="modal-container" v-show="displayed">
    <div class="modal">
      <div class="modal-header" v-if="title">
        <h1 class="modal-title">{{ title }}</h1>
      </div>
      <div class="modal-body">
        <slot></slot>
      </div>
      <div class="modal-footer">
        <button @click="yesAction()" class="c-btn c-btn--primary">
          {{ yesButtonText }}
        </button>
        <button @click="noAction()" class="c-btn" v-if="!yesOnly">
          {{ noButtonText }}
        </button>
      </div>

      <a @click="closeModal" class="close-modal">
        <i class="fas fa-times-circle"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: null
    },
    yesButtonText: {
      type: String,
      required: false,
      default: 'Yes'
    },
    noButtonText: {
      type: String,
      required: false,
      default: 'No'
    },
    yesOnly: {
      type: Boolean,
      required: false,
      default: false
    },
    displayed: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  methods: {
    yesAction () {
      this.$emit('yesAction');
    },
    noAction () {
      this.$emit('noAction');
    },
    closeModal () {
      this.$emit('update:displayed', false);
    }
  }
}
</script>
