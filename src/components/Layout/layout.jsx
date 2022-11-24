import {Link, Outlet, useLocation} from "react-router-dom";
import {Col, ConfigProvider, Layout, Menu, Row, theme, FloatButton } from "antd";
import {getItem} from "../../utils/getMenuItem";
const {Header, Content, Footer} = Layout;


const items = [
    getItem({label:<Link to="/todos">Todos</Link>, key: "todos"}),
    getItem({label: <Link to="/posts">Posts</Link>, key: "posts"}),
    getItem({label: <Link to="/albums">Albums</Link>, key: "albums"}),
]

export const CustomLayout = () => {
    const location = useLocation();

    return (
        <ConfigProvider theme={{algorithm: theme.defaultAlgorithm}}>
            <Layout>
                <Header style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    padding:0,
                    background: "white",
                    // background: "#141414",
                    marginBottom: 20
                }}>
                    <Row>
                        <Col span={2}></Col>
                        <Col flex="auto">
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={location.pathname.split("/")[1]}
                                items={items}/>
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