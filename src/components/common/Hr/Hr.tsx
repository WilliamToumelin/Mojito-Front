import { ImDiamonds } from 'react-icons/im';

const Hr = () => {
  return (
    <div className="relative inline-flex items-center justify-center w-full">
      <hr className="w-2/6 h-px my-8 bg-light-brown border-0" />
      <span className="absolute px-6 font-medium text-light-brown -translate-x-1/2 bg-inherit left-1/2 text-xl md:text-3xl">
        <ImDiamonds className="rotate-90" />
      </span>
    </div>
  );
};

export default Hr;
