import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-light-brown flex justify-center items-center flex-1 h-[75vh]">
      <div
        style={{
          boxShadow: '#132226 0px 1px 22px',
        }}
        className="relative w-4/5 lg:w-4/6 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-light-gray shadow-xl rounded-2xl bg-dark-gray animate-fade-in-down"
      >
        <div className="text-center pb-6">
          <h1 className="text-dark-brown text-5xl pt-6">A propos de nous</h1>
        </div>
        <div className="text-white p-12 pt-12 antialiased tracking-wide leading-8 italic space-y-7">
          <h3 className="fond-bold text-2xl not-italic text-dark-brown">
            William T
          </h3>
          <p className="text-light-gray">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quis
            molestiae culpa illum illo, dolor possimus laudantium enim iusto
            totam tenetur repellat earum expedita? Voluptatem, nostrum
            doloribus. Repellendus, minus tempore?
          </p>
          <h3 className="fond-bold text-2xl not-italic text-dark-brown">
            Tommy D
          </h3>
          <p className="text-light-gray">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quis
            molestiae culpa illum illo, dolor possimus laudantium enim iusto
            totam tenetur repellat earum expedita? Voluptatem, nostrum
            doloribus. Repellendus, minus tempore?
          </p>
          <h3 className="fond-bold text-2xl not-italic text-dark-brown">
            Willam M
          </h3>
          <p className="text-light-gray">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quis
            molestiae culpa illum illo, dolor possimus laudantium enim iusto
            totam tenetur repellat earum expedita? Voluptatem, nostrum
            doloribus. Repellendus, minus tempore?
          </p>
          <h3 className="fond-bold text-2xl not-italic text-dark-brown">
            Célestin J
          </h3>
          <p className="text-light-gray">
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
