import SectionDescription from '../SectionDescription';

export default function SignupSection() {
  return (
    <section className='section section--sign-up'>
      <SectionDescription>
        <h3 className='section__header'>
          The best day to join Bankist was one year ago. The second best is today!
        </h3>
      </SectionDescription>
      <button className='btn btn--show-modal'>Open your free account today!</button>
    </section>
  );
}
