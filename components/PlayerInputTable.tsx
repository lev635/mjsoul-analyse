import { Dispatch, SetStateAction } from 'react';

interface PlayerInputTableProps {
  playerNames: string[];
  setPlayerNames: Dispatch<SetStateAction<string[]>>;
  onFetchData: () => void;
  scraping: boolean;
}

const colors = ['red', 'blue', 'green', 'yellow'];

export default function PlayerInputTable({
  playerNames,
  setPlayerNames,
  onFetchData,
  scraping
}: PlayerInputTableProps) {
  const handleNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold">プレイヤー検索</h2>
      <div className="relative h-[280px]">
        {/* 対面 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors[2] }}></div>
          <input
            type="text"
            placeholder="対面"
            value={playerNames[2]}
            onChange={(e) => handleNameChange(2, e.target.value)}
            className="border-2 border-black rounded px-2 py-1 w-28 text-sm"
          />
        </div>

        {/* 上家 */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors[3] }}></div>
          <input
            type="text"
            placeholder="上家"
            value={playerNames[3]}
            onChange={(e) => handleNameChange(3, e.target.value)}
            className="border-2 border-black rounded px-2 py-1 w-28 text-sm"
          />
        </div>

        {/* ボタン */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-green-700 rounded-lg flex flex-col items-center justify-center p-3">
          <button
            onClick={onFetchData}
            disabled={scraping || playerNames.every(n => !n.trim())}
            className="bg-white text-green-700 w-16 h-16 rounded font-bold hover:bg-gray-100 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed text-xs flex items-center justify-center"
          >
            {scraping ? '取得中' : '取得'}
          </button>
        </div>

        {/* 下家 */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors[1] }}></div>
          <input
            type="text"
            placeholder="下家"
            value={playerNames[1]}
            onChange={(e) => handleNameChange(1, e.target.value)}
            className="border-2 border-black rounded px-2 py-1 w-28 text-sm"
          />
        </div>

        {/* 自家 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: colors[0] }}></div>
          <input
            type="text"
            placeholder="自家"
            value={playerNames[0]}
            onChange={(e) => handleNameChange(0, e.target.value)}
            className="border-2 border-black rounded px-2 py-1 w-28 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
