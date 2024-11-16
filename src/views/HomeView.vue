<script lang="ts" setup>
import { useBirdSounds } from "@/composables/useBirdSounds";
import ImageViewer from "@/components/ImageViewer.vue"; 
 
const {
  sounds,
  loading,
  error,
  headers,
  currentPage,
  totalPages,
  fetchBirdSounds,
  isShortSound,
  filteredSounds,
} = useBirdSounds(); 
</script>

<template>
  <v-container>
    <h1>French Juvenile Bird Sounds (Grus)</h1>

    <!-- Fetch Button -->
    <v-btn @click="fetchBirdSounds(1)" :loading="loading" class="mb-4" color="primary">
      Fetch Bird Sounds
    </v-btn>

    <!-- Sound Length Filter Switch -->
    <!-- <v-switch
      v-if="sounds.length"
      v-model="isShortSound"
      @change="filteredSounds"
      label="Show sounds shorter than 30 seconds"
      :false-value="false"
      :true-value="true"
    /> -->

    <!-- Error Alert -->
    <v-alert v-if="error" type="error" dismissible class="mb-4">
      {{ error }}
    </v-alert>

    <!-- Data Table -->
    <v-data-table v-if="sounds.length" :headers="headers" :items="sounds" item-value="id" class="elevation-1">
      <!-- Custom File Column -->
      <template v-slot:item.file="{ item }"> 
        <audio :src="item.file"  controls preload="none" class="audio-players" />
      </template>


      <!-- Custom Icon Column -->
      <template v-slot:item.osci="{ item }">
        <ImageViewer 
        :smallImage="item.osci.small" 
        :fullImage="item.osci.large" 
        :altText="`Sound icon for ${item.gen} ${item.sp}`" 
      />
       </template>

      <!-- Custom Icon Column -->
      <template v-slot:item.sono="{ item }">
        <ImageViewer 
        :smallImage="item.sono.small" 
        :fullImage="item.sono.large" 
        :altText="`Sound icon for ${item.gen} ${item.sp}`" 
      />
       </template>

      <!-- Custom License Column -->
      <template v-slot:item.lic="{ item }">
        <a :href="item.lic" target="_blank">License</a>
      </template>
    </v-data-table>

  </v-container>
  
</template>
<style scoped>
.v-container {
  padding: 20px;
}

h1 {
  font-family: "Roboto", sans-serif;
  color: #2c3e50;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
}

.v-btn {
  width: 100%;
  max-width: 220px;
  margin: 0 auto 24px;
}

.v-btn:focus {
  outline: none;
}

.v-alert {
  margin-bottom: 24px;
}

.v-data-table {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-top: 20px;
}

.v-data-table th,
.v-data-table td {
  padding: 16px 12px;
  text-align: left;
  font-size: 14px;
}

.v-data-table th {
  background-color: #f5f5f5;
  color: #333;
  font-weight: bold;
}

.v-data-table tbody tr {
  transition: background-color 0.3s ease;
}

.v-data-table tbody tr:hover {
  background-color: #f9f9f9;
}

.v-data-table tbody tr:active {
  background-color: #e1e1e1;
}

.v-pagination {
  --v-pagination-color: #1976d2;
  --v-pagination-active-color: #2196f3;
  margin-top: 24px;
  text-align: center;
}

.audio-players { 
  background: #f4f4f4;
  border: none;
  border-radius: 4px;
  outline: none;
  margin-top: 12px;
}

.audio-players:focus {
  outline: none;
}

.v-switch {
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
}

.v-data-table td img {
  max-width: 100px;
  height: auto;
  border-radius: 4px;
}

.v-data-table td a {
  color: #1976d2;
  text-decoration: none;
}

.v-data-table td a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .v-data-table th,
  .v-data-table td {
    font-size: 12px;
    padding: 12px 8px;
  }

  .v-btn {
    max-width: 100%;
  }

  .audio-players {
    height: 36px;
  }

  h1 {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 18px;
  }

  .v-btn {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .v-data-table th,
  .v-data-table td {
    padding: 8px;
  }

  .audio-players {
    height: 30px;
  }
}
</style>
