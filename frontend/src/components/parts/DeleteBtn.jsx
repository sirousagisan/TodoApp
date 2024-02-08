import React, { useContext} from 'react'
import { DelContext } from '../contexts/ModalContext';
import CustomModal from './CustomModal';

const DeleteBtn = ({todo}) => {
  const [, setDel] = useContext(DelContext)
  
  const handleClose = () => {
    setDel(false);
  };
  return (
<>
<CustomModal buttonLabel="delete" header={"Delete Todo"} context={DelContext}>
  <div className="text-blue-100 mx-4 my-2">
    本当に削除しますか？
  </div>
  <div className="flex flex-row gap-4 mt-4">
    <button className="text-blue-200 bg-indigo-700 border-2 border-blue-200 rounded-md px-4 py-2 " onClick={handleClose}>
      もどる
    </button>
    <button className="text-blue-200 bg-red-950 border-2 border-blue-200 rounded-md px-4 py-2 ">
      削除する
    </button>
  </div>
</CustomModal>

</>
  )
}

export default DeleteBtn