import { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import { Box, 
    Card, 
    CardHeader, Grid } from '@chakra-ui/react'

export default function DataCard() {
    return (
        <Grid >
            <Card shadow='dark-lg' p='6' rounded='md' bg='white' width='1575px' height='800px' top='0' left='-330' textAlign='left'> </Card>
        </Grid>

    );
}