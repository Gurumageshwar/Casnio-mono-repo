import { Injectable, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class IconRegistryService {
  private readonly matIconRegistry = inject(MatIconRegistry);
  private readonly domSanitizer = inject(DomSanitizer);

  public registerIcons(appIcons: Record<string, string> | string[] = []): void {
    const icons = [
      ...(Array.isArray(appIcons) ? appIcons : Object.values(appIcons))
    ];

    [...new Set(icons)]
      .filter(Boolean)
      .forEach((icon) => this.matIconRegistry.addSvgIcon(icon, this.getIconUrl(icon)));
  }

  private getIconUrl(icon: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`);
  }
}
