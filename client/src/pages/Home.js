import React, { useLayoutEffect, useState } from "react";
import {Card,Spinner} from "../components";
import axios from "../config/API";
const Home = () => {
  const [fam, setFam] = useState([]);
  const [loading, setloading] = useState(true);

  useLayoutEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      if (isSubscribed) {
        try {
          const res = await axios.get("family/singlefetch");

          setFam((prev) => res.data);
          
        } catch (err) {
          console.log(err);
        }
      }
      setloading(false)
    };
    fetchData();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return loading ?<Spinner />: (
    
    <div className="flex gap-6 flex-wrap">
       
       {
        fam.length > 0 ? fam.map((item) => (
          <Card key={item._id} data={item} />
        )) : <h1 className="text-white font-bold">No data available</h1>
       }

    </div>
  );
};

export default Home;
