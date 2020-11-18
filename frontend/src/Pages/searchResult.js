import React, { useContext } from "react";
import {
    Button,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
    Image,
    Box,
    Grommet, Main, Nav, Tabs, Tab, TextInput,
    ResponsiveContext,
    Anchor,
    Header,
  } from "grommet";
import { AddCircle, Favorite,Login,Home } from "grommet-icons";
import { useHistory } from 'react-router-dom'



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
const SearchResult = () => {
  const history= useHistory();
  const responsive = useContext(ResponsiveContext);
  return (
    <Grommet full theme={theme}>
      <Main fill="vertical" flex="grow" overflow="auto">
      <Header align="center" direction="row" justify="between" gap="small" color = "text-strong"  background={{"color":"text-strong"}} pad={{"horizontal":"xsmall","vertical":"medium"}} flex="grow" fill="horizontal" overflow="auto">
          <Nav align="center" flex={false} justify="end">
          <Box align="end" justify="center" direction="row" gap="medium" alignSelf="end">
            <Anchor label="Home" icon={<Home />} size="medium"
            onClick={()=> history.push("/") } />
            <Anchor label="Favorite" icon={<Favorite />} size="medium" />
            <Anchor label="Sign In/Up" icon={<Login />} size="medium" 
            onClick={()=> history.push("/signup") }/>
          </Box>
          </Nav>
          <Box align="baseline" justify="between" direction="row" gap="xsmall">
            <TextInput placeholder="Find an Item?" />
            <Button label="Search" onClick={()=> history.push("/search-result")}/>
          </Box>
        </Header>
    <Box align="center" justify="start" pad="xlarge" height="large">
      <Table size ="large" >
        <TableHeader>
          <TableRow>
          {responsive !== "small" ? (
              <TableCell scope="col" border="bottom"></TableCell>
            ) : null}
            <TableCell scope="col" border="bottom" size = "small">
              Name
            </TableCell>
            <TableCell scope="col" border="bottom" size = "small">
              Price
            </TableCell>
            <TableCell scope="col" border="bottom" size = "small">
              Seller
            </TableCell>
            <TableCell scope="col" border="bottom" size = "small">
              data
            </TableCell>
            <TableCell scope="col" border="bottom" size = "xsmall">
              Approve
            </TableCell>
            <TableCell scope="col" border="bottom" size = "xsmall">
              Like
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow >
              {responsive !== "small" ? (
                <TableCell>
                  <Image src={"https://i.ibb.co/ZYW3VTp/brown-brim.png"} style={{ width: "4rem" }}></Image>
                </TableCell>
              ) : null}
              <TableCell scope="row">hat</TableCell>
              <TableCell>$12</TableCell>
              <TableCell>Macy's</TableCell>
              <TableCell>11/11/2019</TableCell>
              <TableCell flex direction="row" align="start" size = "xsmall">
                  <Button
                    icon={<AddCircle />}
                    style={{
                      padding: responsive === "small" ? "0.2rem" : "0.4rem"
                    }}
                    // onClick={() => removeItemFromCart(item.id)}
                  />
            </TableCell>
            <TableCell flex direction="row" align="start" size = "xsmall">
                <Button
                  size="small"
                  style={{
                    padding: responsive === "small" ? "0.2rem" : "0.4rem"
                  }}
                  icon={<Favorite />}
                  // onClick={() => addItemToCart(item)}
                />
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Box>
      </Main>
    </Grommet>
  )
}
export default SearchResult;