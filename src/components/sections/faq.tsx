import { JsonLd } from '@/components/shared/json-ld'
import { Reveal } from '@/components/shared/reveal'
import { Container, Section } from '@/components/shared/section'
import { SectionHeading } from '@/components/shared/section-heading'
import { WhatsAppButton } from '@/components/shared/whatsapp-button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { faqSection } from '@/content/sections'
import { buildFaqPageJsonLd } from '@/lib/seo/json-ld'
import type { FAQItem } from '@/types/content'

interface FaqProps {
  id: string
  copy: typeof faqSection
  items: FAQItem[]
  whatsappHref: string
}

export function Faq({ id, copy, items, whatsappHref }: FaqProps) {
  const titleId = `${id}-titulo`

  return (
    <Section id={id} labelledBy={titleId}>
      <JsonLd data={buildFaqPageJsonLd(items)} />
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            copy={copy.heading}
            titleId={titleId}
            layout="stacked"
            className="lg:sticky lg:top-32"
          >
            <div className="flex flex-col items-start gap-4 pt-2">
              <p className="text-body">{copy.moreQuestions}</p>
              <WhatsAppButton href={whatsappHref} source="faq" label={copy.moreQuestionsCta} />
            </div>
          </SectionHeading>
        </div>

        <Reveal className="lg:col-span-7">
          <Accordion type="single" collapsible>
            {items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`pergunta-${index + 1}`}
                className="border-line"
              >
                <AccordionTrigger className="min-h-14 items-center py-5 text-base font-medium text-foreground hover:no-underline sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base text-body">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </Container>
    </Section>
  )
}
