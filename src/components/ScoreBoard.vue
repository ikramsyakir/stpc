<template>
  <main v-if="first_serve === null">
    <div class="hero min-h-screen">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="text-center lg:text-left">
          <h1 class="text-5xl font-extrabold tracking-widest font-logo">
            STPC
          </h1>
          <p
            class="py-6 uppercase underline underline-offset-8 decoration-primary decoration-2 font-light whitespace-nowrap"
          >
            Sepak Takraw Point Counter
          </p>
        </div>
        <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div class="card-body">
            <Form @submit="randomServe" autocomplete="off">
              <div class="form-control">
                <Field
                  name="home"
                  v-model="home"
                  :rules="validateRequire"
                  :validateOnInput="true"
                  v-slot="{ field, errors, errorMessage }"
                >
                  <input
                    v-bind="field"
                    type="text"
                    :placeholder="$t('enter_team_name')"
                    :class="[
                      'input input-bordered',
                      errors[0] ? 'input-error' : '',
                    ]"
                  />
                  <span class="label-text-alt text-error mt-1">
                    {{ errorMessage }}
                  </span>
                </Field>
              </div>
              <h1 class="text-2xl font-bold text-center mt-3 mb-3">
                {{ $t("vs") }}
              </h1>
              <div class="form-control">
                <Field
                  name="guest"
                  v-model="guest"
                  :rules="validateRequire"
                  :validateOnInput="true"
                  v-slot="{ field, errors, errorMessage }"
                >
                  <input
                    v-bind="field"
                    type="text"
                    :placeholder="$t('enter_team_name')"
                    :class="[
                      'input input-bordered',
                      errors[0] ? 'input-error' : '',
                    ]"
                  />
                  <span class="label-text-alt text-error mt-1">
                    {{ errorMessage }}
                  </span>
                </Field>
              </div>
              <div class="form-control mt-6">
                <button class="btn btn-primary">{{ $t("start_game") }}</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </main>
  <main class="flex flex-col min-h-screen justify-center items-center" v-else>
    <div
      class="card w-full max-w-sm mx-auto bg-base-100 shadow-xl text-center"
    >
      <div class="card-body" v-if="!finish_game">
        <div v-if="!finish_game">
          <div class="p-6">
            <p class="font-mono uppercase mb-2">{{ $t("time") }}</p>
            <span class="countdown font-mono text-4xl">
              {{ formattedTime }}
            </span>
          </div>

          <div class="column-2 flex justify-around px-4 py-2 space-x-4">
            <div
              class="text-2xl font-bold bg-transparent overflow-auto whitespace-nowrap"
            >
              {{ home }}
            </div>
            <div
              class="text-2xl font-bold bg-transparent overflow-auto whitespace-nowrap"
            >
              {{ guest }}
            </div>
          </div>

          <div class="column-2 flex justify-around px-4 py-4">
            <div class="indicator indicator-center">
              <span
                class="indicator-item badge badge-success"
                v-if="team_serve === 1 && !finish_game"
              >
                <CheckIcon class="h-5 w-5"></CheckIcon>
              </span>
              <div
                :class="[
                  'grid rounded w-20 h-20 text-4xl bg-white text-black place-items-center cursor-default',
                  team_serve === 1 && !finish_game
                    ? 'border-8 border-success'
                    : '',
                ]"
              >
                {{ score_a }}
              </div>
            </div>
            <div class="indicator">
              <span
                class="indicator-item badge badge-success"
                v-if="team_serve === 2 && !finish_game"
              >
                <CheckIcon class="h-5 w-5"></CheckIcon>
              </span>
              <div
                :class="[
                  'grid rounded w-20 h-20 text-4xl bg-white text-black place-items-center cursor-default',
                  team_serve === 2 && !finish_game
                    ? 'border-8 border-success'
                    : '',
                ]"
              >
                {{ score_b }}
              </div>
            </div>
          </div>

          <div class="column-2 flex justify-around px-4 py-6">
            <button
              class="btn btn-primary btn-lg btn-circle"
              @click="addScore(1)"
              :disabled="finish_game"
            >
              <PlusIcon class="h-5 w-5" />
            </button>
            <button
              class="btn btn-primary btn-lg btn-circle"
              @click="addScore(2)"
              :disabled="finish_game"
            >
              <PlusIcon class="h-5 w-5" />
            </button>
          </div>

          <div class="column-2 flex justify-around px-4 py-6">
            <button
              class="btn btn-primary btn-lg btn-circle"
              @click="minusScore(1)"
              :disabled="finish_game"
            >
              <MinusIcon class="h-5 w-5" />
            </button>
            <button
              class="btn btn-primary btn-lg btn-circle"
              @click="minusScore(2)"
              :disabled="finish_game"
            >
              <MinusIcon class="h-5 w-5" />
            </button>
          </div>

          <h5 class="text-sm">
            {{ $t("total_score") }}
            <span class="badge badge-info badge-xs font-bold">
              {{ totalScore }}
            </span>
          </h5>
        </div>
      </div>
      <div class="card-body" v-else>
        <div class="stats shadow">
          <div class="stat">
            <div class="stat-title">{{ $t("time") }}</div>
            <div class="stat-value">{{ formattedTime }}</div>
          </div>
        </div>

        <div class="stats shadow">
          <div class="stat bg-success">
            <div class="stat-title text-black">{{ $t("winner") }}</div>
            <div class="stat-value text-white">{{ won.team }}</div>
            <div class="stat-desc text-2xl text-black">{{ won.score }}</div>
          </div>

          <div class="stat bg-error">
            <div class="stat-title text-black">{{ $t("loser") }}</div>
            <div class="stat-value text-white">{{ lose.team }}</div>
            <div class="stat-desc text-2xl text-black">{{ lose.score }}</div>
          </div>
        </div>

        <div class="stats shadow">
          <div class="stat">
            <div class="stat-title">{{ $t("first_serve") }}</div>
            <div class="stat-value">{{ firstServeTeam }}</div>
          </div>

          <div class="stat">
            <div class="stat-title">{{ $t("total_score") }}</div>
            <div class="stat-value">{{ totalScore }}</div>
          </div>
        </div>

        <button class="btn btn-secondary btn-block mt-3" @click="resetGame">
          {{ $t("start_new_game") }}
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import { PlusIcon, MinusIcon, CheckIcon } from "@heroicons/vue/solid";
import { Form, Field } from "vee-validate";
import moment from "moment/moment";

