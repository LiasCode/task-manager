export const SaveTasksBox = ({
  isSuccessfullyTaskSave,
  saveTasks,
}: {
  isSuccessfullyTaskSave: boolean | null;
  saveTasks: () => void;
}) => {
  return (
    <div className="flex flex-row w-max p-1 items-center justify-center">
      {isSuccessfullyTaskSave === null ? (
        false
      ) : isSuccessfullyTaskSave ? (
        <span className="text-xl text-green-300">Check</span>
      ) : (
        <span className="text-xl text-red-500">Error</span>
      )}
      <button
        type="button"
        className="
        hover:bg-primaryDetail hover:text-primaryBackground transition-all
        inline pt-1 pb-1 pr-2 pl-2 bg-transparent border-primaryDetail border-2 rounded-md"
        onClick={saveTasks}
      >
        Save
      </button>
    </div>
  );
};
