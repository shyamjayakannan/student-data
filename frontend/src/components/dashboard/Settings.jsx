import React, { useState } from "react";
import classes from "../../styles/dashboard/dashboard.module.css";
import Image from "next/image";

import cal from "../../styles/settings.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={cal.modal}>
      <div className={cal.modal_content}>{children}</div>
    </div>
  );
};

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  let initialContents = [
    {
      name: "ML/AI",
      check: false,
    },
    {
      name: "Web Developer",
      check: false,
    },
    {
      name: "Software Developer",
      check: false,
    },
    {
      name: "Technical Consultant",
      check: false,
    },
    {
      name: "Research Consultant",
      check: false,
    },
    {
      name: "Research Trainee",
      check: false,
    },
    {
      name: "Management Trainee",
      check: false,
    },
  ];

  const [contents, setContents] = useState([...initialContents]);

  const handleCheck = (name) => {
    const updatedContents = contents.map((item) => {
      if (item.name === name) {
        return { ...item, check: !item.check };
      }
      return item;
    });
    setContents(updatedContents);

    // console.log(contents)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contents);
    setIsModalOpen(false);
  };

  return (
    <div className={classes.main_cont}>
      <Image
        src="/images/settings.png"
        alt="setting"
        height={300}
        width={300}
      />
      <p className={cal.text}>
        Select the category/categories of the companies:
      </p>

      <button onClick={openModal} className={cal.open}>Categories</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <div className={cal.content}>
            {contents.map((ele) => (
              <span className={cal.inputs + " " + cal.grid_item} key={ele.name}>
                <input
                  type="checkbox"
                  checked={ele.check}
                  className={cal.check}
                  name={ele.name}
                  onChange={() => handleCheck(ele.name)}
                />
                {ele.name}
              </span>
            ))}
          </div>
          <div className={cal.buts}>
            <button type="submit" className={cal.done}>
              Done
            </button>
            <button onClick={closeModal} className={cal.btn}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Settings;
