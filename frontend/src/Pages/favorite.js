import React, { Component } from "react";
import {
    DataTable,
    Text,
    Image,
    Box,
    Grommet,
    Main,
    Card,
    CardBody,
    CardHeader
  } from "grommet";
import {getFavorite,getProductById} from "../util/API";
import ProductCell from "../Components/productCell";
import { theme } from "../Constants";

function AddData(props){
  const columns = [
    
    {
        property: 'dealDescription',
        header: <Text>Deal Description</Text>,
        render: data => (
            <Text size="medium">{data.dealDescription}
            </Text>
        )
    },
    {
        property: 'seller',
        header: <Text>Seller</Text>,
        render: data => (
            <Text size="medium">{data.seller}
            </Text>
        )
    },
    {
        property: 'discountPrice',
        header: <Text>Discount Price</Text>,
        render: data => (
            <Text size="medium">{data.discountPrice}
            </Text>
        )
    },
    {
        property: 'discount',
        header: <Text>Discount</Text>,
        render: data => (
            <Text size="medium">{data.discount}
            </Text>
        )
    },
    {
        property: 'startDate',
        header: <Text>Start Date</Text>,
        render: data => (
            <Text size="medium">{data.startDate}
            </Text>
        )
    },
    {
        property: 'expireDate',
        header: <Text>Expire Date</Text>,
        render: data => (
            <Text size="medium">{data.expireDate}
            </Text>
        )
    },
  ];
  return(

    <DataTable
          columns={columns}
          data={props.datas}
          gap = "large"
      >
    </DataTable>

  )
}
function AddProduct(props){
  const columns = [
  /*{
      property: 'name',
      header: <Text>Name</Text>,
      primary: true,
      render: data => (
          <ProductCell
              product={data}
          />
      )
  },*/
  {
    property: 'name',
    header: <Text>Product</Text>,
    render: data => (
      <Text size="medium">{data}
      </Text>
    ),
    size: "medium",
},
    
  ];
  return(

    <DataTable
          columns={columns}
          data={props.productName}
          gap = "large"
      >
    </DataTable>

  )
}
function loadingProduct(data){
  const productName = ["lalala"];
  data.forEach(
  deal=>{
        getProductById(deal.productDescription)
          .then(response => {
            // productName.push(response.data.name)
            productName.push((response.data.name).toString())
      })
     
    });

  return productName;
}
class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productDescription: []
        }
    }

    componentDidMount() {
        const userId = this.props.currentUser.username;
       //  const data = this.state.products.content;
        getFavorite(userId)
            .then(response => {
                this.setState({
                    products: response.data,
                });
        });

        
    }
    render() {
      if(this.state.products.content){
      const data = this.state.products.content;
      const datas = []
      this.state.products.content.forEach(
        deal=>{datas.push(deal.deals[0])
      
          })
      
      console.log(loadingProduct(data).length)

      // loadingProduct(data).forEach(n=>console.log(n));
      /// console.log(datas[0])
        return (
            <Grommet full theme={theme}>
                <Main fill="vertical" flex="grow" overflow="auto">
                <Box align="center" justify="start" pad="xlarge" height="large">
                <Card>
                            <CardHeader pad="medium" align = 'center' justify="center" background="light-2">
                              <h2>Favorite Deals</h2></CardHeader>
                   <CardBody pad="medium" direction="column" align="stretch" gap="large" overflow = "scroll">
                   <Box align="center" justify="start" height="large" direction = "row">
                   
                    <AddProduct productName = {loadingProduct(data)}/>
                  
                    </Box>
                    </CardBody>
                    </Card>
                  </Box>
                </Main>
            </Grommet>
        )}
        else{
          return (
            <Grommet full theme={theme}>
            <Main fill="vertical" flex="grow" overflow="auto">
                <Box align="center" justify="start" pad="xlarge" height="large">
                    You have no favorite deals!
                </Box>
            </Main>
        </Grommet>
          )
        }
    }
}
export default Favorites;