import {DragDropContext} from "react-beautiful-dnd";
import {Col, Row} from "antd";
import _ from "lodash";
import {TodoColumn} from "../TodoColumn/TodoColumn";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {selectorsTodo} from "../../store/todo";

function filterItems(itemIds, items) {

    const filteredItems = {
        completed: [],
        inProgress: []
    }
    itemIds.map(itemId =>
    {
        items[itemId].completed
            ? filteredItems.completed.push(items[itemId])
            : filteredItems.inProgress.push(items[itemId])
    })
    return filteredItems;
}


export const TodoColumns = () => {

    const itemIds = useSelector(selectorsTodo.selectIds);
    const items = useSelector(selectorsTodo.selectEntities);

    const [columns, setColumns] = useState({
        inProgress: {
            title: "in Progress",
            items: []
        },
        completed: {
            title: "Completed",
            items: []
        }
    });

    useEffect(() => {
        const filteredItems = filterItems(itemIds, items);
        setColumns(prevState => {
            prevState = {...prevState};
            prevState.completed.items.push(...filteredItems.completed);
            prevState.inProgress.items.push(...filteredItems.inProgress);
            return prevState;
        });
    }, []);

    const onDragEnd = ({destination, source}) => {

        if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId))
            return;

        const itemCopy = {...columns[source.droppableId].items[source.index]};

        setColumns(prevState => {
            prevState = {...prevState};
            prevState[source.droppableId].items.splice(source.index, 1);
            prevState[destination.droppableId].items.splice(destination.index, 0, itemCopy);
            return prevState;
        })
    };


    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Row>
                    <Col span={5}/>
                    <>
                        {_.map(columns, (data, key) => (
                            <TodoColumn key={key} data={data} droppableId={key}/>
                        ))}
                    </>
                </Row>
            </DragDropContext>
        </div>
    );
}