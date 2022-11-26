import {Button, Card, Typography, Tag} from "antd";
import {Draggable} from "react-beautiful-dnd";
import React, {useState} from "react";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectorIsTodoSuccess, updateTodo} from "../../store/todo";


const {Paragraph} = Typography;

export const TodoItem = ({item, index, onDeleteClick, droppableId}) => {

    const dispatch = useDispatch();

    const isTodoSuccess = useSelector(selectorIsTodoSuccess);

    const [text, setText] = useState(item.title);

    const onChangeText = (input) => {

        if (input === item.title) return;

        const itemCopy = {...item};
        itemCopy.title = input;
        dispatch(updateTodo(itemCopy));

        if (isTodoSuccess) setText(input);
    }
    return(
        <Draggable index={index} draggableId={item.id + ''}>
            {(provided) => (
                <div ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                    <Card title={item.completed
                            ? <Tag color={"lime"}>COMPLETED</Tag>
                            : <Tag color={"volcano"}>IN PROGRESS</Tag>}
                          type={"inner"}
                          bordered={false}
                          style={{marginLeft: "10%", maxWidth: 300, minHeight: 200, marginBottom: 20, fontSize:14}}
                          hoverable="true"

                          extra={<Button onClick={() => onDeleteClick(item,droppableId, index)}
                                         size={"small"}
                                         danger
                                         type={"text"}
                                         icon={<DeleteFilled />}
                          />}>

                            <Paragraph
                                editable={{
                                    icon: <EditFilled />,
                                    tooltip: 'Edit',
                                    onChange: onChangeText,
                                    triggerType: ["icon", "text"],

                                }}
                                style={{fontWeight: 500}}
                            >
                                {text}
                            </Paragraph>

                    </Card>
                </div>)}
        </Draggable>
    );
}

