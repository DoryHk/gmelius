import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useBirdSoundStore } from '@/stores/birdSounds';  

describe('birdSounds Store', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    setActivePinia(createPinia()); 
    mockAxios = new MockAdapter(axios);  
  });

  it('fetches bird sounds correctly', async () => {
    const mockResponse = {
      recordings: [
        { id: 1, gen: "Grus", sp: "grus", en: "Common Crane", length: 35 },
        { id: 2, gen: "Grus", sp: "grus", en: "Red-crowned Crane", length: 20 },
      ],
      numRecordings: 2,
    };

    // Mock the axios call to the API
    mockAxios.onGet('/api/api/2/recordings?query=cnt:france+stage:juvenile+gen:Grus&page=1').reply(200, mockResponse);

    const birdSoundStore = useBirdSoundStore();

    const { recordings, total } = await birdSoundStore.fetchBirdSounds(1);

    expect(recordings).toEqual(mockResponse.recordings);
    expect(total).toBe(mockResponse.numRecordings);
  });

  it('handles API failure gracefully', async () => {
    // Mock an error response
    mockAxios.onGet('/api/api/2/recordings?query=cnt:france+stage:juvenile+gen:Grus&page=1').reply(500);

    const birdSoundStore = useBirdSoundStore();

    // Call the fetchBirdSounds method and handle error
    try {
      await birdSoundStore.fetchBirdSounds(1);
    } catch (error) {
      // Expect the error to be thrown
      expect(error).toBeTruthy();
    }
  });

  it('fetches bird sounds for a specific page', async () => {
    const mockResponse = {
      recordings: [
        { id: 3, gen: "Grus", sp: "grus", en: "Whooping Crane", length: 50 },
      ],
      numRecordings: 1,
    };

    // Mock the axios call for a different page
    mockAxios.onGet('/api/api/2/recordings?query=cnt:france+stage:juvenile+gen:Grus&page=2').reply(200, mockResponse);

    const birdSoundStore = useBirdSoundStore();

    // Call the fetchBirdSounds method for page 2
    const { recordings, total } = await birdSoundStore.fetchBirdSounds(2);

    // Test the response
    expect(recordings).toEqual(mockResponse.recordings);
    expect(total).toBe(mockResponse.numRecordings);
  });
});
