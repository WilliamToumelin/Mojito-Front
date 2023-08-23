/* eslint-disable react/prop-types */
import { BsTrash } from 'react-icons/bs';

type Props = {
  items: string[];
  onRemove: (index: number) => void;
};

const ItemRemove: React.FC<Props> = ({ items, onRemove }) => {
  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 m-1">
            {item}
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              <BsTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemRemove;
