export const tileServer = {
    ARC_MAP: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    CARTO_MAP: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
}

export const mapModalSpecs = {
    long: -123.17557,
    lat: 49.195007,
    zVal: 12.75,
    zSet: 0.25,
    cLong: -123.17557,
    cLat: 49.195007,
}

export const iconSpecs =  {
    xSize: 25,
    ySize: 30,
    xAnchor: 12,
    yAnchor: 41,
    xPopAnchor: 1,
    yPopAnchor: -34 
}