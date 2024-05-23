import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private alertContainer: HTMLElement | undefined;

  constructor() { }

  setAlertContainer(container: HTMLElement) {
    console.log('Setting alert container')
    this.alertContainer = container;
  }

  createAlert(message: string, type: string) {
    if(true) return;
    let alert = document.createElement('div');
    let paragraph = document.createElement('p');
    alert.classList.add('alert');
    alert.classList.add(`alert-${type}`);
    paragraph.innerHTML = message;
    alert.appendChild(paragraph);
    if (this.alertContainer) this.alertContainer?.appendChild(alert);
    console.log('Creating alert')
    setTimeout(() => {
      alert.remove();
    }, 5000);
  }

}
