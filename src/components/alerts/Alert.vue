<template>
  <v-alert
    error
    dismissible
    @input="onClose"
    :value="true"
    type="error"
    role="alert"
    aria-describedby="text"
    aria-live="assertive"
    aria-atomic="true"
    aria-relevant="additions">
    {{text}}
  </v-alert>
</template>

<script>
  export default {
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    }
  }
</script>
