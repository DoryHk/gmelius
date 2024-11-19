import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useBirdSoundStore } from "@/stores/birdSounds";

describe("birdSounds Store", () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    setActivePinia(createPinia());
    mockAxios = new MockAdapter(axios);
  });

  it("fetches bird sounds correctly", async () => {
    const mockResponse = {
      recordings: [
        { id: 1, gen: "Grus", sp: "grus", en: "Common Crane", length: "00:35" },
        {
          id: 2,
          gen: "Grus",
          sp: "grus",
          en: "Red-crowned Crane",
          length: "00:20",
        },
      ],
      numRecordings: 2,
    };

    mockAxios
      .onGet(
        "/api/api/2/recordings?query=cnt:france+stage:juvenile+gen:Grus&page=1"
      )
      .reply(200, mockResponse);

    const birdSoundStore = useBirdSoundStore();
    const result = await birdSoundStore.fetchBirdSounds(1);

    expect(result.recordings).toEqual(mockResponse.recordings);
    expect(result.total).toBe(mockResponse.numRecordings);
  });

  it("handles API failure gracefully", async () => {
    mockAxios
      .onGet(
        "/api/api/2/recordings?query=cnt:france+stage:juvenile+gen:Grus&page=1"
      )
      .reply(500);

    const birdSoundStore = useBirdSoundStore();

    await expect(birdSoundStore.fetchBirdSounds(1)).rejects.toThrow(
      "Unable to fetch bird sounds"
    );
  });

  it("fetches bird sounds for a specific page", async () => {
    const mockResponse = {
      recordings: [
        {
          id: 3,
          gen: "Grus",
          sp: "grus",
          en: "Whooping Crane",
          length: "00:50",
        },
      ],
      numRecordings: 1,
    };

    mockAxios
      .onGet(
        "/api/api/2/recordings?query=cnt:france+stage:juvenile+gen:Grus&page=2"
      )
      .reply(200, mockResponse);

    const birdSoundStore = useBirdSoundStore();
    const result = await birdSoundStore.fetchBirdSounds(2);

    expect(result.recordings).toEqual(mockResponse.recordings);
    expect(result.total).toBe(mockResponse.numRecordings);
  });
});
