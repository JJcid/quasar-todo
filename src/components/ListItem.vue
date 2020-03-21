<template>
  <q-item
    :id="id"
    @click="$emit('itemClick')"
    clickable
    v-ripple
    :class="['c-list-item', { 'done bg-blue-1': done }]"
  >
    <q-item-section avatar>
      <q-checkbox
        @input="$emit('itemClick')"
        no-pointer-events
        :value="done"
        color="primary"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
    <slot />
    <slot name="actions">
      <q-item-section v-if="done" side>
        <q-btn
          @click.stop="$emit('deleteItem')"
          flat
          round
          dense
          color="primary"
          icon="delete"
        ></q-btn>
      </q-item-section>
    </slot>
  </q-item>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    done: {
      type: Boolean,
      required: true,
      default: false
    }
  }
};
</script>

<style lang="scss">
.c-list-item {
  &.done {
    .q-item__label {
      text-decoration: line-through;
      color: #bbb;
    }
  }
}
</style>
