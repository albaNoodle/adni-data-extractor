<template>
  <section class="home-container">
    <div>
      <app-logo />
      <h1 class="title"> ADNI data extractor </h1>
      <h2 class="subtitle"> Nuxt.js project </h2>
      <div class="links">
        <a href="/dictionaries" class="button--grey">Upload Dictionaries</a>
        <a href="/patients" class="button--grey">Upload Patients</a>
        <a href="/images" class="button--grey">Upload Images</a>
        <a href="/extractor" class="button--green">Extract Data</a>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue';

export default {
  components: { AppLogo },
};
</script>

<style>
.home-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
