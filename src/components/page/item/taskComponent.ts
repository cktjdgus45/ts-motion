import { BaseComponent } from './../../common/baseComponent.js';

export class TaskComponent extends BaseComponent<HTMLElement>{
    constructor(title: string, content: string) {
        super(`<section class="note">
                <h2 class="page-item__title task__title"></h2>  
                <p class="task__body"></p>
            </section>`)
        const titleElement = this.element.querySelector('.task__title')! as HTMLHeadingElement;
        titleElement.textContent = title;

        const contentElement = this.element.querySelector('.task__body')! as HTMLParagraphElement;
        contentElement.textContent = content;
    }
}