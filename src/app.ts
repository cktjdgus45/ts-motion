import { NoteComponent } from './components/page/item/noteComponent.js';
import { VideoComponent } from './components/page/item/videoComponent.js';
import { ImageComponent } from './components/page/item/imageComponent.js';
import { PageComponent, PageItemComponent } from './components/page/page.js';

class App {
    private readonly page: PageComponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);

        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'))
        this.page.addChild(new VideoComponent('Video Title', "https://youtu.be/Z8FT67j2iiE"))
        this.page.addChild(new NoteComponent('Note Title', 'Note Content'));
    }
}

new App(document.querySelector('.document')! as HTMLElement);