import { Component } from '@angular/core';
import { LinksService } from '../links.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-reserved-commands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-reserved-commands.component.html',
  styleUrl: './show-reserved-commands.component.scss'
})
export class ShowReservedCommandsComponent {
  commands: any[] = []

  constructor(
    private linksService: LinksService,
  ) {
  }

  async ngOnInit() {
    let res = await fetch(`${this.linksService.getApiURL()}/commands/reserved`);
    let commands = await res.json();
    this.commands = commands.commands;
  }
  
}
