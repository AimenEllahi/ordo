"use client";
import ArrowUpRight from "../ui/icons/ArrowRight";
import HandIcon from "../ui/icons/Hand";
import RotateRight from "../ui/icons/RotateRight";
import RotateLeft from "../ui/icons/Rotateleft";
import useHistoryStore from "@/store/useHistoryStore";

const RightBar = () => {
  const { state, setState, undo, redo, history, future } = useHistoryStore();
  console.log(history, future);
  return (
    <div className="fixed z-50 right-4 items-center justify-center gap-3 top-1/4 -translate-y-1/2 flex flex-col p-2 py-3 rounded-xl shadow-md bg-white">
      <button
        className={`p-2 cursor-pointer rounded-lg ${
          state.activeMode === "cursor" ? "bg-gray-300" : "bg-white"
        }`}
        onClick={() => setState({ activeMode: "cursor" })}
      >
        <ArrowUpRight className="w-5 h-5 " />
      </button>

      <button
        className={`p-2 cursor-pointer rounded-lg ${
          state.activeMode === "hand" ? "bg-gray-300" : "bg-white"
        }`}
        onClick={() => setState({ activeMode: "hand" })}
      >
        <HandIcon className="w-5 h-5" />
      </button>

      <hr className="border-[1px] w-3/4 border-gray-300 " />

      {/* Undo */}
      <button
        className="p-[5px] disabled:opacity-40"
        onClick={undo}
        disabled={history.length === 0}
      >
        <RotateLeft className="fill-black" />
      </button>

      {/* Redo */}
      <button
        className="p-[5px] disabled:opacity-40"
        onClick={redo}
        disabled={future.length === 0}
      >
        <RotateRight className="fill-black" />
      </button>
    </div>
  );
};

export default RightBar;
