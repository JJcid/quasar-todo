<template>
  <q-page class="bg-grey-3 column" id="todo">
    <div class="row q-pa-sm bg-primary add-task-input">
      <q-input
        v-model.trim="newTaskTitle"
        @keyup.enter="addTask"
        :placeholder="$t('common.addTask')"
        dense
        filled
        square
        bg-color="white"
        class="col"
      >
      </q-input>

      <q-input
        filled
        bg-color="white"
        square
        dense
        v-model="date"
        mask="##/##/####"
        class="col q-ml-xs"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="date"
                :mask="dateMask"
                today-btn
                @input="() => $refs.qDateProxy.hide()"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        filled
        bg-color="white"
        class="col q-ml-xs"
        square
        dense
        v-model="hour"
        mask="time"
      >
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="hour" :now-btn="true" :format24h="true" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-btn
        icon="add"
        outline
        color="white"
        size="16px"
        @click="addTask"
        class="q-ml-sm q-pl-sm q-pr-sm"
      />
    </div>
    <q-list class="bg-white" separator bordered>
      <list-item
        v-for="task in tasks"
        :key="task.id"
        :title="task.title"
        :done="task.done"
        :id="task.id"
        @itemClick="updateTaskState(task)"
        @deleteItem="deleteTask(task.id)"
      >
        <q-item-section side>
          <q-chip square>
            <q-avatar icon="event" color="primary" text-color="white" />
            {{ `${getFrontDate(task.date)} ${task.hour}` }}
          </q-chip>
        </q-item-section>
      </list-item>
    </q-list>
    <div class="no-tasks absolute-center" v-if="!tasks.length">
      <q-icon name="check" size="100px" color="primary"></q-icon>
      <div class="text-h5 text-primary text-center">
        {{ $t("common.noTasks") }}
      </div>
    </div>
    <div class="add-task-button absolute-bottom text-center q-mb-lg">
      <q-btn
        @click="showAddTaskDialog = true"
        color="primary"
        size="16px"
        round
        :icon="icon"
      ></q-btn>
    </div>
    <q-dialog v-model="showAddTaskDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6" v-text="$t('common.addTask')"></div>
        </q-card-section>
        <q-card-section>
          <q-input filled v-model="date" mask="##/##/####">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="date"
                    today-btn
                    :mask="dateMask"
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
        <q-card-section>
          <q-input filled v-model="hour" mask="time">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="hour" :now-btn="true" :format24h="true" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>

        <q-card-section>
          <q-input v-model="newTaskTitle" :label="$t('common.task')" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            @click="addTask"
            flat
            label="OK"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { date, uid } from "quasar";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ToDo",
  data() {
    return {
      message: "ToDo",
      newTaskTitle: "",
      icon: "add",
      date: this.todaysDate,
      hour: "00:00",
      showAddTaskDialog: false
    };
  },
  computed: {
    ...mapGetters("tasks", { tasks: "allTasks" }),
    todaysDate() {
      const lang = this.$q.lang.isoName;
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, this.dateMask);
    },
    dateMask() {
      return this.$q.lang.isoName === "es" ? "DD/MM/YYYY" : "YYYY/MM/DD";
    }
  },
  methods: {
    ...mapActions("tasks", {
      storeAddTask: "addTask",
      storeUpdateTask: "updateTask",
      storeDeleteTask: "deleteTask"
    }),
    addTask() {
      if (this.newTaskTitle) {
        this.storeAddTask({
          id: uid(),
          title: this.newTaskTitle,
          date: this.getBackDate(),
          hour: this.hour,
          done: false
        });
        this.newTaskTitle = "";
      }
    },
    updateTaskState(task) {
      this.storeUpdateTask({ id: task.id, updates: { done: !task.done } });
    },
    deleteTask(id) {
      this.$q
        .dialog({
          title: this.$t("common.confirm"),
          message: this.$t("common.deleteTaskMessage"),
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.storeDeleteTask(id);
          this.$q.notify({
            message: this.$t("common.deletedTask"),
            position: "top-right",
            color: "positive",
            icon: "check"
          });
        });
    },
    getBackDate(inputDate = this.date) {
      return date.formatDate(
        date.extractDate(inputDate, this.dateMask),
        "YYYY-MM-DD"
      );
    },
    getFrontDate(inputDate = this.date) {
      return date.formatDate(
        date.extractDate(inputDate, "YYYY-MM-DD"),
        this.dateMask
      );
    }
  },
  created() {
    this.date = this.todaysDate;
  },
  components: {
    ListItem: () => import("src/components/ListItem.vue")
  }
};
</script>
<style lang="scss">
#todo {
  .no-tasks {
    opacity: 0.5;
  }
  .add-task-button {
    display: none;
  }

  @media screen and (max-width: 767px) {
    .add-task-input {
      display: none;
    }
  }
  @media screen and (max-width: 767px) {
    .add-task-button {
      display: block;
    }
  }
}
</style>
