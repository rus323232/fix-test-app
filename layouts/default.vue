<template>
  <div>
    <client-only>
      <notifications group="errors" position="top left" />
    </client-only>
    <nuxt />
  </div>
</template>

<script>
import { http, getHttpError } from '@/utils';

export default {
  methods: {
    handleHttpErrors() {
      http.interceptors.response.use(
        response => response,
        error => {
          const { response } = error;
          const { text, title = null } = getHttpError(
            response && response.status
          );

          this.$notify({
            text,
            type: 'error',
            group: 'errors',
            ...(title && { title }),
          });
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
