import {Card, Tag} from "antd";
import {Draggable} from "react-beautiful-dnd";
import React from "react";

export const TodoItem = ({item, index}) => {
    return(
        <Draggable index={index} draggableId={item.id + ''}>
            {(provided) => (
                <div ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                    <Card title={item.completed
                            ? <Tag color={"lime"}>COMPLETED</Tag>
                            : <Tag color={"volcano"}>IN PROGRESS</Tag>}
                          type={"inner"}
                          bordered={false}
                          style={{maxWidth: 300, height: 200, marginBottom: 20, fontSize:14}}
                          hoverable="true">
                        {item.title}
                    </Card>
                </div>)}
        </Draggable>
    );
}