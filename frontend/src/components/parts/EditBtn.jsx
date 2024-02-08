import CustomModal from "./CustomModal";

const EditBtn = ({ todo }) => {
  const EditHandler = () => {
    console.log("edit");
  }
  return (
    <CustomModal buttonLabel="Edit">
      <form onSubmit={EditHandler}>
        {/* ToDoの編集フォームをここに追加 */}
        
        <input type="text" defaultValue={todo.title} />
        <input type="text" defaultValue={todo.description} />
        <button type="submit">Save</button>
      </form>
    </CustomModal>
  )
}

export default EditBtn