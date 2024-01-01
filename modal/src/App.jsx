import { useState } from 'react';
import './index.css';

const modalData = [
  {
    title: 'Who created Lorem Ipsum?',
    description:
      'It is widely believed that the history of Lorem Ipsum originates with Cicero in the 1st Century BC and his text De Finibus bonorum et malorum. This philosophical work, also known as On the Ends of Good and Evil, was split into five books.',
  },
  {
    title: 'What does it mean?',
    description:
      '"Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but occasionally circumstances occur in which toil and pain can procure him some great pleasure".',
  },
  {
    title: 'Lorem Ipsum',
    description:
      "Advancing to the 1960s, Lorem Ipsum was made popular by typeface manufacturer Letraset, who used it in their advertising campaigns. Letraset offered pages of Lorem Ipsum as rub down transfer sheets, which were widely used in the pre-computer era for layouts. These transfer pages, known as Letraset Body Type, were featured in the company's advertising and their popular catalogue.",
  },
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(null);

  function handleClick(num) {
    setIsOpen((o) => !o);
    setIsActive((s) => (typeof num === 'number' ? num : null));
  }

  return (
    <div className="app">
      <Button
        num={0}
        onClick={handleClick}
      >
        Marcus Tullius Cicero
      </Button>
      <Button
        num={1}
        onClick={handleClick}
      >
        Translation
      </Button>
      <Button
        num={2}
        onClick={handleClick}
      >
        Usage
      </Button>
      {isOpen && (
        <Modal>
          <Button
            className="close-modal"
            onClick={handleClick}
          >
            &times;
          </Button>
          <ModalItem
            key={isActive}
            isActive={isActive}
            modalData={modalData}
          />
        </Modal>
      )}
      {isOpen && <Overlay onClick={handleClick} />}
    </div>
  );
}

// Reusable component
function Button({ children, className = 'show-modal', onClick, num }) {
  return (
    <button
      num={num}
      className={className}
      onClick={() => onClick(num)}
    >
      {children}
    </button>
  );
}

// Composition
function Modal({ children }) {
  return <div className="modal">{children}</div>;
}

function ModalItem({ modalData, isActive }) {
  return (
    <>
      <h1>{modalData[isActive].title}</h1>
      <p>{modalData[isActive].description}</p>
    </>
  );
}

function Overlay({ onClick }) {
  return (
    <div
      className="overlay"
      onClick={onClick}
    ></div>
  );
}
