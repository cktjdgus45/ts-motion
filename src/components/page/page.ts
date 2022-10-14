import { Component, BaseComponent } from '../common/baseComponent.js';

export interface Composable {
    addChild(child: Component): void;
}

interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: OnCloseListener): void;
    setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
}

type SectionContainerConstructor = {
    new(): SectionContainer;
};

type DragState = 'start' | 'stop' | 'enter' | 'leave';
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

type OnCloseListener = () => void;

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super(`<ul class="page"></ul>`);
        this.element.addEventListener('dragover', (event: DragEvent) => {
            this.onDragOver(event);
        })
        this.element.addEventListener('drop', (event: DragEvent) => {
            this.onDrop(event);
        })
    }
    addChild(section: Component): void {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend')
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
        item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
            console.log(target);
            console.log(state);
        })
    }
    onDragOver(event: DragEvent) {
        event.preventDefault();
    }
    onDrop(event: DragEvent) {
        event.preventDefault();
    }

}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener?: OnCloseListener;
    private dragStateListener?: OnDragStateListener<PageItemComponent>;
    constructor() {
        super(`<li draggable="true" class="page-item">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                    <button class="close">&times</button>
                </div>
            </li>`);
        const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
        this.element.addEventListener('dragstart', (_: DragEvent) => {
            this.notifyDragObservers('start');
        })
        this.element.addEventListener('dragend', (_: DragEvent) => {
            this.notifyDragObservers('stop');
        })
        this.element.addEventListener('dragenter', (_: DragEvent) => {
            this.notifyDragObservers('enter');
        })
        this.element.addEventListener('dragleave', (_: DragEvent) => {
            this.notifyDragObservers('leave');
        })
    }
    notifyDragObservers(state: DragState) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
    setOnCloseListener(listener: OnCloseListener) {
        this.closeListener = listener;
    }
    setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
        this.dragStateListener = listener;
    }

    addChild(child: Component): void {
        const container = this.element.querySelector('.page-item__body')! as HTMLElement;
        child.attachTo(container, 'afterbegin');
    }

    onDragStart(_: DragEvent) {
    }
    onDragEnd(_: DragEvent) {
    }
    onDragEnter(_: DragEvent) {
    }
    onDragLeave(_: DragEvent) {
    }
}