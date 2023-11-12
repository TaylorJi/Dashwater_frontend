import colors from '../foundations/colours';

export const buoySensorTags: deviceSensorTagsType = {
    "oxygen": {
        "color": colors.tag.dissolvedO2,
        "label": "Oxygen"
    },
    "ph": {
        "color": colors.tag.pH,
        "label": "pH"
    },
    "conductivity": {
        "color": colors.tag.electricalConductivity,
        "label": "Conductivity"
    },
    "tbd": {
        "color": colors.tag.turbidity,
        "label": "Turbidity"
    },
    "dissolved solids": {
        "color": colors.tag.disolvedSolids,
        "label": "Dissolved Solids"
    },
    "temperature": {
        "color": colors.tag.temp,
        "label": "Temperature"
    },
    "Water Lvl": {
        "color": colors.tag.waterLvl,
        "label": "Water Lvl"
    },
    "water flow": {
        "color": colors.tag.waterFlow,
        "label": "Water Flow"
    },
    "water pressure": {
        "color": colors.tag.waterPressure,
        "label": "Water Pressure"
    }
}
