import { Suspense } from 'react'

import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { Differentials } from '@/components/sections/differentials'
import { Faq } from '@/components/sections/faq'
import { Hero } from '@/components/sections/hero'
import { Needs } from '@/components/sections/needs'
import { Process } from '@/components/sections/process'
import { Projects } from '@/components/sections/projects'
import { Services } from '@/components/sections/services'
import { JsonLd } from '@/components/shared/json-ld'
import { contactFormCopy, contactSection } from '@/content/contact'
import { differentials } from '@/content/differentials'
import { faq } from '@/content/faq'
import { privacyLink, sectionIds } from '@/content/navigation'
import { needs } from '@/content/needs'
import { processSteps } from '@/content/process'
import {
  aboutSection,
  differentialsSection,
  faqSection,
  heroContent,
  needsSection,
  processSection,
  projectsSection,
  servicesSection,
} from '@/content/sections'
import { services } from '@/content/services'
import { siteConfig } from '@/content/site'
import { uiCopy } from '@/content/ui'
import { getCategoryLabel, getProjectCategories, getPublishedProjects } from '@/lib/projects'
import { budgetRangeOptions, projectTypeOptions } from '@/lib/schemas/contact'
import { buildOrganizationJsonLd } from '@/lib/seo/json-ld'
import { getStudioWhatsAppUrl } from '@/lib/whatsapp'

export default function HomePage() {
  const projects = getPublishedProjects()
  const categories = getProjectCategories(projects).map((id) => ({
    id,
    label: getCategoryLabel(id),
  }))
  const { messages } = siteConfig.contact.whatsapp

  // Cada seção abaixo do Hero é um bloco de hidratação independente: o React
  // hidrata uma de cada vez e devolve o controle ao navegador entre elas.
  return (
    <>
      <JsonLd data={buildOrganizationJsonLd()} />

      <Hero
        id={sectionIds.hero}
        content={heroContent}
        projectsHref={`#${sectionIds.projects}`}
        highlights={services.map((service) => service.shortTitle)}
      />
      <Suspense>
        <Services id={sectionIds.services} copy={servicesSection} services={services} />
      </Suspense>
      <Suspense>
        <Projects
          id={sectionIds.projects}
          copy={projectsSection}
          projects={projects}
          categories={categories}
          newTabHint={uiCopy.newTabHint}
        />
      </Suspense>
      <Suspense>
        <Differentials
          id={sectionIds.differentials}
          copy={differentialsSection}
          differentials={differentials}
        />
      </Suspense>
      <Suspense>
        <Process id={sectionIds.process} copy={processSection} steps={processSteps} />
      </Suspense>
      <Suspense>
        <Needs
          id={sectionIds.needs}
          copy={needsSection}
          needs={needs.map((need) => ({
            ...need,
            whatsappHref: getStudioWhatsAppUrl(need.whatsappMessage),
          }))}
        />
      </Suspense>
      <Suspense>
        <About
          id={sectionIds.about}
          copy={aboutSection}
          founder={siteConfig.founder}
          technologies={siteConfig.technologies}
        />
      </Suspense>
      <Suspense>
        <Faq
          id={sectionIds.faq}
          copy={faqSection}
          items={faq}
          whatsappHref={getStudioWhatsAppUrl()}
        />
      </Suspense>
      <Suspense>
        <Contact
          id={sectionIds.contact}
          copy={contactSection}
          formCopy={contactFormCopy}
          projectTypes={projectTypeOptions.map(({ id, label }) => ({ id, label }))}
          budgetRanges={budgetRangeOptions}
          privacyHref={privacyLink.href}
          newTabHint={uiCopy.newTabHint}
          email={siteConfig.contact.email}
          social={siteConfig.social}
          location={{
            title: aboutSection.locationTitle,
            description: aboutSection.locationDescription,
          }}
          whatsappHrefs={{
            section: getStudioWhatsAppUrl(messages.contactSection),
            afterSubmit: getStudioWhatsAppUrl(messages.afterSubmit),
            afterError: getStudioWhatsAppUrl(messages.afterError),
          }}
        />
      </Suspense>
    </>
  )
}
