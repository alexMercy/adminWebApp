import {Link, Outlet, useLocation} from "react-router-dom";
import {Col, ConfigProvider, Layout, Menu, Row, theme, FloatButton, Switch, Affix} from "antd";
import {getItem} from "../../utils/getMenuItem";
import {createContext, useContext, useState} from "react";
import {HomeFilled, ThunderboltFilled, ThunderboltOutlined} from "@ant-design/icons";

const {Header, Content, Footer} = Layout;

const themes = {
    light: {
        algorithm: {algorithm: theme.defaultAlgorithm},
        background: "white",
        status: "light",
    },
    dark: {
        algorithm: {algorithm: theme.darkAlgorithm},
        background: "#141414",
        status: "dark",
    }
};

const itemStyled = {
    fontWeight: 900,
    fontSize: 16,
}

const items = [
    getItem({label: <Link to="/"><HomeFilled style={{fontSize: 18}} /></Link>, key: "home"}),
    getItem({type: "divider"}),
    getItem({label:<Link to="/todos" style={itemStyled}>Todos</Link>, key: "todos"}),
    getItem({label: <Link to="/posts" style={itemStyled}>Posts</Link>, key: "posts"}),
    getItem({label: <Link to="/albums" style={itemStyled}>Albums</Link>, key: "albums"}),
]

export const CustomLayout = () => {
    const [currentTheme, setTheme] = useState(themes.dark);
    const ThemeProvider = createContext(currentTheme);

    const location = useLocation();
    const themeContext = useContext(ThemeProvider);

    const d = 230;

    return (
        <ConfigProvider  theme={themeContext.algorithm}>
            <Layout style={{transition: `all ${d}ms ease-in-out`,}}>
                <Header style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                    width: '100%',
                    padding:0,
                    background: `${themeContext.background}`,
                    marginBottom: 20,
                    transition: `all ${d}ms ease-in-out`,

                }}>
                    <Row>
                        <Col span={1}></Col>
                        <Col span={12}>
                            <Menu
                                style={{transition: `all ${d}ms ease-in-out`,}}
                                mode="horizontal"
                                defaultSelectedKeys={location.pathname.split("/")[1]}
                                items={items}/>
                        </Col>
                        <Col flex="auto"/>
                        <Col span={2} style={{display:"flex", justifyContent:"center", alignItems: "center"}}>
                            <ThemeProvider.Provider value={currentTheme}>
                                <Switch
                                    checkedChildren={<ThunderboltFilled />}
                                    unCheckedChildren={<ThunderboltOutlined/>}
                                    defaultChecked={currentTheme.status === themes.light.status}
                                    onChange={(checked) =>
                                        setTheme(checked? themes.light : themes.dark )}/>
                            </ThemeProvider.Provider>
                        </Col>
                    </Row>
                </Header>
                <Content >
                    <Outlet/>
                    <FloatButton.BackTop tooltip={<div>Back on top</div>}
                                         style={{height: 60, width:60, display: "flex",
                                             justifyContent: "center", alignItems: "center"}}/>
                </Content>
                <Affix offsetBottom={0}>
                    <Footer  style={{ textAlign: 'center', fontWeight: 700 }}>My first JS Project. Result in 6 days. by ALEX. ??2022. </Footer>
                </Affix>
            </Layout>
        </ConfigProvider>
    )
}