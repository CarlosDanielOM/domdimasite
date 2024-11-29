import { Component } from '@angular/core';
import { LinksService } from '../links.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-show-reserved-commands',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './show-reserved-commands.component.html',
  styleUrl: './show-reserved-commands.component.scss'
})
export class ShowReservedCommandsComponent {
  commands: any[] = []

  tableColumns = ['name', 'cmd', 'description', 'enabled', 'userlevelname']

  constructor(
    private linksService: LinksService,
  ) {
  }

  async ngOnInit() {
    let res = await fetch(`${this.linksService.getApiURL()}/config/commands/reserved`);
    let commands = await res.json();
    this.commands = commands.data.commands;
  }
  
}
