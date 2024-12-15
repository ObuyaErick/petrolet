<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4">
        <v-select
          v-model="filters.make"
          :items="makes"
          label="Select Car Make"
          item-text="name"
          item-value="id"
          return-object
          outlined
        ></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="filters.model"
          :items="models"
          label="Select Car Model"
          item-text="name"
          item-value="id"
          return-object
          outlined
        ></v-select>
      </v-col>

      <v-col cols="12" md="4">
        <v-text-field
          v-model="filters.yearRange"
          label="Year Range"
          hint="e.g. 2015-2020"
          outlined
        ></v-text-field>
      </v-col>

      <v-col cols="12" md="4">
        <v-slider
          v-model="filters.priceRange"
          :min="1000"
          :max="50000"
          step="500"
          label="Price Range"
          thumb-label
          ticks
          tick-size="4"
          outlined
        ></v-slider>
      </v-col>

      <v-col cols="12" md="4">
        <v-select
          v-model="filters.type"
          :items="carTypes"
          label="Car Type"
          outlined
        ></v-select>
      </v-col>

      <v-col cols="12" class="text-center">
        <v-btn color="primary" @click="applyFilters">Apply Filters</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const makes = [
  { id: 1, name: "Toyota" },
  { id: 2, name: "Honda" },
  { id: 3, name: "Ford" },
  { id: 4, name: "BMW" },
];

const models = [
  { id: 1, name: "Corolla" },
  { id: 2, name: "Civic" },
  { id: 3, name: "F-150" },
  { id: 4, name: "X5" },
];

const carTypes = ["Sedan", "SUV", "Truck", "Coupe", "Convertible"];

const filters = ref({
  make: null,
  model: null,
  yearRange: "",
  priceRange: [1000, 50000],
  type: null,
});

const applyFilters = () => {
  // Handle filter application logic here
  console.log("Filters applied:", filters.value);
};
</script>

<style scoped>
.v-select,
.v-text-field {
  margin-bottom: 1rem;
}
</style>
