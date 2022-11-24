import {Link, Outlet, useLocation} from "react-router-dom";
import {Col, ConfigProvider, Layout, Menu, Row, theme} from "antd";
const {Header, Content, Footer} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem(<Link to="/todos">Todos</Link>,"todos"),
    getItem(<Link to="/posts">Posts</Link>,"posts"),
    getItem(<Link to="/albums">Albums</Link>,"albums"),
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
                </Content>
                <Footer style={{ textAlign: 'center' }}>Task project. Created by ALEX. ©2022 </Footer>
            </Layout>
        </ConfigProvider>
    )
}