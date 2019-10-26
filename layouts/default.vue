<template>
  <div>
    <notifications group="errors" position="top left" />
    <nuxt />
  </div>
</template>

<script>
import { http } from '@/modules/http';
import { ERROR_MESSAGES } from '@/constants';

export default {
  methods: {
    handleHttpErrors() {
      const { notFound, serverError, unknownError } = ERROR_MESSAGES;
      const actionsMap = {
        [notFound.code]: () => {
          this.$notify({
            group: 'errors',
            type: 'error',
            title: notFound.code,
            text: notFound.message,
          });
        },
        [serverError.code]: () => {
          this.$notify({
            group: 'errors',
            type: 'error',
            title: serverError.code,
            text: serverError.message,
          });
        },
        default: () => {
          this.$notify({
            group: 'errors',
            type: 'error',
            text: unknownError.message,
          });
        },
      };

      http.interceptors.response.use(
        response => response,
        error => {
          const {
            response: { status },
          } = error;
          if (actionsMap.hasOwnProperty(status)) {
            actionsMap[status]();
          }
          return Promise.reject(error);
        }
      );
    },
  },
  mounted() {
    this.handleHttpErrors();
  },
};
</script>
