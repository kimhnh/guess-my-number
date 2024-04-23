import { useState } from 'react';
import SectionDescription from '../SectionDescription';
import { testimonialsData } from './TestimonialsData';
import Testimonial from './Testimonial';
import './Testimonials.css';

export default function TestimonialsSection() {
  const randNum = Math.floor(Math.random() * testimonialsData.length + 1);
  const [activeTestimonial, setActiveTestimonial] = useState(randNum);
  const currTestimonial = testimonialsData.find((el) => el.num === activeTestimonial);

  function handlePrev() {
    if (activeTestimonial === 1) setActiveTestimonial(3);
    if (activeTestimonial < 4 && activeTestimonial > 1) setActiveTestimonial((t) => t - 1);
  }

  function handleNext() {
    if (activeTestimonial === 3) setActiveTestimonial(1);
    if (activeTestimonial < 3 && activeTestimonial > 0) setActiveTestimonial((t) => t + 1);
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
        <Testimonial test={currTestimonial} />

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

        <div className='dots'></div>
      </div>
    </section>
  );
}

// create an array for testimonial data
// ignore animation/transform for now?

// {testimonialsData.map((el) => (
//   <div
//     className={`slide slide--${el.num}`}
//     key={el.num}
//   >
//     <div className='testimonial'>
//       <h5 className='testimonial__header'>{el.header}</h5>
//       <blockquote className='testimonial__text'>{el.quote}</blockquote>
//       <address className='testimonial__author'>
//         <img
//           src={el.img}
//           alt=''
//           className='testimonial__photo'
//         />
//         <h6 className='testimonial__name'>{el.name}</h6>
//         <p className='testimonial__location'>{el.location}</p>
//       </address>
//     </div>
//   </div>
// ))}
