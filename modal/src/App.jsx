import { useEffect, useState } from "react";
import { modalData } from "./data.jsx";
import "./index.css";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [handleCloseModal]);

  // handler functions
  function handleSelectModal(num) {
    setSelectedId((s) => num);
    setIsOpen(true);
  }

  function handleCloseModal() {
    setSelectedId("");
    setIsOpen(false);
  }

  return (
    <div className="app">
      <ButtonList
        modalData={modalData}
        onSelectModal={handleSelectModal}
      />
      {isOpen && (
        <>
          <Modal>
            <Button
              className="close-modal"
              onClick={handleCloseModal}
            >
              &times;
            </Button>
            <ModalItem
              modalData={modalData}
              selectedId={selectedId}
            />
          </Modal>
          <Overlay onCloseModal={handleCloseModal} />
        </>
      )}
    </div>
  );
}

// Components
function ButtonList({ modalData, onSelectModal }) {
  return (
    <div>
      {modalData.map((m) => (
        <Button
          className="show-modal"
          key={m.dataID + m.tab}
          {...m}
          onClick={() => onSelectModal(m.dataID)}
        >
          {m.tab}
        </Button>
      ))}
    </div>
  );
}

function Modal({ children }) {
  return <div className="modal">{children}</div>;
}

function ModalItem({ modalData, selectedId }) {
  return (
    <>
      <h1>{modalData[selectedId - 1].title}</h1>
      <p>{modalData[selectedId - 1].description}</p>
    </>
  );
}

function Overlay({ onCloseModal }) {
  return (
    <div
      className="overlay"
      onClick={onCloseModal}
    ></div>
  );
}

// Reusable
function Button({ children, className = "show-modal", onClick }) {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
