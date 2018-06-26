import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import 'rxjs/add/operator/delay';

export function initApplication(http: HttpClient) {
  return () => {
    return new Promise((resolve, reject) => {
      //make some init steps, load data for example
      http
        .get('https://jsonplaceholder.typicode.com/users/1')
        .delay(5000) //wait a little bit, just to enjoy the loading gif
        .subscribe(r => {
          //handle response
          resolve(r);
        });
    });
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [HttpClient],
      useFactory: initApplication
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
