import {
	Button, Card, CardBody, CardHeader, FormControl,
	FormLabel, Grid, Heading, IconButton, Input, Menu,
	MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea
} from '@chakra-ui/react';


export default function BackgroundCard() {
	const submit = () => {
	}
	return (
		<Grid >
			<Card shadow='dark-lg' p='6' rounded='md' bg='white' width='1875px' height='900px' top='0' left='-330' textAlign='left'>
				<CardHeader>
					<Heading size='md'>Logo de la unach</Heading>
					<Grid >
						<Menu>
							<MenuButton as={IconButton} border='2px' borderColor='blue.500' textColor='black' colorScheme='white' width='150px' textAlign='center' right='-200' top='-7'>
								Profile
							</MenuButton>
							<MenuList>
								<MenuGroup title='Profile'>
									<MenuItem>Mi cuenta</MenuItem>
									<MenuItem>Mis tickets </MenuItem>
								</MenuGroup>
								<MenuDivider />
								<MenuGroup title='Help'>
									<MenuItem>Docs</MenuItem>
									<MenuItem>FAQ</MenuItem>
								</MenuGroup>
							</MenuList>
						</Menu>
						<Tabs align='end' variant='enclosed' top='-18'>
							<TabList>
								<Tab>Jardineria</Tab>
								<Tab>Plantas electricas</Tab>
								<Tab>Visitas</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<p>Jardineria!</p>
								</TabPanel>
								<TabPanel>
									<p>Plantas electricas!</p>
								</TabPanel>
								<TabPanel>
									<p>Visitas!</p>
								</TabPanel>
							</TabPanels>
						</Tabs>
						<Card shadow='dark-lg' p='6' rounded='md' bg='white' width='1825px' height='700px' top='-6' right='200' left='-3' textAlign='left'>
							<CardBody>
								<FormControl isRequired>
									<Stack spacing='3'>
										<FormLabel>Motivo del problema</FormLabel>
										<Input focusBorderColor='black' variant='filled' placeholder='Ingrese el motivo de su ticket' />
										<Text fontSize='sm'> Descripcion del problema</Text>
										<Textarea focusBorderColor='black' variant='filled' ></Textarea>
									</Stack>
								</FormControl>
								<Button onClick={submit} width='150px' bottom='-370' right='-1575' colorScheme='teal' variant='solid'>Save</Button>
							</CardBody>
						</Card>
					</Grid>
				</CardHeader>
			</Card>
		</Grid>
	);
}
