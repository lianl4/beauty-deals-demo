import React, { useContext } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
    Image,
    Box,
    Grommet, Main,
    ResponsiveContext,
  } from "grommet";
import { theme } from "../Constants";

const Favorite = () => {
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