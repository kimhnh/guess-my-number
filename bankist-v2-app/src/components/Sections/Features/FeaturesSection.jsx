import { useEffect, useRef, useState } from 'react';
import SectionDescription from '../SectionDescription';
import { FeaturesData } from './FeaturesData';

// UPDATE: ref on all image elements
// https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks
// 3. do this for all images but with IntersectionObserver

export default function FeaturesSection() {
  const [data, setData] = useState(FeaturesData);
  const featuresEl = useRef(null);

  useEffect(() => {
    function callback(entries) {
      const [entry] = entries;

      if (entry.isIntersecting) {
        setData((d) =>
          d.map((el) =>
            el.type === 'image' ? { ...el, visible: entry.isIntersecting } : { ...el }
          )
        );
      }
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const divObserver = new IntersectionObserver(callback, options);
    if (featuresEl.current) divObserver.observe(featuresEl.current);

    // clean-up function
    return () => {
      if (featuresEl.current) divObserver.unobserve(featuresEl.current);
    };
  }, []);

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

      <div
        className='features'
        ref={featuresEl}
      >
        {data.map((el) =>
          el.type === 'image' ? (
            <img
              className={`features__img ${el.visible ? '' : 'lazy-img'}`}
              src={el.visible ? el.dataSrc : el.src}
              alt={el.alt}
              key={el.num}
            />
          ) : (
            <div
              className='features__feature'
              key={el.num}
            >
              <div className='features__icon'>
                <svg>
                  <use xlinkHref={el.xlinkHref}></use>
                </svg>
              </div>
              <h5 className='features__header'>{el.header}</h5>
              <p>{el.description}</p>
            </div>
          )
        )}
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
