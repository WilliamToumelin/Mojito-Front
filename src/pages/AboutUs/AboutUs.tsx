import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-[#a4978e] flex justify-center items-center flex-1 h-[75vh]">
      <div className="relative w-4/5 lg:w-4/6 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-[#525B56] shadow-xl rounded-2xl bg-[#132226]">
        <h1 className="text-white text-center font-bold text-3xl">
          A propos de nous
        </h1>
        <div className="text-white p-12 pt-12 antialiased tracking-wide leading-8 italic space-y-7">
          <h3 className="fond-bold text-2xl not-italic">William T</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quis
            molestiae culpa illum illo, dolor possimus laudantium enim iusto
            totam tenetur repellat earum expedita? Voluptatem, nostrum
            doloribus. Repellendus, minus tempore?
          </p>
          <h3 className="fond-bold text-2xl not-italic">Tommy D</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quis
            molestiae culpa illum illo, dolor possimus laudantium enim iusto
            totam tenetur repellat earum expedita? Voluptatem, nostrum
            doloribus. Repellendus, minus tempore?
          </p>
          <h3 className="fond-bold text-2xl not-italic">Willam M</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quis
            molestiae culpa illum illo, dolor possimus laudantium enim iusto
            totam tenetur repellat earum expedita? Voluptatem, nostrum
            doloribus. Repellendus, minus tempore?
          </p>
          <h3 className="fond-bold text-2xl not-italic">Célestin J</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quis
            molestiae culpa illum illo, dolor possimus laudantium enim iusto
            totam tenetur repellat earum expedita? Voluptatem, nostrum
            doloribus. Repellendus, minus tempore?
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
