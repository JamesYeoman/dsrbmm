import type { DraggableProvided } from 'react-beautiful-dnd';

import classNames from 'classnames';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { selectMod } from '../redux/slices/mods';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { getStyle } from '../utils/util';

const toProps = ({ innerRef, draggableProps, dragHandleProps }: DraggableProvided) => {
  return { ref: innerRef, ...draggableProps, ...dragHandleProps };
};

export default function ModList() {
  const dispatch = useAppDispatch();
  const mods = useAppSelector((state) => state.mods.list);
  const loading = useAppSelector((state) => state.mods.loading);
  const loadErr = useAppSelector((state) => state.mods.loadErr);
  const isSelected = useAppSelector((state) => state.mods.selected);

  return (
    <React.Fragment>
      {loading || loadErr ? (
        <div>{loadErr ? `Error: ${loadErr}` : 'Loading...'}</div>
      ) : (
        mods.map(({ id, content }, index) => {
          const selected = isSelected === id;
          return (
            <Draggable key={id} draggableId={id} index={index}>
              {(provided, snapshot) => (
                <div
                  {...toProps(provided)}
                  id={id}
                  tabIndex={1}
                  onDoubleClick={() => dispatch(selectMod(id))}
                  className={classNames('modCard', { selected })}
                  style={getStyle(snapshot, provided.draggableProps.style)}
                >
                  {content}
                </div>
              )}
            </Draggable>
          );
        })
      )}
    </React.Fragment>
  );
}
