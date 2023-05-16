type buoyMapInfo = {
  buoys?: {
    name: string;
    id: number;
    x: number;
    y: number;
  }[];
};



//TODO:This will need to be replaced
type buoyInfo = {
  buoys?: {
    name: string;
    id: string;
    location: {
      x: number;
      y: number;
    };
  }[];
};


type deviceMapInfo = {
  name: string;
  id: string;
  x: number;
  y: number;
}


