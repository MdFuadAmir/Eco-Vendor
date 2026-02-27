const teamData = [
  {
    id: 1,
    name: "Md Fuad Amir",
    position: "Founder & CEO",
    image: "https://i.ibb.co.com/HTjSwDhd/fuad.png",
  },
  {
    id: 2,
    name: "Md Maruf Hasan",
    position: "Managing Director",
    image: "https://i.ibb.co.com/HTjSwDhd/fuad.png",
  },
  {
    id: 3,
    name: "Md Arafa Amir",
    position: "Eco Product Advisor",
    image: "https://i.ibb.co.com/HTjSwDhd/fuad.png",
  },
  {
    id: 4,
    name: "Md Arefin Bin Kalam",
    position: "Marketing & Partnership Lead",
    image: "https://i.ibb.co.com/HTjSwDhd/fuad.png",
  },
];
const About = () => {
  const content = {
    company:
      "Eco-Vendex is a modern eco-friendly e-commerce platform that provides sustainable and reusable products. Our goal is to reduce plastic waste and promote green living.",

    mission:
      "Our mission is to inspire people to choose environmentally responsible products and make sustainable living affordable and accessible for everyone.",

    vision:
      "Our vision is to become a global green marketplace that connects conscious consumers with ethical producers.",

    services:
      "We offer biodegradable products, reusable household items, eco lifestyle accessories, and sustainable packaging solutions. Every product is carefully selected to meet environmental standards.",

    future:
      "We plan to expand globally, introduce carbon-neutral delivery, and launch awareness programs for eco-friendly living.",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          About Eco-Vendex
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {content.company}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="p-6 rounded-xl shadow bg-white dark:bg-darknav/80">
          <h2 className="text-2xl font-semibold mb-3 dark:text-white">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {content.mission}
          </p>
        </div>

        <div className="p-6 rounded-xl shadow bg-white dark:bg-darknav/80">
          <h2 className="text-2xl font-semibold mb-3 dark:text-white">
            Our Vision
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {content.vision}
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center dark:text-white">
          What We Offer
        </h2>
        <div className="p-6 rounded-xl shadow bg-white dark:bg-darknav/80">
          <p className="text-gray-600 dark:text-gray-300">
            {content.services}
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
          Our Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {teamData.map((item) => (
            <div
              key={item.id}
              className="p-4 text-center rounded-xl shadow bg-white dark:bg-darknav/80"
            >
              <img
                src={item.image}
                alt="team"
                className="w-20 h-20 mx-auto rounded-full mb-3"
              />

              <h3 className="font-semibold dark:text-white">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">
                {item.position}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Future */}
      <div className="text-center p-8 rounded-xl shadow bg-green-50 dark:bg-darknav/80">
        <h2 className="text-3xl font-bold mb-4 dark:text-white">
          Future Plans
        </h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          {content.future}
        </p>
      </div>
    </div>
  );
};

export default About;