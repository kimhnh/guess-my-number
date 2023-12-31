import { useState } from 'react';
import './index.css';

const modalContent = [
  {
    title: 'Lorem',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, eos!',
  },
  {
    title: 'Ipsum',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore facere recusandae alias quam consectetur dolorum eos. Inventore distinctio eaque sint.',
  },
  {
    title: 'Dolor',
    description: 'Lorem ipsum dolor sit amet.',
  },
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(null);

  function handleOpen(num) {
    setIsOpen((o) => !o);
    setIsActive(num);
  }

  function handleClose() {
    setIsOpen((o) => !o);
    setIsActive(null);
  }

  return (
    <div className="app">
      <OpenButton
        num={1}
        onClick={handleOpen}
      >
        About Lorem
      </OpenButton>
      <OpenButton
        num={2}
        onClick={handleOpen}
      >
        About Ipsum
      </OpenButton>
      <OpenButton
        num={3}
        onClick={handleOpen}
      >
        About Dolor
      </OpenButton>
      <Modal className={isOpen ? 'modal' : 'modal hidden'}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        {isActive && (
          <ModalItem
            key={isActive}
            isActive={isActive}
            modalContent={modalContent}
          />
        )}
      </Modal>
      <Overlay
        className={isOpen ? 'overlay' : 'overlay hidden'}
        onClick={handleClose}
      />
    </div>
  );
}

// Reusable component
function OpenButton({ children, className = 'show-modal', onClick, num }) {
  return (
    <button
      num={num}
      className={className}
      onClick={() => {
        onClick(num);
      }}
    >
      {children}
    </button>
  );
}

function CloseButton({ children, onClick }) {
  return (
    <button
      className="close-modal"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// Composition
function Modal({ children, className }) {
  return <div className={className}>{children}</div>;
}

function ModalItem({ isActive, modalContent }) {
  return (
    <>
      <h1>{modalContent[isActive - 1].title}</h1>
      <p>{modalContent[isActive - 1].description}</p>
    </>
  );
}

function Overlay({ className, onClick }) {
  return (
    <div
      className={className}
      onClick={onClick}
    ></div>
  );
}
