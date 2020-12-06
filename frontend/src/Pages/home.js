import React, { Component } from 'react';
import { Grommet, Main, Box, Button, Heading, Select, Anchor, Footer } from 'grommet'
import { Mail, Github } from 'grommet-icons'
import { BRANDS, CATEGORIES} from "../Constants";
import { theme } from "../Constants";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brand: "",
            category: "",
        }
    }

    render() {
        return (
            <Grommet full theme={theme}>
                <Main fill="vertical" flex overflow="auto" background={{"image":"url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604821225760&di=c57ddf7d55a8520e1639ffbe20d94404&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fbackgd%2Fcover%2F00%2F42%2F81%2F5bef61b9a676f.jpg%2521%2Ffw%2F780%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue')"}}>

                    <Box align="center" justify="center" pad="xlarge" direction="column" fill="vertical" animation="fadeIn" background={{"color":"text-strong","dark":false,"image":"url('')","opacity":"weak"}}>
                        <Box align="center" justify="center" pad="small">
                            <Heading level="1" size="large" textAlign="center" truncate={false} color="background-front">
                                Beauty Deals
                            </Heading>
                        </Box>
                        <Box align="start" justify="start" direction="row" pad="medium" gap="xsmall" background={{"opacity":"strong","color":"active-text"}}>
                            <Select
                                options={BRANDS}
                                name="Brand"
                                placeholder="Brand"
                                onChange={({ option }) => this.setState({brand: option})}
                            />
                            <Select
                                options={CATEGORIES}
                                name="Category"
                                placeholder="Category"
                                onChange={({ option }) =>this.setState({category: option})}
                            />
                            <Button
                                label="Search"
                                color="status-warning"
                                plain={false}
                                size="large"
                                onClick={
                                    ()=> {
                                        this.props.history.push({
                                            pathname: `/brand:${this.state.brand}:category:${this.state.category}`,
                                            data: {
                                                brand: this.state.brand,
                                                category: this.state.category,
                                            }
                                        });
                                    }
                                }/>
                        </Box>
                    </Box>
                    <Footer
                        align="center"
                        direction="row"
                        lex={false}
                        justify="center"
                        gap="large"
                        background={{"image":"url('')","opacity":"strong","color":"active-text"}}
                        pad="xsmall">
                        <Heading
                            textAlign="center"
                            size="small"
                            level="3"
                            color="active-text">
                            Made by V-Puppies
                        </Heading>
                        <Box
                            align="center"
                            justify="between"
                            direction="row"
                            pad="small"
                            gap="large">
                            <Anchor href="mailto:lianl4@uci.edu">
                                <Mail size="medium"/>
                            </Anchor>
                            <Anchor href="https://github.com/beauty-deals/beauty-deals-demo">
                                <Github size="medium" />
                            </Anchor>
                        </Box>
                    </Footer>
                </Main>
            </Grommet>
        )
    }
}
export default HomePage;
