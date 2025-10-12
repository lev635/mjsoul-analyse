import Modal from 'react-modal';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 50,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '42rem',
    maxHeight: '80vh',
    padding: '1.5rem',
    borderRadius: '0.5rem',
    border: 'none',
  },
};

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">使い方</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            x
          </button>
        </div>
        <div className="space-y-4">
          <section>
            <h3 className="text-lg font-bold mb-2">1. プレイヤー検索</h3>
            <p>右側のテキストボックスにプレイヤー名を入力し、「取得」ボタンを押すとプレイヤーのデータが取得されます。</p>
          </section>
          <section>
            <h3 className="text-lg font-bold mb-2">2. 散布図</h3>
            <p>左側の散布図では、横軸・縦軸の指標を選択してプレイヤーの分布を確認できます。</p>
          </section>
          <section>
            <h3 className="text-lg font-bold mb-2">3. プレイヤー分析</h3>
            <p>検索したプレイヤーのレーダーチャートとアドバイスが表示されます。各プレイヤーの特徴やプレイスタイルを確認できます。</p>
          </section>
        </div>
      </div>
    </Modal>
  );
}
