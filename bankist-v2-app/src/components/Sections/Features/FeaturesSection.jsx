import SectionDescription from '../SectionDescription';
import Feature from './Feature';

// TODO: animation effect(?)

export default function FeaturesSection() {
  return (
    <section
      className='section'
      id='section--1'
    >
      <SectionDescription>
        <h2 className='section__description'>Features</h2>
        <h3 className='section__header'>
          Everything you need in a modern bank <br />
          and more.
        </h3>
      </SectionDescription>

      <div className='features'>
        {/* Feature 1 */}
        <img
          src='./src/assets/images/digital-lazy.jpg'
          data-src='./src/assets/images/digital.jpg'
          alt='computer'
          className='features__img lazy-img'
        />
        <Feature xlinkHref='/icons.svg#icon-monitor'>
          <h5 className='features__header'>100% digital bank</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias sint quos?
            Accusantium a fugiat porro reiciendis saepe quibusdam debitis ducimus.
          </p>
        </Feature>

        {/* Feature 2 */}
        <Feature xlinkHref='/icons.svg#icon-trending-up'>
          <h5 className='features__header'>Watch your money grow</h5>
          <p>
            Nesciunt quos autem dolorum voluptates cum dolores dicta fuga inventore ab? Nulla
            incidunt eius numquam sequi iste pariatur quibusdam!
          </p>
        </Feature>
        <img
          src='./src/assets/images/grow-lazy.jpg'
          data-src='./src/assets/images/grow.jpg'
          alt='plant'
          className='features__img lazy-img'
        />

        {/* Feature 3 */}
        <img
          src='./src/assets/images/card-lazy.jpg'
          data-src='./src/assets/images/card.jpg'
          alt='credit card'
          className='features__img lazy-img'
        />
        <Feature xlinkHref='/icons.svg#icon-credit-card'>
          <h5 className='features__header'>Free debit card included</h5>
          <p>
            Quasi, fugit in cumque cupiditate reprehenderit debitis animi enim eveniet consequatur
            odit quam quos possimus assumenda dicta fuga inventore ab.
          </p>
        </Feature>
      </div>
    </section>
  );
}

// Section: Features
//    - Description
//          - Image 1
//          - Feature 1
////////////////////////////
//          - Feature 2
//          - Image 2
////////////////////////////
//          - Image 3
//          - Feature 3
