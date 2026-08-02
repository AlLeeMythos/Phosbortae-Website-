import { FormEvent, useEffect, useState } from 'react';
import { content, Language, principles } from './data/content';

function App() {
  const [language, setLanguage] = useState<Language>('de');
  const [menuOpen, setMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [notice, setNotice] = useState('');
  const t = content[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.body.classList.toggle('high-contrast', highContrast);
    document.body.classList.toggle('reduce-motion', reduceMotion);
  }, [language, highContrast, reduceMotion]);

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(language === 'de' ? 'Die Newsletter-Anbindung wird im nächsten Schritt aktiviert.' : 'The newsletter connection will be activated in the next step.');
  }

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="PHOSBORTAE Startseite">PHOSBORTAE</a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-nav">☰<span className="sr-only">Menü</span></button>
        <nav id="main-nav" className={menuOpen ? 'nav open' : 'nav'} aria-label="Hauptnavigation">
          {t.nav.map((item, index) => <a key={item} href={`#section-${index}`}>{item}</a>)}
          <a href="#shop">{t.shop}</a><a href="#login">{t.login}</a>
          <a className="nav-cta" href="#register">{t.register}</a>
        </nav>
        <div className="language" aria-label="Sprache auswählen">
          <button aria-pressed={language === 'de'} onClick={() => setLanguage('de')}>DE</button>
          <button aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p className="lead">{t.intro}</p>
          <div className="actions"><a className="button primary" href="#section-0">{t.discover}</a><a className="button secondary" href="#register">{t.join}</a></div>
          <div className="symbol" aria-hidden="true"><span>PHOS</span><strong>✦</strong><span>ARBOR VITAE</span></div>
        </section>

        <section id="section-0" className="section two-column">
          <div><p className="eyebrow">PHOS + ARBOR VITAE</p><h2>{t.whatTitle}</h2></div><p>{t.whatText}</p>
        </section>

        <section id="section-1" className="section muted">
          <p className="eyebrow">8 Prinzipien</p><h2>{t.codeTitle}</h2>
          <div className="principles">{principles.map((p, i) => <article key={p[0]}><span>{String(i + 1).padStart(2, '0')}</span><h3>{p[language === 'de' ? 0 : 1]}</h3></article>)}</div>
        </section>

        <section id="section-2" className="section feature-grid">
          <article><p className="eyebrow">Welten</p><h2>Musik, Bildung, Technologie, Kunst und Gemeinschaft</h2><p>Bereiche bleiben eigenständig und verbinden sich dort, wo echte Synergie entsteht.</p></article>
          <article id="shop"><p className="eyebrow">Shop</p><h2>Bücher, Musik und digitale Schöpfungen</h2><p>Der Shop wird in einer späteren Ausbaustufe mit einem sicheren Handelssystem verbunden.</p></article>
          <article id="login"><p className="eyebrow">Konto</p><h2>Persönlicher Bereich</h2><p>Registrierung, Login, Profile, Projekte, Bestellungen und Downloads werden schrittweise aktiviert.</p></article>
        </section>

        <section id="section-3" className="section newsletter">
          <div><p className="eyebrow">Newsletter</p><h2>{t.newsletterTitle}</h2><p>{t.newsletterText}</p></div>
          <form onSubmit={submitNewsletter} aria-describedby="newsletter-notice">
            <label htmlFor="email">{t.email}</label><input id="email" name="email" type="email" autoComplete="email" required />
            <button className="button primary" type="submit">{t.subscribe}</button>
            <p id="newsletter-notice" role="status">{notice}</p>
          </form>
        </section>

        <section id="register" className="section callout"><h2>{t.join}</h2><p>Die Registrierung wird als nächstes mit sicherer E-Mail-Bestätigung und Datenschutzkontrollen aufgebaut.</p><button className="button primary" disabled>Registrierung folgt</button></section>
      </main>

      <aside className="accessibility" aria-label={t.a11y}>
        <strong>{t.a11y}</strong>
        <button aria-pressed={highContrast} onClick={() => setHighContrast(!highContrast)}>{t.contrast}</button>
        <button aria-pressed={reduceMotion} onClick={() => setReduceMotion(!reduceMotion)}>{t.motion}</button>
      </aside>

      <footer><p>{t.footer}</p><nav aria-label="Rechtliches"><a href="#">Impressum</a><a href="#">Datenschutz</a><a href="#">Barrierefreiheit</a></nav></footer>
    </>
  );
}

export default App;
