import { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AddMember, Modal,Spinner } from "../components";
import axios,{SERVER_BASE_URL} from "../config/API";

import "../css/familyTree.css";

const ShowFamily = () => {
  const ID = useParams().id;
  const [family, setFamily] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [parentId, setparentId] = useState(false);
  const [loading, setloading] = useState(true);

  useLayoutEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      if (isSubscribed) {
        try {
          const res = await axios.get(`family/fetch/${ID}`);
          setFamily(res.data);
          setloading(false)
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();

    return () => {
      isSubscribed = false;
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
              src={`${SERVER_BASE_URL}/public/assets/images/${member.image}`}
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


  return loading ?  <Spinner />: (
    <section className="w-full">
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
