import { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import { Box, Card, CardHeader, CardBody, CardFooter, Flex, Spacer, Heading, Stack, StackDivider, Grid, GridItem, SimpleGrid, Button, Square, Center, Divider, HStack } from '@chakra-ui/react'

export default function Menu() {
    return (
        <Grid >
            <Menu>
                <MenuButton as={IconButton} border='2px' borderColor='green.500' textColor='black' colorScheme='white' width='150px' textAlign='center' right='-200' top='-7'>
                    Profile
                </MenuButton>
                <MenuList>
                    <MenuGroup title='Profile'>
                        <MenuItem>My Account</MenuItem>
                        <MenuItem>Payments </MenuItem>
                    </MenuGroup>
                    <MenuDivider />
                    <MenuGroup title='Help'>
                        <MenuItem>Docs</MenuItem>
                        <MenuItem>FAQ</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </Grid>

    );
}