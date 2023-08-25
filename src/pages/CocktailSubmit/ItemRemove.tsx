/* eslint-disable react/prop-types */
import { TiDelete } from 'react-icons/ti';

type Props = {
  items: string[];
  onRemove: (index: number) => void;
};

const ItemRemove: React.FC<Props> = ({ items, onRemove }) => {
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 m-3">
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="bg-red-700 text-white text-2xl p-1 rounded"
            >
              <TiDelete />
            </button>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemRemove;
