<template>
  <div class="navbar">
    <span @click="open = !open"> {{ open ? 'Close' : 'View' }} Links </span>
    <div class="navbar-drawer" :class="{ isOpen: open }">
      <nuxt-link v-for="link of links" :key="link.name" :to="link.to" exact v-text="link.name" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      links: [
        { to: '/', name: 'Home' },
        { to: '/dictionaries', name: 'Dictionaries' },
        { to: '/patients', name: 'Patients' },
        { to: '/images', name: 'Images' },
        { to: '/extractor', name: 'Extractor' },
        { to: '/products/view', name: 'Products/View' },
      ],
    };
  },
  watch: {
    '$route.name'() {
      this.open = false;
    },
  },
};
</script>

<style scoped>
.navbar {
  position: relative;
  background: #333333;
  color: white;
  padding: 10px;
}
.navbar-drawer {
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  width: 250px;
  top: 100%;
  left: -500px;
  padding: 0 10px 20px;
  background: #333333;
  text-align: center;
  transition: left 0.35s;
}
.isOpen {
  z-index: 1;
  left: 0;
}
span,
a {
  padding: 10px;
  color: white;
  cursor: pointer;
  text-decoration: none;
}
span:hover,
a:hover {
  background: white;
  color: #333333;
}
a.nuxt-link-active {
  cursor: default;
  background: #41b883;
  color: #333333;
}
</style>
