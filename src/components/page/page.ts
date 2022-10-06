import { BaseComponent } from './../common/baseComponent';
import { Component } from '../common/baseComponent';

export interface Composable {
    addChild(child: Component): void;
}

interface SectionContainer extends Component, Composable {
}

type SectionContainerConstructor = {
    new(): SectionContainer;
};

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super(`<ul class="page"></ul>`);
    }
    addChild(section: Component): void {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend')
    }
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    constructor() {
        super(`<li class="page-item">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                    <button class="close">&times</button>
                </div>
            </li>`);
    }

    addChild(child: Component): void {
        const container = this.element.querySelector('.page-item__body')! as HTMLElement;
        child.attachTo(container, 'afterbegin');
    }
}