import Hero from 'src/components/landingcomponents/hero'
import Usercase from 'src/components/landingcomponents/usercase'
import Section from 'src/components/landingcomponents/section'
import Feature from 'src/components/landingcomponents/feature'
import Testimonial from 'src/components/landingcomponents/testimonial'
import Faq from 'src/components/landingcomponents/faq'
import Cta from 'src/components/landingcomponents/cta'
import Footer from 'src/components/landingcomponents/footer'

export default function ({ page }: { page: any }) {
  return (
    <>
      {/* {page.header && <Header header={page.header} />} */}
      {page.hero && <Hero hero={page.hero} />}
      {page.usercase && <Usercase section={page.usercase} />}
      {page.section && <Section section={page.section} />}
      {page.feature && <Feature section={page.feature} />}
      {/* <Pricing /> */}
      {page.testimonial && <Testimonial section={page.testimonial} />}
      {page.faq && <Faq section={page.faq} />}
      {page.cta && <Cta section={page.cta} />}
      {page.footer && <Footer footer={page.footer} />}
    </>
  )
}
