import { TextSectionInput } from './components/dialog/input/text-input.js';
import { Component } from './components/common/baseComponent.js';
import { TaskComponent } from './components/page/item/taskComponent.js';
import { NoteComponent } from './components/page/item/noteComponent.js';
import { VideoComponent } from './components/page/item/videoComponent.js';
import { ImageComponent } from './components/page/item/imageComponent.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';

type InputComponentConstructor<T = (MediaData | TextData) & Composable> = {
    new(): T;
}
class App {
    private readonly page: PageComponent;
    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);

        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'))
        this.page.addChild(new VideoComponent('Video Title', "https://youtu.be/Z8FT67j2iiE"))
        this.page.addChild(new NoteComponent('Note Title', 'Note Content'));
        this.page.addChild(new TaskComponent('Task Title', 'Task Content'));

        this.bindElementToDialog<MediaSectionInput>(
            '#new-image',
            MediaSectionInput,
            (input: MediaSectionInput) => new ImageComponent(input.title, input.url));
        this.bindElementToDialog<MediaSectionInput>(
            '#new-video',
            MediaSectionInput,
            (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
        );

        this.bindElementToDialog<TextSectionInput>(
            '#new-note',
            TextSectionInput,
            (input: TextSectionInput) => new NoteComponent(input.title, input.content)
        );

        this.bindElementToDialog<TextSectionInput>(
            '#new-todo',
            TextSectionInput,
            (input: TextSectionInput) => new TaskComponent(input.title, input.content)
        );
    }
    private bindElementToDialog<T extends (MediaData | TextData) & Component>(
        selector: string,
        InputComponent: InputComponentConstructor<T>,
        makeSection: (input: T) => Component
    ) {
        const element = document.querySelector(selector)! as HTMLButtonElement;
        element.addEventListener('click', () => {
            const dialog = new InputDialog();
            const input = new InputComponent();
            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);

            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            })
            dialog.setOnSubmitListener(() => {
                const image = makeSection(input);
                this.page.addChild(image);
                dialog.removeFrom(this.dialogRoot);
            })
        })
    }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);