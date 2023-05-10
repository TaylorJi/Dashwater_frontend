const POINTS_ALLOWED = 75;

export const remapData = (rawDeviceData: deviceDataType): deviceDataType => {

    // had to deep clone object due to state issues
    const remappedData: deviceDataType = JSON.parse(JSON.stringify(rawDeviceData));

    Object.keys(remappedData).map((device) => {

        remappedData[device].map((metric) => {

            const dataAfterReduction = [...metric['data']];

            if (dataAfterReduction.length > POINTS_ALLOWED) {

                const reducedPointsInterval = Math.floor(dataAfterReduction.length / POINTS_ALLOWED);

                let currPoint = 0;

                const reducedData: graphDataType[] = [];

                // not mapping directly because TS keeps giving me undefined here
                dataAfterReduction.map((data) => {
                    currPoint++;
                    if (currPoint === reducedPointsInterval) {
                        currPoint = 0;
                        reducedData.push(data);
                    }
                });

                metric['data'] = reducedData;

            }

        })

    });

    return remappedData;

};