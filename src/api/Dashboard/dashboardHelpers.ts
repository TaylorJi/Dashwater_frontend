const POINTS_ALLOWED = 50;

export const remapData = (rawDeviceData: deviceDataType): deviceDataType => {

    const remappedData = { ...rawDeviceData };

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