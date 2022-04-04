<template>
  <nav class="menu">
    <div class="navbar">
      <button class="menu__button">Войти</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style lang="scss" scoped>
.menu {
  position: fixed;
  left: 0;
  right: 0;
  top: 76px;
  bottom: 0;
  z-index: 3;
  overflow: hidden;
  background: rgba($primary, 60%);
  animation: appear 0.2s;

  &__button {
    border: 1px solid $steel;
    border-radius: 4px;
    padding: 0 12px;
    color: $dark;

    &:hover {
      box-shadow: 1px 1px 10px $shadow;
      color: $primary;
    }
  }
}

.navbar {
  display: flex;
  padding: 12px 24px;
  height: 50px;
  background: $white;
}

@keyframes appear {
  from {
    background: rgba($primary, 0%);
    opacity: 0;
  }

  to {
    background: rgba($primary, 60%);
  }
}

@media (max-width: 425px) {
  .menu {
    top: 48px;
  }
}
</style>
