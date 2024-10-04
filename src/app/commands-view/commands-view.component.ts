import { Component, ElementRef, Renderer2, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SideNavbarComponent } from '../side-navbar/side-navbar.component';
import { CommandsService } from '../commands.service';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Command } from '../command';

@Component({
  selector: 'app-commands-view',
  standalone: true,
  imports: [NavbarComponent, SideNavbarComponent, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './commands-view.component.html',
  styleUrl: './commands-view.component.scss'
})

export class CommandsViewComponent {
  @Input() toggle: any;

  commands: Command[] = [];
  page: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  userLevelNames: string[] = ['everyone', 'tier1', 'tier2', 'tier3', 'vip', 'founder', 'moderator', 'editor', 'admin', 'broadcaster'];
  userLevels: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  commandForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    cmd: new FormControl(''),
    func: new FormControl(''),
    message: new FormControl(''),
    reserved: new FormControl(false),
    cooldown: new FormControl(10),
    description: new FormControl(''),
    userLevel: new FormControl(1),
    userLevelName: new FormControl('everyone'),
    channelID: new FormControl(''),
    channel: new FormControl('')
  });

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private commandsService: CommandsService,
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  activeNav: boolean = true;
  showForm: boolean = false;

  ngOnInit() {
    this.pageSize = parseInt(window.localStorage.getItem('pageSize') || '5');
    
    this.activeRoute.queryParamMap.subscribe((params: any) => {
      this.page = parseInt(params.get('page')) || 1;
      this.pageSize = parseInt(params.get('pageSize')) || this.pageSize;
    });
    
    this.commandsService.getChannelCommands(this.userService.getId()).subscribe((data: any) => {
      this.commands = data.commands;
      this.totalPages = Math.ceil(data.total / this.pageSize);
      console.log({total: data.total, totalPages: this.totalPages, pageSize: this.pageSize, page: this.page})
    });

  }
  
  changeSideNavSize() {
    let navbar = this.el.nativeElement.querySelector('side-navbar-container');
    this.activeNav = !this.activeNav;

    if (this.activeNav) {
      this.renderer.setStyle(navbar, 'width', '250px');
    } else {
      this.renderer.setStyle(navbar, 'width', '50px');
    }
    
  }

  changePageSize(event: any) {
    this.pageSize = parseInt(event.target.value);
    this.totalPages = Math.ceil(this.commands.length / this.pageSize);
    this.page = 1;
    this.router.navigate([], { queryParams: { page: this.page, pageSize: this.pageSize } });
    window.localStorage.setItem('pageSize', this.pageSize.toString());
  }

  nextPage() {
    this.page++;
    this.router.navigate([], { queryParams: { page: this.page, pageSize: this.pageSize } });
  }

  previousPage() {
    this.page--;
    this.router.navigate([], { queryParams: { page: this.page, pageSize: this.pageSize } });
  }
  
  goToPage(page: number) {
    this.page = page;
    this.router.navigate([], { queryParams: { page: this.page, pageSize: this.pageSize } });
  }

  deleteCommand(commandID: string) {
    this.commandsService.deleteCommand(commandID).subscribe((data: any) => {
      this.commands = this.commands.filter((command: any) => command._id !== commandID);
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  createCommand() {
    let command: Command = {
      name: this.commandForm.value.cmd,
      cmd: this.commandForm.value.cmd,
      func: this.commandForm.value.cmd,
      message: this.commandForm.value.message,
      reserved: this.commandForm.value.reserved,
      cooldown: this.commandForm.value.cooldown,
      description: this.commandForm.value.description,
      userLevel: this.commandForm.value.userLevel,
      userLevelName: this.userLevelNames[this.commandForm.value.userLevel - 1],
      channelID: this.userService.getId(),
      channel: this.userService.getUsername()
    }
    this.commandsService.createCommand(this.userService.getId(), command).subscribe((data: any) => {
        this.commands.push(data.command);
    });
    this.resetForm();
  }
  
  resetForm() {
    this.commandForm.controls['cmd'].setValue('');
    this.commandForm.controls['func'].setValue('');
    this.commandForm.controls['message'].setValue('');
    this.commandForm.controls['reserved'].setValue(false);
    this.commandForm.controls['cooldown'].setValue(10);
    this.commandForm.controls['description'].setValue('');
    this.commandForm.controls['userLevel'].setValue(1);
    this.commandForm.controls['userLevelName'].setValue('everyone');
    this.commandForm.controls['channelID'].setValue(this.userService.getId());
    this.showForm = false;
  }
  
}
