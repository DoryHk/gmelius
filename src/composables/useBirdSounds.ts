import { computed, ref } from "vue";
import { useBirdSoundStore } from "@/stores/birdSounds";
import type { BirdSound } from "@/types/birds";

export const useBirdSounds = () => {
  const sounds = ref<BirdSound[] | []>([]);
  const loading = ref<boolean>(false);
  const error = ref<string>("");
  const currentPage = ref<number>(1);
  const totalPages = ref<number>(1);
  const isShortSound = ref<boolean>(false);

  const headers = [
    { title: "Genus", value: "gen", sortable: true },
    { title: "Species", value: "sp", sortable: true },
    { title: "English Name", value: "en", sortable: true },
    { title: "Sound File", value: "file", sortable: true },
    {
      title: "Audio Duration",
      value: "length",
      sortable: true,
    },
    { title: "Sono", value: "sono", sortable: true },
    { title: "Osci", value: "osci", sortable: true },
    { title: "Location", value: "loc", sortable: true },
    { title: "Date", value: "date", sortable: true },
    { title: "Recorder", value: "rec", sortable: true },
    { title: "License", value: "lic", sortable: true },
  ];

  // Function to fetch bird sounds
  const fetchBirdSounds = async (page = 1) => {
    loading.value = true;
    error.value = "";
    sounds.value = [];
    try {
      const birdSoundStore = useBirdSoundStore();
      const { recordings, total } = await birdSoundStore.fetchBirdSounds(page);
      sounds.value = recordings;
      currentPage.value = page;
      totalPages.value = total;
    } catch (err) {
      error.value = "Failed to fetch bird sounds.";
    } finally {
      loading.value = false;
    }
  };

  // Helper function to parse the sound length from "0:36" to seconds
  const parseDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(":").map(Number);
    return minutes * 60 + seconds;
  };
  // Filter sounds based on length
  const filteredSounds = computed(() => {
    return sounds.value.filter((sound) => {
      const duration = parseDuration(sound.length);
      return isShortSound.value ? duration < 30 : true;
    });
  });

  return {
    sounds,
    headers,
    loading,
    error,
    currentPage,
    totalPages,
    fetchBirdSounds,
    isShortSound,
    filteredSounds,
  };
};
