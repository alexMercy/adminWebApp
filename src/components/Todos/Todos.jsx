import {useSelector} from "react-redux";
import {selectorsTodo} from "../../store/todo";
import {Card, Space, Tag} from "antd";

export const Todos = ({todoId}) => {
    const todo = useSelector(state => selectorsTodo.selectById(state, todoId));





    if (!todo) return;

    return (<Card
        bordered={false}
        style={{width: 900, marginBottom: 20, fontSize:14}}
        hoverable="true"
    >
        <Space>

        {todo.completed ? <Tag color="lime"> COMPLETED </Tag>  : <Tag color="volcano"> NOT COMPLETED </Tag>}
        {todo.title}
        </Space>
        </Card>);
}
