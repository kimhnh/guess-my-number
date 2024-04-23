export default function Testimonial({ test }) {
  return (
    <div className={`slide slide--${test.num}`}>
      <div className='testimonial'>
        <h5 className='testimonial__header'>{test.header}</h5>
        <blockquote className='testimonial__text'>{test.quote}</blockquote>
        <address className='testimonial__author'>
          <img
            src={test.img}
            alt=''
            className='testimonial__photo'
          />
          <h6 className='testimonial__name'>{test.name}</h6>
          <p className='testimonial__location'>{test.location}</p>
        </address>
      </div>
    </div>
  );
}
