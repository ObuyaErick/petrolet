<script lang="ts" setup>
const faqs = [
  {
    question: "Et ut numquam illum.",
    answer:
      "Non sed est. Odit quae architecto. Reiciendis mollitia iusto.Consequatur fugiat aut. Eius aliquid dolore. Delectus et qui.Quia qui quas. Enim consequatur soluta. Voluptatem dolorem quibusdam.",
  },
  {
    question: "Esse exercitationem voluptatem ut.",
    answer:
      "Beatae quia nulla. Molestiae fugit et. Nobis nulla vel.Ipsum qui temporibus. Quaerat pariatur quia. Debitis dolorem aspernatur.Beatae aut vel. Et voluptates dolor. Quia doloribus asperiores.",
  },
  {
    question: "Inventore possimus eos nesciunt.",
    answer:
      "Eaque et iure. Inventore iusto et. Reprehenderit velit sed.Eum ipsam eveniet. Harum quas saepe. Amet quod ut.Enim distinctio voluptatum. Eum aperiam perspiciatis. Qui unde tenetur.",
  },
  {
    question: "Quia tenetur et nam.",
    answer:
      "Et aperiam quibusdam. Quae facere illo. Dolor vel minus.Possimus consequatur cupiditate. Quo quasi earum. Similique nesciunt molestiae.Aliquid soluta quas. Deserunt dolor et. Molestiae maxime doloribus.",
  },
  {
    question: "Aliquid expedita nihil eveniet.",
    answer:
      "Velit molestiae et. Rem quaerat explicabo. Neque ullam cumque.Dolorem voluptas esse. Quia consectetur laborum. Vel corrupti necessitatibus.Quia blanditiis magni. Qui iure tenetur. Et reprehenderit eos.",
  },
  {
    question: "Possimus asperiores ut a.",
    answer:
      "Explicabo corporis laboriosam. Qui rem qui. Cum illo est.Sit ut labore. Incidunt aliquid dolor. Quis ipsum maxime.Id velit dolores. Voluptatibus neque voluptatem. Consequatur sunt libero.",
  },
  {
    question: "Error autem delectus et.",
    answer:
      "Magnam voluptas qui. Numquam consequatur adipisci. Non sequi non.Dolores repellendus nemo. Voluptatibus nihil natus. Exercitationem consequatur ut.Quos autem libero. Qui ea est. Qui sint placeat.",
  },
  {
    question: "Suscipit minus et quia.",
    answer:
      "Inventore accusantium ut. Ut accusamus delectus. Reiciendis quia architecto.Quo sit quam. Dolorem omnis tenetur. Totam rem ut.Molestiae dolor consequatur. Sequi quasi cumque. Dolores et architecto.",
  },
  {
    question: "Aut alias sed illum.",
    answer:
      "Animi explicabo autem. Aperiam in velit. Itaque rem ipsam.Provident soluta modi. Non sequi aliquid. Voluptate ea est.Aut et aut. Commodi consequatur dolorem. Optio dignissimos assumenda.",
  },
];
</script>

<template>
  <div class="px-3 py-8">
    <h3 class="text-2xl font-semibold text-medium-emphasis">
      <v-icon class="me-3">mdi-help-network-outline</v-icon>Frequently asked
      questions
    </h3>

    <div class="grid gap-4 md:grid-cols-2">
      <v-expansion-panels
        expand-icon="mdi-plus"
        collapse-icon="mdi-minus"
        class="my-4"
        variant="popout"
        rounded="xl"
        elevation="0"
      >
        <v-expansion-panel v-for="({ question, answer }, i) in faqs" :key="i">
          <v-expansion-panel-title>{{ question }}</v-expansion-panel-title>
          <v-expansion-panel-text class="text-medium-emphasis">{{
            answer
          }}</v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <div class="flex flex-col items-center justify-center md:px-8">
        <div class="flex flex-col items-start gap-6">
          <h4
            class="capitalize text-2xl lg:text-3xl font-semibold text-medium-emphasis"
          >
            Have more questions?<br />
            Don&apos;t hesitate to reach us
          </h4>
          <div class="text-secondary">
            Suite 834 4637 Kirlin Club,<br />
            North Courtney, NC 63114-4840
          </div>
          <div class="flex gap-3 flex-wrap">
            <v-btn
              variant="plain"
              class="border bg-white text-none"
              rounded="pill"
              prepend-icon="mdi-cellphone"
              >| +254700334455</v-btn
            >
            <v-btn
              variant="plain"
              class="border bg-white text-none"
              rounded="pill"
              prepend-icon="mdi-email-outline"
              >| randy.schoen@murray.example</v-btn
            >
          </div>
          <v-dialog>
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                rounded="pill"
                color="primary"
                prepend-icon="mdi-chat-question-outline"
                >Ask Now</v-btn
              >
            </template>
            <v-card>
              <v-card-text>
                <v-textarea></v-textarea>
              </v-card-text>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
