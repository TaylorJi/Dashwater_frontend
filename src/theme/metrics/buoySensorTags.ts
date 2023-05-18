import colors from '../foundations/colours';

export const buoySensorTags: deviceSensorTagsType = {
    "do": {
        "color": colors.tag.dissolvedO2,
        "label": "Oxygen"
    },
    "ph": {
        "color": colors.tag.pH,
        "label": "pH"
    },
    "ec": {
        "color": colors.tag.electricalConductivity,
        "label": "Conductivity"
    },
    "tbd": {
        "color": colors.tag.turbidity,
        "label": "Turbidity"
    },
    "tds": {
        "color": colors.tag.disolvedSolids,
        "label": "Dissolved Solids"
    },
    "temp": {
        "color": colors.tag.temp,
        "label": "Temperature"
    },
    "liqlev": {
        "color": colors.tag.waterLvl,
        "label": "Water Lvl"
    },
    "wf": {
        "color": colors.tag.waterFlow,
        "label": "Water Flow"
    },
    "wp": {
        "color": colors.tag.waterPressure,
        "label": "Water Pressure"
    }
}
