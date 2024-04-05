import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Trigger } from '../trigger';

@Component({
  selector: 'app-manage-triggers',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './manage-triggers.component.html',
  styleUrl: './manage-triggers.component.scss'
})
export class ManageTriggersComponent {

  triggerList: Trigger[] = [{
    cooldown: 0,
    cost: 500,
    date: new Date(),
    _id: '5164asdas231das4fdasf',
    file: 'Chimuelo.mp3',
    mediaType: 'video/mp4',
    name: 'Chimuelo Meme',
    type: 'redemption'
  }];


  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
  ngOnInit() {
    this.getTriggerList();
  }

  getTriggerList() {
    // this.http.get('https://api.domdimabot.com/triggers/cdom201').subscribe((response: any) => {
    //   this.triggerList = response;
    //   console.log(this.triggerList);
    // });
  }
}
