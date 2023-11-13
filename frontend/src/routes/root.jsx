import { Link, Outlet } from 'react-router-dom';
import {
  Card,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react';

export default function Root() {
  console.log(document.cookie);
  return (
    <Grid templateColumns='repeat(2, 1fr)' h={'100%'} gap={2}>
      <GridItem colSpan={1}>
        <Card>
          <Heading size={'md'}>Tickets ciudad universitaria UNACH</Heading>
          <Flex gap={8}>
            <ChakraLink>
              <Link to='/registro' >Registro</Link>
            </ChakraLink>
            <ChakraLink>
              <Link to='/login'>Login</Link>
            </ChakraLink>
          </Flex>

          <nav>
            <ul>
              <li>
                <a href={`/plantasElectricas`}>Plantas electricas</a>
              </li>
              <li>
                <a href={`/seguridad`}>Seguridad</a>
              </li>
              <li>
                <a href={`/jardineria`}>Jardineria</a>
              </li>
            </ul>
          </nav>
        </Card>
      </GridItem>
      <GridItem w='75%' rowSpan={2}>
        {document.cookie === 'session=auth' ? (
          <Text>Hola estoy logeado</Text>
        ) : (
          <Outlet />
        )}
      </GridItem>
    </Grid>
  );
}
