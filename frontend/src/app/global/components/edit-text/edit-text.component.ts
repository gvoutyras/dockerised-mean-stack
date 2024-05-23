import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrl: './edit-text.component.css',
})
export class EditTextComponent {
  @Input() text: String;
}
