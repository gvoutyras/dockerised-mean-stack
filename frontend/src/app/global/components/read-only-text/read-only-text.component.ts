import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-read-only-text',
  templateUrl: './read-only-text.component.html',
  styleUrl: './read-only-text.component.css',
})
export class ReadOnlyTextComponent {
  @Input() text: String;
}
