import { APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { IconRegistryService } from './icon.service';

export function provideSharedIcons(appIcons: Record<string, string> | string[] = []): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_INITIALIZER,
      useFactory: (iconRegistry: IconRegistryService) =>
        () => iconRegistry.registerIcons(appIcons),
      deps: [IconRegistryService],
      multi: true
    }
  ]);
}