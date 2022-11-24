import {Link, Outlet, useLocation} from "react-router-dom";
import {Col, ConfigProvider, Layout, Menu, Row, theme, FloatButton, Switch} from "antd";
import {getItem} from "../../utils/getMenuItem";
import {createContext, useContext, useState} from "react";
import {BulbOutlined, BulbTwoTone} from "@ant-design/icons";

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


const items = [
    getItem({label:<Link to="/todos">Todos</Link>, key: "todos"}),
    getItem({label: <Link to="/posts">Posts</Link>, key: "posts"}),
    getItem({label: <Link to="/albums">Albums</Link>, key: "albums"}),
]

export const CustomLayout = () => {
    const [currentTheme, setTheme] = useState(themes.light);
    const ThemeProvider = createContext(currentTheme);

    const location = useLocation();
    const themeContext = useContext(ThemeProvider);

    return (

        <ConfigProvider theme={themeContext.algorithm}>
            <Layout>
                <Header style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    padding:0,
                    // background: "white",
                    background: `${themeContext.background}`,
                    marginBottom: 20
                }}>
                    <Row>
                        <Col span={2}/>
                        <Col flex="auto">
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={location.pathname.split("/")[1]}
                                items={items}/>
                        </Col>
                        <Col span={2} style={{display:"flex", justifyContent:"center", alignItems: "center"}}>
                            <ThemeProvider.Provider value={currentTheme}>
                                <Switch
                                    checkedChildren={<BulbTwoTone />}
                                    unCheckedChildren={<BulbOutlined />}
                                    defaultChecked={currentTheme.status === themes.light.status}
                                    onChange={(checked) =>
                                        setTheme(checked? themes.light : themes.dark )}/>
                            </ThemeProvider.Provider>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    <Outlet/>
                    <FloatButton.BackTop tooltip={<div>Back on top</div>} style={{height: 60, width:60, display: "flex", justifyContent: "center", alignItems: "center"}}/>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Task project. Created by ALEX. ©2022 </Footer>
            </Layout>
        </ConfigProvider>
    )
}