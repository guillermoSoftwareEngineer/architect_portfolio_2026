export default function Contact() {
  return (
    <section className="solid contact" id="contact">
      <div className="wrap">
        <h2>
          <span className="tt-w">Iniciemos una</span> <span className="tt-b">conversación</span>
        </h2>
        <p>
          Abierto a roles de ingeniería, arquitectura de software y desarrollo de soluciones backend / IoT donde el pensamiento analítico sea clave.
        </p>
        <div className="socials">
          <a
            className="li"
            href="https://www.linkedin.com/in/guillermovasbendev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in" />
          </a>
          <a
            className="gh"
            href="https://github.com/guillermoSoftwareEngineer"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="fab fa-github" />
          </a>
          <a
            className="em"
            href="mailto:guillermovasbendev@gmail.com"
            aria-label="Email"
          >
            <i className="fas fa-envelope" />
          </a>
        </div>
        
        <a className="btn btn-primary" href="mailto:guillermovasbendev@gmail.com">
          <i className="fas fa-paper-plane" />
          Enviar Mensaje
        </a>

        <p className="contact-email">
          <a href="mailto:guillermovasbendev@gmail.com">guillermovasbendev@gmail.com</a>
        </p>
      </div>
    </section>
  );
}
