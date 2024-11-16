import { ref } from "vue";
import { useBirdSoundStore } from "@/stores/birdSounds";

export const useBirdSounds = () => {
  const sounds = ref([]);
  const loading = ref(false);
  const error = ref("");
  const currentPage = ref(1);
  const totalPages = ref(1);
  const isShortSound = ref(false); // Reactive variable for the switch
  const headers = [
    { title: "Genus", value: "gen", align: "center", sortable: true },
    { title: "Species", value: "sp", align: "center", sortable: true },
    { title: "English Name", value: "en", align: "center", sortable: true },
    { title: "Sound File", value: "file", align: "center", sortable: true },
    {
      title: "Audio Duration",
      value: "length",
      align: "center",
      sortable: true,
    },
    { title: "sono", value: "sono", align: "center", sortable: true },
    { title: "Osci", value: "osci", align: "center", sortable: true },
    { title: "Location", value: "loc", align: "center", sortable: true },
    { title: "Date", value: "date", align: "center", sortable: true },
    { title: "Recorder", value: "rec", align: "center", sortable: true },
    { title: "License", value: "lic", align: "center", sortable: true },
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
  const filteredSounds = () => {
    sounds.value = sounds.value.filter((sound) => {
       const duration = parseDuration(sound.length);
       return isShortSound.value ? duration < 30 : duration >= 30;
    });
  };
 
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
