import {Card} from "antd";
import {Draggable} from "react-beautiful-dnd";
import React from "react";

export const TodoItem = ({item, index}) => {
    return(
        <Draggable index={index} draggableId={item.id + ''}>
            {(provided) => (
                <div ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                    <Card bordered={false}
                          style={{width: 900, marginBottom: 20, fontSize:14}}
                          hoverable="true">
                        {item.title}
                    </Card>
                </div>)}
        </Draggable>
    );
}