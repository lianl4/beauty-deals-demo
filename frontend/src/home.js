import React from 'react'
import { Link, useHistory } from "react-router-dom";
import { Grommet, Main, Header, Nav, Tabs, Tab, Box, Button, Heading, Select, TextInput, Footer } from 'grommet'
import { Home, Favorite, UploadOption, Mail, Phone, Github, HelpOption } from 'grommet-icons'
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

 const HomePage= () => {
 const history = useHistory();  
  return (
    <Grommet full theme={theme}>
      <Main fill="vertical" flex overflow="auto" background={{"image":"url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604821225760&di=c57ddf7d55a8520e1639ffbe20d94404&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fbackgd%2Fcover%2F00%2F42%2F81%2F5bef61b9a676f.jpg%2521%2Ffw%2F780%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue')"}}>
        <Header align="center" direction="row" justify="between" gap="small" background={{"image":"url('')","opacity":"strong","color":"active-text"}} pad={{"horizontal":"xsmall","vertical":"medium"}} flex="grow" fill="horizontal" overflow="auto">
          <Nav align="center" flex={false} justify="end">
            <Tabs justify="center">
              <Tab title="Home" icon={<Home />}/>
              <Tab title="My favorites" icon={<Favorite />} />
              <Tab title="Sign In/Up" />
            </Tabs>
          </Nav>
          <Box align="center" justify="center">
            <Tab title="Upload New Deals" icon={<UploadOption />} />  

          </Box>
        </Header>
        <Box align="center" justify="center" pad="xlarge" direction="column" fill="vertical" animation="fadeIn" background={{"color":"text-strong","dark":false,"image":"url('')","opacity":"weak"}}>
          <Box align="center" justify="center" pad="small">
            <Heading level="1" size="large" textAlign="center" truncate={false} color="background-front">
              Beauty Deals
            </Heading>
          </Box>
          <Box align="start" justify="start" direction="row" pad="medium" gap="xsmall" background={{"opacity":"medium","color":"active-text"}}>
            <Select options={["option1","option2"]} name="Brand" placeholder="Brand" closeOnChange={false} size="medium" />
            <Select options={["option1","option2"]} placeholder="Category" />
            <TextInput placeholder="What deals are you looking for?" size="medium" />
            <Button label="Search" color="status-warning" plain={false} size="large" 
            onClick={()=> history.push("/search-result") }/>
          </Box>
        </Box>
        <Footer align="center" direction="row" flex={false} justify="center" gap="large" background={{"image":"url('')","opacity":"strong","color":"active-text"}} pad="xsmall">
          <Heading textAlign="center" size="small" level="3">
            Made by V-Puppies  
          </Heading>
          <Box align="center" justify="between" direction="row" pad="small" gap="large">
            <Mail size="medium" />
            <Phone size="medium" />
            <Github size="medium" />
            <HelpOption size="medium" />
          </Box>
        </Footer>
      </Main>
    </Grommet>
  )
}
export default HomePage;