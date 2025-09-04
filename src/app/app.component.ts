import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,              // ✅ Angular 15+ standalone component
  imports: [CommonModule, FormsModule], // ✅ Add modules here
  template: `
    <h1>Simple Todo App</h1>
    <input [(ngModel)]="newTodo" placeholder="Enter task" />
    <button (click)="addTodo()">Add</button>

    <ul>
      <li *ngFor="let todo of todos; let i = index">
        {{ todo }}
        <button (click)="removeTodo(i)">❌</button>
      </li>
    </ul>
  `
})
export class AppComponent {
  newTodo = '';
  todos: string[] = [];

  addTodo() {
    if (this.newTodo.trim()) {
      this.todos.push(this.newTodo.trim());
      this.newTodo = '';
    }
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }
}

