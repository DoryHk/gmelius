import { defineStore } from "pinia";
import axios from "axios";
import type { BirdSound } from "@/types/birds";

export const useBirdSoundStore = defineStore("birdSounds", () => {
  const fetchBirdSounds = async (
    page = 1
  ): Promise<{
    recordings: BirdSound[];
    total: number;
  }> => {
    try {
      const response = await axios.get(
        `/api/api/2/recordings?query=cnt:france+stage:juvenile+gen:Grus&page=${page}`
      );
      return {
        recordings: response.data.recordings,
        total: response.data.numRecordings,
      };
    } catch (error) {
      console.error("Failed to fetch bird sounds:", error);
      throw new Error("Unable to fetch bird sounds");
    }
  };

  return { fetchBirdSounds };
});
