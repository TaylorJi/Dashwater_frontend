import { Box, Text, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Input, Button } from '@chakra-ui/react'
import Authentication from '../../api/Authentication/Authentication';

const Test: React.FC = () => {

    const [msg, setMsg] = useState<string>('');
    const [displayData, setDisplayData] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <Box
            mx='1rem'
            my='1rem'
        >
            <Flex
                flexDir='row'
                alignItems='center'
            >
                <Input
                    w='10rem'
                    placeholder='Enter a message'
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <Button
                    colorScheme='main'
                    ml='0.5rem'
                    isDisabled={msg.trim() === ''}
                    onClick={async () => {
                        setIsLoading(true);
                        const textData = await Authentication.testEndpoint(msg);
                        setDisplayData(textData);
                        setMsg('');
                        setIsLoading(false);
                    }}
                >
                    Send to Server
                </Button>
            </Flex>
            <Text
                mt='0.5rem'
            >
                {
                    isLoading ?
                        'Loading.....'
                        : (
                            displayData === '' ?
                                'Enter some text!'
                                : displayData
                        )
                }
            </Text>
        </Box>
    );
};

export default Test;