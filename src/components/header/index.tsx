import { Flex, Text, Icon, Box, Center } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

import { AiOutlineHome, AiOutlinePlus } from 'react-icons/ai';

const Header: FC = () => {
  return (
    <Flex
      p={3}
      h="60px"
      bgColor="teal.100"
      alignItems="center"
      justify="space-between"
    >
      <Text as="b" color="blackAlpha.800">
        GraphQL Todo App.
      </Text>
      <Flex alignItems="center">
        <Link href="/create">
          <Center mr={4}>
            <Icon
              as={AiOutlinePlus}
              color="blackAlpha.800"
              cursor="pointer"
              boxSize="20px"
            />
          </Center>
        </Link>
        <Link href="/">
          <Center>
            <Icon
              as={AiOutlineHome}
              color="blackAlpha.800"
              cursor="pointer"
              boxSize="20px"
            />
          </Center>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Header;
