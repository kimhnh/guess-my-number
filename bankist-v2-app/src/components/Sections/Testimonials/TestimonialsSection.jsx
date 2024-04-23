import { useState } from 'react';
import SectionDescription from '../SectionDescription';
import { testimonialsData } from './TestimonialsData';
import './Testimonials.css';

// TODO: implement animation/transform per click

export default function TestimonialsSection() {
  const [activeTest, setActiveTest] = useState(1);
  const currTest = testimonialsData.find((el) => el.num === activeTest);

  function handlePrev() {
    if (activeTest === 1) setActiveTest(3);
    if (activeTest < 4 && activeTest > 1) setActiveTest((t) => t - 1);
  }

  function handleNext() {
    if (activeTest === 3) setActiveTest(1);
    if (activeTest < 3 && activeTest > 0) setActiveTest((t) => t + 1);
  }

  return (
    <section
      className='section'
      id='section--3'
    >
      <SectionDescription>
        <h2 className='section__description'>Not sure yet?</h2>
        <h3 className='section__header'>
          Millions of Bankists are already making their lifes simpler.
        </h3>
      </SectionDescription>

      <div className='slider'>
        {/* Testimonial */}
        <div className={`slide slide--${currTest.num}`}>
          <div className='testimonial'>
            <h5 className='testimonial__header'>{currTest.header}</h5>
            <blockquote className='testimonial__text'>{currTest.quote}</blockquote>
            <address className='testimonial__author'>
              <img
                src={currTest.img}
                alt=''
                className='testimonial__photo'
              />
              <h6 className='testimonial__name'>{currTest.name}</h6>
              <p className='testimonial__location'>{currTest.location}</p>
            </address>
          </div>
        </div>

        {/* Buttons */}
        <button
          className='slider__btn slider__btn--left'
          onClick={handlePrev}
        >
          &larr;
        </button>
        <button
          className='slider__btn slider__btn--right'
          onClick={handleNext}
        >
          &rarr;
        </button>

        {/* Dots */}
        <div className='dots'>
          {/* Button onClick logic */}
          {testimonialsData.map((el) => (
            <button
              className={`dots__dot ${activeTest === el.num ? 'dots__dot--active' : ''}`}
              key={el.num}
              onClick={() => setActiveTest(el.num)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
