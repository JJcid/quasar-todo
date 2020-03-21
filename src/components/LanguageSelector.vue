<template>
  <q-select
    v-model="lang"
    :options="langOptions"
    :label="label"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />
</template>

<script>
import languages from "quasar/lang/index.json";
const appLanguages = languages.filter(lang =>
  ["es", "en-us"].includes(lang.isoName)
);

export default {
  data() {
    return {
      lang: this.$q.lang.isoName
    };
  },

  watch: {
    lang(lang) {
      // dynamic import, so loading on demand only
      import(
        /* webpackInclude: /(es|en-us)\.js$/ */
        `quasar/lang/${lang}`
      ).then(lang => {
        this.$q.lang.set(lang.default);
        this.$i18n.locale = lang.default.isoName;
      });
    }
  },

  computed: {
    label() {
      return this.$t("common.language");
    }
  },

  created() {
    this.langOptions = appLanguages.map(lang => ({
      label: lang.nativeName,
      value: lang.isoName
    }));
  }
};
</script>
