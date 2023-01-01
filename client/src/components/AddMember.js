import React from "react";
import { SaveData } from "../config/SaveData";
import Controls from "../controls";
import { Form, useForm } from "../utils/useForm";

const AddMember = ({ parentId, setIsOpen }) => {
  const initialValue = {
    person: "",
    gender: "",
    profile: "",
    parentId,
  };

  const { input, setInput, error, setError, handleInput } =
    useForm(initialValue);
    
  const fileType = ["image/jpeg", "image/jpg", "image/png"];
  const validate = () => {
    const temp = {};
    temp.person = input.person ? "" : "Enter person name";
    temp.profile = input.profile ? "" : "Please select profile";
    temp.profile = fileType.includes(input?.profile[0]?.type)
      ? ""
      : "Please select valid image";
    temp.gender = input.gender ? "" : "Please select gender";

    setError({
      ...temp,
    });

    return Object.values(temp).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      const data = {
        person: input.person,
        gender: input.gender,
        profile: input.profile[0],
        parentId,
      };
      SaveData(data).then((res) => {
        console.log(res)
        if (res.msg == "DATA_SAVED") {
          e.target.reset();
          setInput(initialValue);

          setIsOpen(false);
        } else {
          alert("Something went wrong");
        }
      });
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <span className="bg-red-500 hover:bg-red-600 cursor-pointer text-white  font-bold px-3 rounded-sm" onClick={()=>setIsOpen(false)}>X</span>
      </div>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
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
      </Form>
    </div>
  );
};

export default AddMember;
