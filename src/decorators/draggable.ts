import { Hoverable, Droppable } from './../components/common/type';
import { Component } from '../components/common/baseComponent';
import { Draggable } from '../components/common/type';

type GConstructor<T= {}> = new (...args:any[])=>T;
type DraggableClass = GConstructor<Component&Draggable>;

export function EnableDragging<TBase extends DraggableClass>(Base:TBase){
    return class DraggableItem extends Base {
        constructor(...args:any[]){
            super(...args);
        
        }
    }
}

type DragHoverClass = GConstructor<Component&Hoverable>;

export function EnableHover<TBase extends DragHoverClass>(Base:TBase){
    return class DragHoverArea extends Base{
        constructor(...args:any[]){
            super(...args);
            
        }
    }
}

type DropTargetClass = GConstructor<Component & Droppable>;

export function EnableDrop<TBase extends DropTargetClass>(Base:TBase){
    return class DropArea extends Base{
        constructor(...args:any[]){
            super(...args);
            
        }
    }
}