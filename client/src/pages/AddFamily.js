import Controls from "../controls";
import {SaveData}  from "../config/SaveData";
import { useForm } from "../utils/useForm";
import { useRef } from "react";

const AddFamily = () => {
  const form = useRef()
  const initialValue = {
    familyName: "",
    person: "",
    gender: "",
    profile: "",
  };
  const { input,setInput, error, setError, handleInput } =
    useForm(initialValue);


  const fileType = ["image/jpeg", "image/jpg", "image/png"];
  const validate = () => {
    const temp = {};
    temp.familyName = input.familyName ? "" : "Enter family name";
    temp.person = input.person ? "" : "Enter person name";
    temp.profile = input.profile ? "" : "Please select profile";
    temp.profile = fileType.includes(input?.profile[0]?.type)
      ? ""
      : "Please select valid image";
    temp.gender = input.gender ? "" : "Please select gender";

    setError({
      ...temp,
    });

    return Object.values(temp).every((x) => x == "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        name: input.familyName,
        person: input.person,
        gender: input.gender,
        profile: input.profile[0],
      };
   
      
      SaveData(data)
      .then(res =>{
        if(res.msg == "DATA_SAVED"){
          e.target.reset()
          setInput(initialValue)
        }else{
          alert("Something went wrong")
        }
      })
     

    }
  };
  return (
    <div className="p-3 bg-gray-600 w-1/3 mx-auto rounded">
      <form onSubmit={handleSubmit} encType="multipart/form-data" ref={form}>
        <Controls.Input
          type="text"
          name="familyName"
          placeholder="Enter family name"
          value={input.familyName}
          onChange={handleInput}
          error={error.familyName}
          label="Family Name"
        />

        <Controls.Input
          type="text"
          name="person"
          placeholder="Enter person name"
          value={input.person}
          onChange={handleInput}
          error={error.person}
          label="Person Name"
        />

        <Controls.Input
          type="file"
          name="profile"
          onChange={handleInput}
          error={error.profile}
          label="Profile"
        />

        <div className="flex gap-4">
          <Controls.Radio
            name="gender"
            value="male"
            onChange={handleInput}
            error={error.gender}
            label="Male"
          />
          <Controls.Radio
            name="gender"
            value="female"
            onChange={handleInput}
            label="Female"
          />
        </div>
        <Controls.Input value="Submit" type="submit" />
      </form>
    </div>
  );
};

export default AddFamily;
