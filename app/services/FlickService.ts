//import { FlickModel } from '../models/Flick';
import { Http } from '@nativescript/core';

export default class FlickService {
  async getApiNews() {
    await Http.getJSON('https://jsonplaceholder.org/posts').then(
      (result: any) => {
        return result;
      },
      (e) => {
        console.log(e);
      }
    );
  }

  getFlicks() {
    return this.getApiNews();
  }

  getFlickById(id: number) {
    return this.getApiNews().find((flick) => flick.id === id) || undefined;
  }
}
