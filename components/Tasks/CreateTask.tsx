import { FormEvent, useState } from "react";

type CreateTaskProps = { addNewTask: (taskValue: string) => Promise<void> };

export const CreateTask = ({ addNewTask }: CreateTaskProps) => {
  const [newTask, setNewTask] = useState("");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setNewTask("");
      await addNewTask(newTask);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-row justify-center items-center w-full h-max mt-2 mb-3 p-2 max-w-[600px]"
    >
      <input
        type="text"
        name="newTask"
        placeholder="new task"
        required
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
        className="
        outline focus:outline-primaryDetail outline-offset-2 flex flex-1
        flex-col w-auto h-10 bg-primaryText text-primaryBackground
        border-none rounded p-1"
      />
      <button
        type="submit"
        className="
        hover:bg-primaryDetail hover:text-primaryBackground transition-all
        inline pt-1 pb-1 pr-2 pl-2 ml-4 bg-transparent border-primaryDetail border-2 rounded-md"
      >
        Add
      </button>
    </form>
  );
};
