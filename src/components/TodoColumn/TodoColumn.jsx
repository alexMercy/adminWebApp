import {Card, Typography} from "antd";
import {Draggable, Droppable} from "react-beautiful-dnd";
import React from "react";
import {TodoItem} from "../TodoItem/TodoItem";

export const TodoColumn = ({column}) => {
    return (
        <div className={"column"}>
            <Typography.Title level={3}>{column.title}</Typography.Title>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div ref={provided.innerRef}{...provided.droppableProps} className="droppable-col">
                        {column.items.map((item, index)=> (
                            <TodoItem key={item.id} item={item} index={index}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>);
}