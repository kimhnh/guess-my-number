import { useState } from 'react';
import SectionDescription from '../SectionDescription';
import { tabsData } from './TabsData';
import './Operations.css';

export default function OperationsSection() {
  const [activeTab, setActiveTab] = useState(1);
  const currTab = tabsData.find((el) => el.num === activeTab);

  return (
    <section
      className='section'
      id='section--2'
    >
      <SectionDescription>
        <h2 className='section__description'>Operations</h2>
        <h3 className='section__header'>Everything as simple as possible, but no simpler.</h3>
      </SectionDescription>

      <div className='operations'>
        {/* Tabs Container */}
        <div className='operations__tab-container'>
          {tabsData.map((el) => (
            <button
              className={`btn operations__tab ${el.num === 2 ? '' : `operations__tab--${el.num}`} ${
                el.num === activeTab ? 'operations__tab--active' : ''
              }`}
              key={el.num}
              onClick={() => setActiveTab(el.num)}
            >
              {`${el.num}`.padStart(2, '0')} {el.button}
            </button>
          ))}
        </div>

        {/* Active Operation */}
        <div className='operations__content operations__content--active'>
          <div className={`operations__icon operations__icon--${currTab.num}`}>
            <svg>
              <use xlinkHref={currTab.svg}></use>
            </svg>
          </div>
          <h5 className='operations__header'>{currTab.header}</h5>
          <p>{currTab.description}</p>
        </div>
      </div>
    </section>
  );
}
