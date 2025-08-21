import person1 from "../assets/images/person1.jpg";
import person2 from "../assets/images/person2.jpg";
import person3 from "../assets/images/perosn3.jpg";
function About() {
  return (
    <div className="max-w-7xl mx-auto md:px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">About Us</h1>

      {/* Service Story */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          We started with a simple mission: to help people manage their money smarter and faster. Our journey began with a small team of passionate professionals dedicated to
          creating financial tools that are secure, intuitive, and easy to use.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Over the years, we have grown into a diverse team of experts in technology, finance, and design. Each step of the way, we focus on understanding our users’ needs and
          continuously improving our solutions to make financial management accessible for everyone, everywhere.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
          Our mission is to empower millions of people worldwide to take control of their finances in a simple, safe, and efficient way. We aim to reduce the complexity of
          financial planning and provide tools that make smart money management achievable for everyone.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          By combining cutting-edge technology with user-centered design, we are constantly innovating to deliver seamless, reliable, and impactful solutions. From saving and
          budgeting to payments and investment, our goal is to make every financial decision easier and more confident.
        </p>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {data.map((member,i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 text-center">
              {/* <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4"></div> */}
              <img src={member.image} alt={member.name} className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-700 dark:text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const data =[
  {
    image: person1,
    name: "Alice",
    role: "Team Member",
  },
  {
    image: person2,
    name: "Bob",
    role: "Team Member",
  },
  {
    image: person3,
    name: "Charlie",
    role: "Team Member",
  }
]

export default About;
