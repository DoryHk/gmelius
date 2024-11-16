import { defineStore } from 'pinia';
import axios from 'axios';

export const useBirdSoundStore = defineStore('birdSounds', () => {
  const fetchBirdSounds = async (page = 1) => {
    const response = await axios.get(
      `/api/api/2/recordings?query=cnt:france+stage:juvenile+gen:Grus&page=${page}`
    );
    return {
      recordings: response.data.recordings,
      total: response.data.numRecordings,
    };
  };

  return { fetchBirdSounds };
});
