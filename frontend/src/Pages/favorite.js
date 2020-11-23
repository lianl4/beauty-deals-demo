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
const Favorite = () => {
  const history= useHistory();
  const responsive = useContext(ResponsiveContext);
  return (
    <Grommet full theme={theme}>
      <Main fill="vertical" flex="grow" overflow="auto">
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
              date
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
            </TableRow>
        </TableBody>
      </Table>
    </Box>
      </Main>
    </Grommet>
  )
}
export default Favorite;