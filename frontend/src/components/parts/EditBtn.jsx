import CustomModal from "./CustomModal";
import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

const EditBtn = ({ todo }) => {
  const [, setOpen] = useContext(ModalContext)
  
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <CustomModal buttonLabel="Edit" header={"Edit Todo"} context={ModalContext}>
      <div className="">
        {/* <input type="text" defaultValue={todo.title} /> */}
        <label htmlFor="title" className="text-blue-200 font-bold text-md">Title :</label><br/>
        <input id="title" className="border border-gray-200 rounded-md p-2 mr-2 mt-2 mb-4 text-blue-200 bg-gray-600" type="text" defaultValue="aaa" />
        <br />
        <label htmlFor="description" className="text-blue-200 font-bold text-md ">Description :</label><br/>
        <textarea id="description" rows={5} cols={25} className="border border-gray-200 rounded-md p-2 mr-2 mt-2 mb-4 text-blue-200 bg-gray-600"  defaultValue="" />
        <br></br>
        <button className="border border-blue-200 rounded-md text-blue-200 px-4 py-2 ml-36" onClick={handleClose}>
          Submit
        </button>
      </div>
    </CustomModal>
  )
}

export default EditBtn
