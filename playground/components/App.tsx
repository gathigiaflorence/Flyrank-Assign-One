import { useState } from "react";
import { Modal } from "./Modal";
import { Tabs } from "./Tabs";
import { Disclosure } from "./Disclosure";

export default function TestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabItems = [
    { id: "1", label: "Tab 1", content: <p>Content for Tab 1</p> },
    { id: "2", label: "Tab 2", content: <p>Content for Tab 2</p> },
  ];

  return (
    <div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "30px" }}>
      {/* 1. Modal Trigger */}
      <section>
        <h2>1. Modal Test</h2>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Test Modal">
          <p>Inside the modal.</p>
          <button onClick={() => alert("Action clicked!")}>Action</button>
        </Modal>
      </section>

      {/* 2. Tabs Test */}
      <section>
        <h2>2. Tabs Test</h2>
        <Tabs tabs={tabItems} />
      </section>

      {/* 3. Disclosure Test */}
      <section>
        <h2>3. Disclosure Test</h2>
        <Disclosure title="Toggle Details">
          <p>Hidden content revealed!</p>
        </Disclosure>
      </section>
    </div>
  );
}