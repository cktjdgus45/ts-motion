import { ImageComponent } from './components/page/item/imageComponent.js';
import { PageComponent, PageItemComponent } from './components/page/page.js';

class App {
    private readonly page: PageComponent;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot);

        this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'))
    }
}

new App(document.querySelector('.document')! as HTMLElement);