<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          class="menu__btn"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />
      </q-toolbar>
      <div class="q-px-lg q-mt-md q-mb-md">
        <div class="text-h3">Todo</div>
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img src="statics/banner.png" class="header-image absolute-top">
      </q-img>
    </q-header>

    <q-footer>
      <q-tabs dense>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :label="nav.label"
          :icon="nav.icon"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="280"
      :breakpoint="784"
    >
      <q-scroll-area
        style="height: calc(100% - 160px); margin-top: 160px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item
            v-for="nav in navs"
            :key="nav.label"
            :to="nav.to"
            clickable
            v-ripple
            exact
          >
            <q-item-section avatar>
              <q-icon :name="nav.icon" />
            </q-item-section>
            <q-item-section v-text="nav.label" />
          </q-item>

          <q-separator />

          <q-item>
            <q-item-section avatar>
              <q-icon name="language" />
            </q-item-section>
            <q-item-section>
              <LanguageSelector />
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <div
        class="absolute-top bg-primary text-white text-center"
        style="height: 160px"
      >
        <div class="absolute-center">
          <q-avatar size="56px" class="q-mb-xs">
            <img
              contain
              src="https://s.gravatar.com/avatar/a48176fdc56d31af45ce91ce6cd83df6"
            />
          </q-avatar>
          <div class="text-weight-bold q-mb-md">José Javier Cid Pinel</div>
          <div>@xeja</div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import LanguageSelector from "../components/LanguageSelector.vue";
import { date } from "quasar";

export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    todaysDate() {
      const lang = this.$q.lang.isoName;
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd D MMMM YYYY");
    },
    navs() {
      return [
        {
          label: this.$t("common.todo"),
          icon: "list",
          to: "/"
        },
        {
          label: this.$t("common.settings"),
          icon: "settings",
          to: "/settings"
        },
        {
          label: this.$t("common.about"),
          icon: "info",
          to: "/about"
        }
      ];
    }
  },
  components: {
    LanguageSelector
  }
};
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.7;
}

@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  .menu__btn {
    display: none;
  }
}
</style>
