export interface BirdSoundState {
  sounds: BirdSound[];
  loading: boolean;
  error: string | null;
}
export interface SonoImages {
  small: string;
  med: string;
  large: string;
  full: string;
}

export interface OsciImages {
  small: string;
  med: string;
  large: string;
}

export interface BirdSound {
  id: string;
  gen: string;
  sp: string;
  ssp: string;
  group: string;
  en: string;
  rec: string;
  cnt: string;
  loc: string;
  lat: string;
  lng: string;
  alt: string;
  type: string;
  sex: string;
  stage: string;
  method: string;
  url: string;
  file: string;
  fileName: string;
  sono: SonoImages;
  osci: OsciImages;
  lic: string;
  q: string;
  length: string;
  time: string;
  date: string;
  uploaded: string;
  also: string[];
  rmk: string;
  birdSeen: string;
  animalSeen: string;
  playbackUsed: string;
  temp: string;
  regnr: string;
  auto: string;
  dvc: string;
  mic: string;
  smp: string;
}
