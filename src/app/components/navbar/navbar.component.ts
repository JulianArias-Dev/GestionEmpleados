import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ubicacionPrincipal: number = 0;
  semaforo: boolean = true;

  constructor() { }

  ngOnInit(): void { }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const ubicacionActual: number = window.pageYOffset;
    const navElement: HTMLElement | null = document.getElementsByTagName("nav")[0];

    if (navElement) {
      if (ubicacionActual <= this.ubicacionPrincipal) {
        navElement.style.top = "0px";
      } else {
        navElement.style.top = "-100px";
      }
    }

    this.ubicacionPrincipal = ubicacionActual;
  }

  toggleMenu(): void {
    const hamburguesa = document.querySelector(".hamburguesa") as HTMLElement;
    const enlacesHeader = document.querySelector(".enlaces") as HTMLElement;

    if (this.semaforo) {
      hamburguesa.style.color = "#fff";
      this.semaforo = false;
    } else {
      hamburguesa.style.color = "#fff";
      this.semaforo = true;
    }
    enlacesHeader.classList.toggle("menudos");
  }
}
