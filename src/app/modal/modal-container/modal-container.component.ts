import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {IkBs3ModalService} from "../modal.service";
import {IkBs3ModalComponent} from "../modal/modal.component";
import {IModalObject} from "../modal-object";

@Component({
  selector: 'ik-bs3-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})

export class IkBs3ModalContainerComponent {
  @ViewChild("modalContainer", {read: ViewContainerRef}) modalContainer: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private modalService: IkBs3ModalService) {
    this.modalService.modalOpen.subscribe((compObject) => {
      this.addModal(compObject);
    });
    /*TODO скрывать модальные окна при роутинге*/
  }

  addModal(config: IModalObject) {
    let factory = this.componentFactoryResolver.resolveComponentFactory(IkBs3ModalComponent);
    let viewContainerRef = this.modalContainer;
    let ngxModalComponentRef = viewContainerRef.createComponent(factory);
    let ngxModalComponentInstance = <IkBs3ModalComponent>ngxModalComponentRef.instance;
    let subscriptions = [];

    let closeModal = () => {
      ngxModalComponentRef.destroy();
      subscriptions.forEach(subs => subs.unsubscribe());
    };

    if (config.externalClose) {
      subscriptions.push(config.externalClose.subscribe(() => {
        closeModal();
        config.externalClose.complete();
      }));
    }

    ngxModalComponentInstance.component = config.component;
    ngxModalComponentInstance.inputs = config.inputs;

    subscriptions.push(ngxModalComponentInstance.close.subscribe(res => {
      closeModal();
      config.resolve(res);
    }));

    subscriptions.push(ngxModalComponentInstance.dismiss.subscribe(res => {
      closeModal();
      config.reject(res);
    }));
  }
}
