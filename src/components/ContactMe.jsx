import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Notification from "./Notification";

function ContactMe({ backgroundImage, contact }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const form = useRef();
  const [notification, setNotification] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);

  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setIsEmailValid(false);
      setNotification({
        message: "Please enter a valid email address.",
        type: "error",
      });
      return;
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then(
      (result) => {
        console.log("Email successfully sent!", result.text);
        setName("");
        setEmail("");
        setMessage("");
        setNotification({
          message: "Email sent successfully!",
          type: "success",
        });
      },
      (error) => {
        console.log("Failed to send email:", error.text);
        setNotification({
          message: "Failed to send email. Please try again.",
          type: "error",
        });
      }
    );
  };
  const closeNotification = () => {
    setTimeout(() => {
      setNotification(null);
    }, 300);
  };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage.fields.file.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-md scale-110"
          style={backgroundStyle}
        ></div>
      )}
      <div className="absolute inset-0 bg-dark-text bg-opacity-40"></div>
      <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row">
        {/* Contact Form */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-6 text-white">Get in Touch</h2>
            <form
              ref={form}
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="mb-4">
                <label
                  htmlFor="from_name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="from_name"
                  id="from_name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="reply_to"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="reply_to"
                  id="reply_to"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailValid(validateEmail(e.target.value));
                  }}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  required
                ></textarea>
              </div>
              <input type="hidden" name="to_name" value="Your Name" />
              <button
                type="submit"
                className="bg-sky-blue-400 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </section>
  );
}

export default ContactMe;
