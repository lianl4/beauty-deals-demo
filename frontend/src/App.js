import React from 'react'
import { Grommet, Main, Header, Nav, Tabs, Tab, Box, Heading, Image, Select, TextInput, Button, Text, Footer } from 'grommet'
import { Mail, Phone, Github, HelpOption } from 'grommet-icons'


const theme = {
    "global": {
        "colors": {
            "background": {
                "light": "#ffffff",
                "dark": "#000000"
            }
        },
        "font": {
            "family": "-apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto, \n         Oxygen, \n         Ubuntu, \n         Cantarell, \n         \"Fira Sans\", \n         \"Droid Sans\",  \n         \"Helvetica Neue\", \n         Arial, sans-serif,  \n         \"Apple Color Emoji\", \n         \"Segoe UI Emoji\", \n         \"Segoe UI Symbol\""
        }
    },
    "button": {
        "extend": [
            null
        ]
    }
}
export default () => {

    return (
        <Grommet full theme={theme}>
            <Main fill="vertical" flex overflow="auto">
                <Header align="center" direction="row" justify="between" gap="medium" background={{"color":"control"}} pad="small" flex="grow" fill="horizontal" overflow="auto">
                    <Nav align="center" flex={false}>
                        <Tabs justify="center">
                            <Tab title="Home" />
                            <Tab title="New Deals" />
                            <Tab title="My Favorites" />
                            <Tab title="Others" />
                        </Tabs>
                    </Nav>
                    <Box align="center" justify="center" direction="row-responsive" gap="medium">
                        <Heading color="graph-0">
                            Beauty Deals
                        </Heading>
                        <Tab title="Log in" />
                    </Box>
                </Header>
                <Box align="center" justify="center" pad="xlarge" direction="column" fill="vertical" animation="fadeIn" background={{"color":"light-1"}}>
                    <Box align="center" justify="center" pad="small">
                        <Image src="https://images.vexels.com/media/users/3/205408/isolated/lists/eae6a941934e837cb58ef9d4d1f2549d-makeup-queen-badge.png" fit="contain" />
                    </Box>
                    <Box align="center" justify="center" direction="row" pad="medium" gap="medium">
                        <Select options={["option 1","option 2"]} name="Brand" placeholder="Brand" />
                        <Select options={["option 1","option 2"]} placeholder="Category" />
                        <TextInput placeholder="what deal are you looking for?" size="medium" />
                        <Button label="Search" />
                    </Box>
                    <Box align="center" justify="center" direction="row" gap="medium">
                        <Text size="large" weight="normal">
                            Find a good deal? You can
                        </Text>
                        <Button label="Upload new deal!" />
                    </Box>
                </Box>
                <Footer align="center" direction="column" flex={false} justify="center" gap="medium" background={{"color":"brand"}} pad="medium">
                    <Heading textAlign="center" size="small" level="2">
                        Made by V-Puppies
                    </Heading>
                    <Box align="center" justify="between" direction="row" pad="small" gap="large">
                        <Mail  />
                        <Phone  />
                        <Github  />
                        <HelpOption  />
                    </Box>
                </Footer>
            </Main>
        </Grommet>
    )
}
