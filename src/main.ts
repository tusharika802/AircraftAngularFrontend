import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'zone.js';  // ✅ Required for Angular's change detection
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));
