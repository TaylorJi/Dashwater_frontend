import { Flex, Icon, Text, Link } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

type sidebarItemProps = {
    currPath: string;
    link: string;
    icon: IconDefinition;
    description: string;
    isExternal: boolean;
};

const SidebarItem: React.FC<sidebarItemProps> = ({ currPath, link, icon, description, isExternal }) => {

    const navigate = useNavigate();

    return (

        <Flex
            mb='0.75rem'
            p='0.5rem'
            bgColor={currPath ===
                link ?
                'main.activeSideBar' : ''}
            alignContent='center'
            borderRadius='0.25rem'
            transition={'all 0.2s ease-in-out'}
            onClick={() => {
                if (!isExternal) {
                    navigate(link);
                } else {
                    window.open(link, '_blank');
                }
            }}
            _hover={{
                transform: 'scale(1.05)',
                cursor: 'pointer'
            }}
            key={uuid()}
        >
            <Icon as={FontAwesomeIcon}
                color={currPath === link ? 'main.usafaBlue' : 'gray.400'}
                icon={icon}
                size='xl'
                mr='2rem'
                transition={'all 0.2s ease-in-out'}
                _hover={{
                    color: '#02558B'
                }}
            />
            <Text
                w='20rem'
                textDecoration='none'
                whiteSpace='nowrap'
                fontWeight={currPath === link ? 'bold' : 'normal'}
                color={currPath === link ? 'main.usafaBlue' : 'black'}
            >
                {
                    description
                }
            </Text>
        </Flex>

    );
};

export default SidebarItem;