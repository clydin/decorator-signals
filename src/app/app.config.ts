import { ApplicationConfig, NgZone, provideZoneChangeDetection, ɵNoopNgZone, ɵprovideZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    ɵprovideZonelessChangeDetection(),
  ],
};
