import { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-5xl mx-auto md:px-6 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          We'd love to hear from you! Whether you have a question about our services, need support, or want to give feedback, our team is here to help.
        </p>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
        <div className="dark:border p-6 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-md">
          <h3 className="font-bold text-xl mb-2">Email</h3>
          <p className="text-gray-700 dark:text-gray-300 flex-wrap">support@safepay.com</p>
        </div>
        <div className="dark:border p-6 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-md">
          <h3 className="font-bold text-xl mb-2">Phone</h3>
          <p className="text-gray-700 dark:text-gray-300">+1 (555) 123-4567</p>
        </div>
        <div className="dark:border p-6 rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-md">
          <h3 className="font-bold text-xl mb-2">Address</h3>
          <p className="text-gray-700 dark:text-gray-300">123 Finance Street, New York, NY</p>
        </div>
      </div>

      {/* Contact Form */}
      {submitted ? (
        <div className="p-6 rounded-2xl bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-center font-semibold mb-12">
          Thank you! We will get back to you shortly.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="flex flex-col gap-4 mb-12"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-800 dark:text-gray-200"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-800 dark:text-gray-200"
            required
          />
          <textarea
            placeholder="Your Message"
            className="p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-800 dark:text-gray-200"
            rows={5}
            required
          />
          <button className="px-4 py-3 bg-primary text-white rounded-md cursor-pointer">Submit</button>
        </form>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
        <div className="flex justify-center gap-6 text-3xl text-gray-700 dark:text-gray-300">
          <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-primary transition-colors">
            <FaFacebookF className="w-5 h-5 md:w-8 md:h-8 "/>
          </Link>
          <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors">
            <FaTwitter className="w-5 h-5 md:w-8 md:h-8 "/>
          </Link>
          <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
            <FaLinkedinIn className="w-5 h-5 md:w-8 md:h-8 "/>
          </Link>
          <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors">
            <FaInstagram className="w-5 h-5 md:w-8 md:h-8 "/>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
