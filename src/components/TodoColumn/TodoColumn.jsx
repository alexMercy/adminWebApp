import {Col, Typography} from "antd";
import {Droppable} from "react-beautiful-dnd";
import React from "react";
import {TodoItem} from "../TodoItem/TodoItem";
import styles from "./styles.module.css";


export const TodoColumn = ({data, droppableId, onDeleteClick}) => {
    return (
        <>
        <Col  span={4}>

            <Typography.Title  style={{fontWeight: 900}} level={3}>{data.title}</Typography.Title>
            <Droppable droppableId={droppableId}>
                {(provided) => (
                    <div ref={provided.innerRef}{...provided.droppableProps} className={styles.droppableCol}>
                        <div style={{background: `${droppableId === "inProgress" ? "#d3380d" : "#93da43"}`}}
                             className={styles.line}></div>
                        {data.items.map((item, index)=> (
                            <TodoItem key={item.id} droppableId={droppableId}
                                      item={item} index={index} onDeleteClick={onDeleteClick}/>
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