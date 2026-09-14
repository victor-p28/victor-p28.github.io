/* eslint-disable @next/next/no-img-element -- vinext has no next/image loader; these are
   pre-sized static PNGs extracted from the project reports. */
/* eslint-disable @next/next/no-html-link-for-pages -- vinext preserves scroll position during client-side route transitions. */
import type { CaseStudy } from "./portfolio-data";
import {
  availability,
  education,
  industryExperiences,
  lastUpdated,
  profile,
  selectedWork,
  skills,
  thesis,
} from "./portfolio-data";

function WorkItem({ item }: { item: CaseStudy }) {
  const cardImage = item.media?.find((entry) => entry.card);

  return (
    <article className={`work-item${cardImage ? " work-item-with-media" : ""}`}>
      <div>
        <div className="work-topline">
          <span>{item.type}</span>
          <span>{item.status}</span>
        </div>
        <h3><a href={`/work/${item.slug}`}>{item.shortTitle}</a></h3>
        <p className="work-context">{item.organization} · {item.period}</p>
        <p className="work-summary">{item.summary}</p>
        {item.highlight && (
          <p className="work-result"><strong>{item.highlight.value}</strong> · {item.highlight.note}</p>
        )}
        <div className="work-links">
          <a className="text-link" href={`/work/${item.slug}`}>View project</a>
          {item.repoHref && (
            <a className="text-link" href={item.repoHref} target="_blank" rel="noreferrer">GitHub</a>
          )}
        </div>
      </div>
      {cardImage && (
        <figure className={`work-media${item.slug === "turtlebot3-autonomy" ? " map-media" : ""}`}>
          <a href={`/work/${item.slug}`}><img src={cardImage.src} alt={cardImage.alt} loading="lazy" decoding="async" /></a>
          <figcaption>{item.slug === "turtlebot3-autonomy" ? "Gazebo maze occupancy map" : item.slug === "nonlinear-filtering-ballistic-reentry" ? "EKF estimate of the ballistic coefficient" : "Estimated optical flow field"}</figcaption>
        </figure>
      )}
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="site-name" href="/">{profile.name}</a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#background">Background</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <div className="shell">
        <section className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero-intro">{profile.intro}</p>
          <p className="hero-experience"><a href="#experience">Previously at Volvo Autonomous Solutions</a> · Python log analysis and engineering tools</p>

          <div className="availability" aria-label="Availability">
            <p className="availability-status">{availability.status}</p>
            <p>{availability.detail}</p>
            <p className="availability-meta">
              <span>{availability.location}</span>
            </p>
          </div>

          <div className="hero-actions">
            <a className="primary-link" href="#work">View the work</a>
            <a href="/VictorSorgiPedroso_Resume.pdf" download>Download resume</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>

        <section className="section" id="work" aria-labelledby="work-title">
          <header className="section-header">
            <div>
              <h2 id="work-title">Selected projects</h2>
            </div>
          </header>
          <div className="work-list">
            {selectedWork.map((item) => <WorkItem item={item} key={item.slug} />)}
          </div>
        </section>

        <section className="section" id="experience" aria-labelledby="experience-title">
          <header className="section-header">
            <div>
              <h2 id="experience-title">Experience</h2>
            </div>
          </header>
          <div className="experience-list">
            {industryExperiences.map((experience) => (
              <article key={`${experience.organization}-${experience.role}`}>
                <div className="experience-heading">
                  <div>
                    <h3>{experience.role}</h3>
                    <p>{experience.organization}</p>
                  </div>
                  <div>
                    <span>{experience.dates}</span>
                    <span>{experience.location}</span>
                  </div>
                </div>
                <p>{experience.summary}</p>
                {experience.bullets && (
                  <ul className="experience-bullets">
                    {experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
                <ul className="tags" aria-label={`${experience.organization} focus areas`}>
                  {experience.focus.map((focus) => <li key={focus}>{focus}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="background" aria-labelledby="background-title">
          <header className="section-header">
            <div>
              <h2 id="background-title">Education and skills</h2>
            </div>
          </header>
          <div className="background-grid">
            <div className="education">
              {education.map((item) => (
                <div key={item.school}>
                  <h3>{item.degree}</h3>
                  <p>{item.school}</p>
                  <span>{item.date}</span>
                </div>
              ))}

              <a className="prior-work" href={`/work/${thesis.slug}`}>
                <span className="prior-work-label">{thesis.type} · {thesis.period}</span>
                <strong>{thesis.title}</strong>
                <p>{thesis.summary}</p>
                <span className="text-link">View case study <span aria-hidden="true">→</span></span>
              </a>
            </div>

            <div className="skills">
              {skills.map((group) => (
                <div key={group.category}>
                  <h3>{group.category}</h3>
                  <p>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="contact" id="contact">
          <div>
            <h2>Contact</h2>
          </div>
          <div>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href="/VictorSorgiPedroso_Resume.pdf" download>Resume PDF</a>
          </div>
        </footer>

        <div className="footer-line">
          <span>{profile.name}</span>
          <span>Last updated {lastUpdated}</span>
        </div>
      </div>
    </main>
  );
}
