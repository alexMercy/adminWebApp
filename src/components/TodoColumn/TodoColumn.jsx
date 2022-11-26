import {Col, Typography} from "antd";
import {Droppable} from "react-beautiful-dnd";
import React from "react";
import {TodoItem} from "../TodoItem/TodoItem";


export const TodoColumn = ({data, droppableId}) => {
    return (
        <>
        <Col span={4}>
            <Typography.Title  level={3}>{data.title}</Typography.Title>
            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <div ref={provided.innerRef}{...provided.droppableProps} className="droppable-col">
                        {data.items.map((item, index)=> (
                            <TodoItem key={item.id} item={item} index={index}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Col>
        <Col span={1}/>
        </>
        );
}