/**
 * 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48
 * 3, 9, 15, 21, 27, 33, 39, 45 - 1
 * 6, 12, 18, 24, 30, 36, 42, 48 - 2
 */

export default {
  components: {
    PlusIcon,
    MinusIcon,
    CheckIcon,
    // eslint-disable-next-line vue/no-reserved-component-names
    Form,
    Field,
  },
  data() {
    return {
      time: 0,
      timer: null,
      home: "Home",
      guest: "Guest",
      first_serve: null,
      score_a: 0,
      score_b: 0,
      team_serve: null,
      tie_score_1: false,
      tie_score_2: false,
      tie_score_3: false,
      tie_score_4: false,
      tie_score_5: false,
      winner: null,
      finish_game: false,
    };
  },
  watch: {
    score_a(val) {
      if (val < 0) {
        this.score_a = 0;
      }
    },
    score_b(val) {
      if (val < 0) {
        this.score_b = 0;
      }
    },
    totalScore() {
      const checkScore =
        !this.tie_score_1 &&
        !this.tie_score_2 &&
        !this.tie_score_3 &&
        !this.tie_score_4 &&
        !this.tie_score_5;

      if (checkScore) {
        let val = this.totalScore / 3;
        val = ~~val;

        if (this.first_serve === 1) {
          if (val % 2 === 0) {
            // Even
            this.team_serve = 1;
          } else {
            // Odd
            this.team_serve = 2;
          }
        } else if (this.first_serve === 2) {
          if (val % 2 === 0) {
            // Even
            this.team_serve = 2;
          } else {
            // Odd
            this.team_serve = 1;
          }
        }
      } else {
        if (this.first_serve === 1) {
          if (this.totalScore % 2 === 0) {
            // Even
            this.team_serve = 2;
          } else {
            // Odd
            this.team_serve = 1;
          }
        } else if (this.first_serve === 2) {
          if (this.totalScore % 2 === 0) {
            // Even
            this.team_serve = 1;
          } else {
            // Odd
            this.team_serve = 2;
          }
        }
      }
    },
  },
  computed: {
    totalScore() {
      return this.score_a + this.score_b;
    },
    formattedTime() {
      return moment().startOf("day").seconds(this.time).format("HH:mm:ss");
    },
    won() {
      if (this.winner === 1) {
        return {
          team: this.home,
          score: this.score_a,
        };
      } else if (this.winner === 2) {
        return {
          team: this.guest,
          score: this.score_b,
        };
      }
      return false;
    },
    lose() {
      if (this.winner === 1) {
        return {
          team: this.guest,
          score: this.score_b,
        };
      } else if (this.winner === 2) {
        return {
          team: this.home,
          score: this.score_a,
        };
      }
      return false;
    },
    firstServeTeam() {
      if (this.first_serve === 1) {
        return this.home;
      } else if (this.first_serve === 2) {
        return this.guest;
      }
      return false;
    },
  },
  methods: {
    validateRequire(value) {
      // if the field is empty
      if (!value) {
        return this.$t("this_field_is_required");
      }

      // All is good
      return true;
    },
    startTime: function () {
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    },
    randomServe: async function () {
      const serve = await this.$swal({
        title: this.$t("which_team_will_start_the_serve"),
        allowOutsideClick: false,
        allowEscapeKey: false,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: this.home, // 1
        denyButtonText: this.guest, // 2
        cancelButtonText: this.$t("random"),
      });

      if (serve.isDismissed) {
        this.first_serve = Math.floor(Math.random() * 2) + 1;

        let title;
        if (this.first_serve === 1) {
          title = this.home;
          this.first_serve = 1;
          this.team_serve = 1;
        } else {
          title = this.guest;
          this.first_serve = 2;
          this.team_serve = 2;
        }

        await this.$swal.fire(
          title + " " + this.$t("will_start_first_serve"),
          "",
          "info"
        );
        this.startTime();
      } else if (serve.isConfirmed) {
        this.first_serve = 1;
        this.team_serve = 1;

        await this.$swal.fire(
          this.home + " " + this.$t("will_start_first_serve"),
          "",
          "info"
        );
        this.startTime();
      } else if (serve.isDenied) {
        this.first_serve = 2;
        this.team_serve = 2;

        await this.$swal.fire(
          this.guest + " " + this.$t("will_start_first_serve"),
          "",
          "info"
        );
        this.startTime();
      }
    },
    addScore: function (team) {
      if (team === 1) {
        this.score_a++;
      } else if (team === 2) {
        this.score_b++;
      }

      this.process();
    },
    minusScore: function (team) {
      this.finish_game = false;
      this.winner = null;

      if (team === 1) {
        this.score_a--;
      } else if (team === 2) {
        this.score_b--;
      }

      this.process();
    },
    process: function () {
      // Check if both score less than 20, then all tie score is false
      if (this.score_a < 20 || this.score_b < 20) {
        this.tie_score_1 = false;
        this.tie_score_2 = false;
        this.tie_score_3 = false;
        this.tie_score_4 = false;
        this.tie_score_5 = false;
      }

      // Check tie score 20 - 20
      if (this.score_a === 20 && this.score_b === 20) {
        this.tie_score_1 = true;
        this.tie_score_2 = false;
        this.tie_score_3 = false;
        this.tie_score_4 = false;
        this.tie_score_5 = false;
      }

      // Tie score 20 - 20
      if (this.tie_score_1) {
        // Check tie score 21 - 21
        if (this.score_a === 21 && this.score_b === 21) {
          this.tie_score_1 = false;
          this.tie_score_2 = true;
          this.tie_score_3 = false;
          this.tie_score_4 = false;
          this.tie_score_5 = false;
        }

        /**
         * End game
         */
        if (this.score_a === 22) {
          this.winner = 1;
          this.finish_game = true;
          this.showWinner();
        }

        if (this.score_b === 22) {
          this.winner = 2;
          this.finish_game = true;
          this.showWinner();
        }
      }

      // Tie score 21 - 21
      if (this.tie_score_2) {
        // Check tie score 22 - 22
        if (this.score_a === 22 && this.score_b === 22) {
          this.tie_score_1 = false;
          this.tie_score_2 = false;
          this.tie_score_3 = true;
          this.tie_score_4 = false;
          this.tie_score_5 = false;
        }

        // Check tie score 20 - 20 for minus
        if (this.score_a === 20 && this.score_b === 20) {
          this.tie_score_1 = true;
          this.tie_score_2 = false;
          this.tie_score_3 = false;
          this.tie_score_4 = false;
          this.tie_score_5 = false;
        }

        /**
         * End game
         */
        if (this.score_a === 23) {
          this.winner = 1;
          this.finish_game = true;
          this.showWinner();
        }

        if (this.score_b === 23) {
          this.winner = 2;
          this.finish_game = true;
          this.showWinner();
        }
      }

      // Tie score 22 - 22
      if (this.tie_score_3) {
        // Check tie score 23 - 23
        if (this.score_a === 23 && this.score_b === 23) {
          this.tie_score_1 = false;
          this.tie_score_2 = false;
          this.tie_score_3 = false;
          this.tie_score_4 = true;
          this.tie_score_5 = false;
        }

        // Check tie score 21 - 21 for minus
        if (this.score_a === 21 && this.score_b === 21) {
          this.tie_score_1 = false;
          this.tie_score_2 = true;
          this.tie_score_3 = false;
          this.tie_score_4 = false;
          this.tie_score_5 = false;
        }

        /**
         * End game
         */
        if (this.score_a === 24) {
          this.winner = 1;
          this.finish_game = true;
          this.showWinner();
        }

        if (this.score_b === 24) {
          this.winner = 2;
          this.finish_game = true;
          this.showWinner();
        }
      }

      // Tie score 23 - 23
      if (this.tie_score_4) {
        // Check tie score 24 - 24
        if (this.score_a === 24 && this.score_b === 24) {
          this.tie_score_1 = false;
          this.tie_score_2 = false;
          this.tie_score_3 = false;
          this.tie_score_4 = false;
          this.tie_score_5 = true;
        }

        // Check tie score 22 - 22 for minus
        if (this.score_a === 22 && this.score_b === 22) {
          this.tie_score_1 = false;
          this.tie_score_2 = false;
          this.tie_score_3 = true;
          this.tie_score_4 = false;
          this.tie_score_5 = false;
        }

        /**
         * End game
         */
        if (this.score_a === 25) {
          this.winner = 1;
          this.finish_game = true;
          this.showWinner();
        }

        if (this.score_b === 25) {
          this.winner = 2;
          this.finish_game = true;
          this.showWinner();
        }
      }

      // Tie score 24 - 24
      if (this.tie_score_5) {
        // Check tie score 23 - 23 for minus
        if (this.score_a === 23 && this.score_b === 23) {
          this.tie_score_1 = false;
          this.tie_score_2 = false;
          this.tie_score_3 = false;
          this.tie_score_4 = true;
          this.tie_score_5 = false;
        }

        /**
         * End game
         */
        if (this.score_a === 25) {
          this.tie_score_5 = false;
          this.winner = 1;
          this.finish_game = true;
          this.showWinner();
        }

        if (this.score_b === 25) {
          this.tie_score_5 = false;
          this.winner = 2;
          this.finish_game = true;
          this.showWinner();
        }
      }

      const checkScore =
        !this.tie_score_1 &&
        !this.tie_score_2 &&
        !this.tie_score_3 &&
        !this.tie_score_4 &&
        !this.tie_score_5;

      if (checkScore && this.score_a === 21) {
        this.winner = 1;
        this.finish_game = true;
        this.showWinner();
      }

      if (checkScore && this.score_b === 21) {
        this.winner = 2;
        this.finish_game = true;
        this.showWinner();
      }
    },
    showWinner: function () {
      if (this.winner === 1) {
        clearInterval(this.timer);
        this.$swal.fire(this.home + " " + this.$t("win"));
      } else if (this.winner === 2) {
        clearInterval(this.timer);
        this.$swal.fire(this.guest + " " + this.$t("win"));
      }
    },
    resetGame: function () {
      this.time = 0;
      this.timer = null;
      this.home = "Home";
      this.guest = "Guest";
      this.first_serve = null;
      this.score_a = 0;
      this.score_b = 0;
      this.team_serve = null;
      this.tie_score_1 = false;
      this.tie_score_2 = false;
      this.tie_score_3 = false;
      this.tie_score_4 = false;
      this.tie_score_5 = false;
      this.winner = null;
      this.finish_game = false;
    },
  },
};
</script>
