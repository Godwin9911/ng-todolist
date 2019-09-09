import { Injectable } from '@angular/core';
import uuid from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class Uuid {
    generateId(): any {
        return uuid();
    }
}

