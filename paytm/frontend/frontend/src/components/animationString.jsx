import { TypeAnimation } from "react-type-animation";

export function AnimatedDescription() {
  return (
    <div className="text-white px-10 py-3 text-center">
    <TypeAnimation
        sequence={[
          "Experience the power of Paytm, where innovative technology meets seamless transactions.",
          1000, // wait 1s before replacing the first sentence
          "Utilizing MongoDB, Zod validation, React frontend, Mongoose ORM, DOM Router, Express, and Tailwind CSS, Paytm ensures secure, efficient, and user-friendly transactions.",
          1000,
          "Backed by Amazon Web Services and equipped with a high-speed Content Delivery Network, Paytm delivers reliable performance at scale.",
          1000,
          "Engage effortlessly through the intuitive React UI, accessing a range of financial services tailored to your needs.",
        ]}
        wrapper="span"
        speed={50}
        style={{ fontSize: "2em", display: "inline-block" }}
        repeat={Infinity}
      />
    </div>
  );
}
