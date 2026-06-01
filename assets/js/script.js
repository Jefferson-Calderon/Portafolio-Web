function app() {
  return {
    dark: false,
    mm: false,
    sc: false,
    seccionActiva: 'inicio',
    formNombre: '',
    formEmail: '',
    formAsunto: '',
    formMensaje: '',
    anioActual: new Date().getFullYear(),

    init() {
      // Modo oscuro
      const temaGuardado = localStorage.getItem('theme');
      if (temaGuardado === 'dark' || (!temaGuardado && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        this.dark = true;
        document.documentElement.classList.add('dark');
      } else {
        this.dark = false;
        document.documentElement.classList.remove('dark');
      }

      // Detectar scroll
      window.addEventListener('scroll', () => {
        this.sc = window.scrollY > 20;
        this.actualizarSeccionActiva();
      });

      // Ocultar el loader cuando cargue la página
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    setTimeout(() => {
        loader.classList.add('hide');

        setTimeout(() => {
            loader.remove();
        }, 600);

    }, 1200);
});

      // Intersection Observer para animaciones reveal
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    },

    toggleDark() {
      this.dark = !this.dark;
      if (this.dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    },

    actualizarSeccionActiva() {
      const scrollPos = window.scrollY + 150;
      const secciones = ['inicio', 'sobre-mi', 'formacion', 'servicios', 'proyectos', 'contacto'];
      for (let id of secciones) {
        const elemento = document.getElementById(id);
        if (elemento && scrollPos >= elemento.offsetTop) {
          this.seccionActiva = id;
        }
      }
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 50) {
        this.seccionActiva = 'contacto';
      }
    },

    enviarFormulario() {
      if (!this.formNombre || !this.formEmail || !this.formMensaje) {
        alert('Por favor completa los campos obligatorios.');
        return;
      }
      alert('Mensaje enviado (demo). ¡Gracias por contactarme!');
      this.formNombre = '';
      this.formEmail = '';
      this.formAsunto = '';
      this.formMensaje = '';
    }

  }
}
