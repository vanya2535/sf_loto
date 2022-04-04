<template>
  <footer class="footer">
    <div class="footer__info">© СФ ЛОТО, 2008–2022</div>

    <a
      class="footer__address"
      href="https://www.google.com/search?sxsrf=APq-WBtAJEhoC6htz20V62BeRyeXjw-CMw:1649095365256&q=%D1%81%D0%BC%D0%BE%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9+%D1%84%D0%B8%D0%BB%D0%B8%D0%B0%D0%BB+%D0%BC%D1%8D%D0%B8+%D0%B0%D0%B4%D1%80%D0%B5%D1%81&ludocid=3953531601185315818&sa=X&ved=2ahUKEwjYn8n7_vr2AhWKy4sKHdzJD5AQ6BN6BAhHEAI&biw=2560&bih=1289&dpr=1"
      target="_blank"
    >
      Энергетический пр-д, 1, Смоленск, Смоленская обл., 214013
    </a>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 12px;
  height: 73px;
  box-shadow: 0 -2px 6px $shadow;
  text-align: center;
  background: $white;

  &__info {
    font-size: 16px;
    color: $dark;
  }

  &__address {
    font-size: 14px;
    color: $gray;

    &:hover {
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .footer {
    &__info {
      font-size: 14px;
    }

    &__address {
      font-size: 12px;
    }
  }
}

@media (max-width: 425px) {
  .footer {
    &__info {
      font-size: 12px;
    }

    &__address {
      font-size: 10px;
    }
  }
}
</style>
