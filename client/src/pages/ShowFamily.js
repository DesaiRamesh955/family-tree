import { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AddMember, Modal } from "../components";
import axios from "../config/API";

import "../css/familyTree.css";

const ShowFamily = () => {
  const ID = useParams().id;
  const [family, setFamily] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [parentId, setparentId] = useState(false);

  useLayoutEffect(() => {
    let isApiSubscribed = true;

    const fetchData = async () => {
      if (isApiSubscribed) {
        try {
          const res = await axios.get(`family/fetch/${ID}`);
          setFamily(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();

    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    };
  }, [ID, isOpen]);

  const handleClick = (id) => {
    setparentId(id);
    setIsOpen(!isOpen);
  };

  const renderTree = (data) => {
    let _family = [];

    for (let member of data) {
      _family.push(
        <li key={member._id}>
          <a onClick={() => handleClick(member._id)} className="cursor-pointer">
            <img
              className="w-10 h-15"
              src={`http://localhost:5000/public/assets/images/${member.image}`}
            />
            <span>{member.person}</span>
          </a>

          {member.children.length > 0 ? (
            <ul>{renderTree(member.children)}</ul>
          ) : null}
        </li>
      );
    }
    return _family;
  };

  return (
    <section className="overflow-x-auto">
      <div>
        <Link className="bg-blue-500 hover:bg-blue-600 px-3 py-2 text-white" to="/"> Back </Link>
      </div>
      <div className="h-full w-full rounded flex justify-start">
        {isOpen ? (
          <Modal>
            <AddMember parentId={parentId} setIsOpen={setIsOpen} />
          </Modal>
        ) : null}

        <div className="tree">
          <ul>{renderTree(family)}</ul>
        </div>
      </div>
    </section>
  );
};

export default ShowFamily;
