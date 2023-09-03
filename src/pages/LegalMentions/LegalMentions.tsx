import React from 'react';

const LegalMentions: React.FC = () => {
  return (
    <div className="bg-light-brown flex justify-center items-center flex-1 h-[75vh]">
      <div
        style={{
          boxShadow: '#132226 0px 1px 22px',
        }}
        className="relative w-4/5 lg:w-4/6 h-4/5 max-h-4/5 flex flex-col overflow-y-auto shadow-light-gray shadow-xl rounded-2xl bg-dark-gray animate-fade-in-down"
      >
        <div className="text-center pb-6">
          <h1 className="text-dark-brown text-5xl pt-6">Mentions légales</h1>
          <div className="p-12 pt-12 antialiased tracking-wide leading-8 italic space-y-7 text-light-gray">
            <p>
              La réglementation de la publicité en faveur de l’alcool est un
              numéro d’équilibriste entre liberté du commerce et protection de
              la santé publique. Le législateur s’est attaché à encadrer cette
              publicité tant sur ses supports que sur son contenu.
            </p>
            <p>
              La loi définit limitativement les supports sur ou via lesquels la
              publicité en faveur de l’alcool est autorisée. Tous les supports
              non mentionnés par la loi sont interdits. <br /> Ainsi la
              publicité à la télévision ou au cinéma est interdite, tout comme
              la publicité dans les publications destinées à la jeunesse ou à la
              radio aux heures où il est possible que des enfants soient à
              l’écoute. De même si la loi a autorisé la publicité sur Internet,
              elle a cependant exclu les sites destinés à la jeunesse ou liés au
              sport. La loi a toutefois autorisé la publicité par affichage.{' '}
              <br />
              La loi limite les contenus des publicités en faveur des boissons
              alcooliques à leurs éléments dits « objectifs » (origine,
              description, mode de consommation, etc.). Le but est de permettre
              une présentation des produits sans pour autant inciter à la
              consommation. <br /> Sauf cas particuliers, les publicités doivent
              comporter un message sanitaire préventif « L’abus d’alcool est
              dangereux pour la santé ».
            </p>
            <p>
              La mention « À consommer avec modération » installée par
              l&apos;usage n&apos;est pas réglementaire. La loi interdit
              également les opérations de parrainage (lors de manifestations
              sportives, festives ou culturelles par exemple) par les
              producteurs de boissons alcooliques. Seul le mécénat est autorisé.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalMentions;
