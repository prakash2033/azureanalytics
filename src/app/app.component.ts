import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Azure Insights';

  menuMode = 'static';

  colorScheme = 'light';

  theme = 'blue-light';

  inputStyle = 'outlined';

  ripple: boolean;

  topbarMenuActive: boolean;

  overlayMenuActive: boolean;

  staticMenuDesktopInactive: boolean;

  staticMenuMobileActive: boolean;

  menuClick: boolean;

  topbarItemClick: boolean;

  activeTopbarItem: any;

  menuHoverActive: boolean;

  configClick: boolean;

  configActive: boolean;

  constructor(private primengConfig: PrimeNGConfig) {

  }
  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onLayoutClick() {
    if (!this.topbarItemClick) {
        this.activeTopbarItem = null;
        this.topbarMenuActive = false;
    }

    if (!this.menuClick) {
        if (this.isHorizontal() || this.isSlim()) {
            //this.menuService.reset();
        }

        if (this.overlayMenuActive || this.staticMenuMobileActive) {
            this.hideOverlayMenu();
        }

        this.menuHoverActive = false;
    }

    if (this.configActive && !this.configClick) {
        this.configActive = false;
    }

    this.configClick = false;
    this.topbarItemClick = false;
    this.menuClick = false;
}

onMenuButtonClick(event: { preventDefault: () => void; }) {
    this.menuClick = true;
    this.topbarMenuActive = false;

    if (this.isOverlay()) {
        this.overlayMenuActive = !this.overlayMenuActive;
    }
    if (this.isDesktop()) {
        this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
    } else {
        this.staticMenuMobileActive = !this.staticMenuMobileActive;
    }

    event.preventDefault();
}

onMenuClick() {
    this.menuClick = true;
}

onTopbarMenuButtonClick(event: { preventDefault: () => void; }) {
    this.topbarItemClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    this.hideOverlayMenu();

    event.preventDefault();
}

onTopbarItemClick(event: { preventDefault: () => void; }, item: any) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
        this.activeTopbarItem = null;
    } else {
        this.activeTopbarItem = item;
    }

    event.preventDefault();
}

onTopbarSubItemClick(event: { preventDefault: () => void; }) {
    event.preventDefault();
}

onConfigClick() {
    this.configClick = true;
}

// onRippleChange(event: { checked: boolean | PrimeNGConfig; }) {
//     this.ripple = event.checked;
//     this.primengConfig = event.checked;
// }

isHorizontal() {
    return this.menuMode === 'horizontal';
}

isSlim() {
    return this.menuMode === 'slim';
}

isOverlay() {
    return this.menuMode === 'overlay';
}

isStatic() {
    return this.menuMode === 'static';
}

isMobile() {
    return window.innerWidth < 1025;
}

isDesktop() {
    return window.innerWidth > 1024;
}

isTablet() {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
}

hideOverlayMenu() {
    this.overlayMenuActive = false;
    this.staticMenuMobileActive = false;
}
}
