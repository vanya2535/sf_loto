<template>
  <header class="header d-flex">
    <button
      class="header__button"
      :class="{ header__button_active: isMenuOpen }"
      @click="isMenuOpen = !isMenuOpen"
    >
      <div class="line" />
      <div class="line" />
      <div class="line" />
    </button>

    <img src="@/assets/img/lottery.svg" alt="" srcset="" />

    <div class="header__info">
      <router-link class="header__link" to="/">СФ ЛОТО</router-link>
      <div class="header__title">Играй и выигрывай!</div>
      <div class="header__subtitle">не является настоящим лото</div>
    </div>

    <div v-if="IS_AUTHORIZED" class="header__user">
      <div class="header__username">{{ GET_USER_USERNAME }}</div>

      <div
        v-if="GET_USER_ROLES.includes('USER')"
        class="header__balance"
        @click="$eventBus.emit('openRefillModal')"
      >
        {{ $costMask(GET_BALANCE || 0) }} ₽
      </div>
    </div>
  </header>

  <NavbarMenu
    v-model="isMenuOpen"
    class="header__menu"
    :class="{ header__menu_visible: isMenuOpen }"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarMenu from './NavbarMenu'

export default {
  name: 'Header',

  components: { NavbarMenu },

  data() {
    return {
      isMenuOpen: false
    }
  },

  computed: {
    ...mapGetters('user', [
      'IS_AUTHORIZED',
      'GET_USER_USERNAME',
      'GET_USER_ROLES',
      'GET_BALANCE'
    ])
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 3;
  column-gap: 12px;
  justify-content: center;
  border-bottom: 1px solid $steel;
  padding: 12px;
  height: 76px;
  text-align: center;
  background: $white;

  img {
    height: 100%;
  }

  &__link {
    font-weight: 700;
    font-size: 24px;
    text-shadow: 3px 1px 1px $shadow;
    color: $dark;

    &:hover {
      @media (min-width: 1024px) {
        color: $graphite;
      }
    }
  }

  &__button {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 3;
    width: 76px;
    height: 76px;
    color: $white;
    background: $graphite;
    aspect-ratio: 1;

    .line {
      margin: 10px auto;
      width: 60px;
      height: 4px;
      background: $white;
      transition: width 0.2s;
    }

    &_active {
      .line {
        &:nth-child(odd) {
          width: 45px;
          transition: width 0.2s;
        }

        &:nth-child(2n) {
          width: 30px;
          transition: width 0.2s;
        }
      }
    }

    &:hover {
      @media (min-width: 1024px) {
        background: $primary;
      }
    }
  }

  &__title {
    margin-top: -12px;
    font-size: 18px;
    color: $dark;
  }

  &__subtitle {
    margin-top: -8px;
    font-size: 10px;
    color: $gray;
  }

  &__user {
    position: absolute;
    right: 38px;
    top: 50%;
    text-align: end;
    transform: translateY(-50%);

    .header {
      &__username {
        margin-bottom: -6px;
        font-size: 16px;
        color: $graphite;
      }

      &__balance {
        font-size: 14px;
        color: $dark;
        cursor: pointer;

        &:hover {
          @media (min-width: 1024px) {
            color: $primary;
          }
        }
      }
    }
  }

  &__menu_visible {
    display: block !important;
  }
}

@media (min-width: 768px) {
  .header {
    img {
      position: absolute;
      left: 36px;
      top: 50%;
      width: 51px;
      height: 51px;
      transform: translateY(-50%);
    }

    &__button {
      display: none;
    }
  }
}

@media (max-width: 767px) {
  .header__menu {
    display: none;
  }
}

@media (max-width: 425px) {
  .header {
    padding: 0;
    height: 48px;

    &__title {
      display: none;
    }

    &__button {
      width: 48px;
      height: 48px;

      .line {
        margin: 6px auto;
        width: 36px;
        height: 3px;
      }

      &_active {
        .line {
          &:nth-child(odd) {
            width: 24px;
            transition: width 0.2s;
          }

          &:nth-child(2n) {
            width: 14px;
            transition: width 0.2s;
          }
        }
      }
    }

    &__user {
      right: 24px;

      .header {
        &__username {
          margin-bottom: -4px;
          font-size: 14px;
          color: $graphite;
        }

        &__balance {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
