/* eslint-disable @next/next/no-img-element -- vinext has no next/image loader; these are
   pre-sized static PNGs extracted from the project reports. */
/* eslint-disable @next/next/no-html-link-for-pages -- vinext preserves scroll position during client-side route transitions. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { caseStudies, curriculum, profile, selectedWork, thesis } from "../../portfolio-data";

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = caseStudies.find((candidate) => candidate.slug === slug);

  if (!item) {
    return {};
  }

  return {
    title: `${item.shortTitle} | Victor Sorgi Pedroso`,
    description: item.summary,
  };
}

function backTarget(slug: string) {
  if (selectedWork.some((item) => item.slug === slug)) {
    return { href: "/#work", label: "work" };
  }
  if (slug === thesis.slug) {
    return { href: "/#background", label: "background" };
  }
  if (slug === curriculum.slug) {
    return { href: "/#background", label: "background" };
  }
  return { href: "/", label: "home" };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = caseStudies.find((candidate) => candidate.slug === slug);

  if (!item) {
    notFound();
  }

  const back = backTarget(item.slug);
  const media = item.media ?? [];

  return (
    <main>
      <header className="site-header">
        <a className="site-name" href="/">{profile.name}</a>
        <nav aria-label="Case study navigation">
          <a href={back.href}>Back to {back.label}</a>
          <a href="/#experience">Experience</a>
          <a href="/#contact">Contact</a>
        </nav>
      </header>

      <article className="shell">
        <header className="case-hero">
          <a className="back-link" href={back.href}>
            <span aria-hidden="true">←</span> Back to {back.label}
          </a>
          <div className="case-kicker">
            <span>{item.type}</span>
            <span>{item.status}</span>
          </div>
          <h1>{item.title}</h1>
          <p className="case-summary">{item.summary}</p>
          <dl className="case-meta">
            <div>
              <dt>Organization</dt>
              <dd>{item.organization}</dd>
            </div>
            <div>
              <dt>Period</dt>
              <dd>{item.period}</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>{item.technologies.slice(0, 3).join(" · ")}</dd>
            </div>
          </dl>
        </header>

        {item.highlight && (
          <section className="case-section-block" aria-label="Key result">
            <div className="case-highlight">
              <div>
                <span>{item.highlight.label}</span>
                <strong>{item.highlight.value}</strong>
                <p>{item.highlight.note}</p>
              </div>
            </div>
          </section>
        )}

        {media.length > 0 && (
          <section className="case-section-block" aria-labelledby="figures-title">
            <h2 id="figures-title">Project figures</h2>
            <div className="figure-grid">
              {media.map((figure) => (
                <figure className={`case-figure${item.slug === "turtlebot3-autonomy" ? " map-media" : ""}`} key={figure.src}>
                  <img src={figure.src} alt={figure.alt} loading="lazy" decoding="async" />
                  <figcaption>{figure.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="case-section-block" aria-labelledby="detail-title">
          <h2 id="detail-title">Project Detail</h2>
          {item.sections.map((section) => (
            <section className="case-section" key={section.title}>
              <h3>{section.title}</h3>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
        </section>

        <div className="case-tools">
          <span>Tools and methods</span>
          <ul className="tags">
            {item.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>

        <div className="case-actions">
          {item.repoHref && (
            <a className="primary-link" href={item.repoHref} target="_blank" rel="noreferrer">
              View code on GitHub
            </a>
          )}
          {item.pdfHref && (
            <a
              className={item.repoHref ? "text-link" : "primary-link"}
              href={item.pdfHref}
              target="_blank"
              rel="noreferrer"
            >
              {item.pdfLabel}
            </a>
          )}
          <a className="text-link" href={back.href}>
            <span aria-hidden="true">←</span> Back to {back.label}
          </a>
        </div>
      </article>
    </main>
  );
}
