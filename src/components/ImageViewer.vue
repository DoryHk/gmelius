<template>
    <div>
      <!-- Display the small image by default -->
      <img 
        :src="smallImage" 
        :alt="altText" 
        class="image-thumbnail" 
        @click="openModal" 
      />
  
      <!-- Modal to show the full-size image -->
      <v-dialog v-model="showModal" max-width="80%">
        <v-img :src="fullImage" />
        <v-btn @click="showModal = false" color="primary">Close</v-btn>
      </v-dialog>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    smallImage: String,   
    fullImage: String,    
    altText: String,     
  });
  
  const showModal = ref(false);  
  
  // Open the modal to show the full image
  const openModal = () => {
    showModal.value = true;
  };
  </script>
  
  <style scoped>
  .image-thumbnail {
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }
  
  .image-thumbnail:hover {
    opacity: 0.7;
  }
  
  .v-dialog {
    max-width: 90%;
  }
  
  .v-img {
    object-fit: contain;
  }
  </style>
  