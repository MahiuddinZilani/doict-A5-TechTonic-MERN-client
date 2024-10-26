// components/FAQSection.js
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "Our return policy lasts 30 days...",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship worldwide...",
    },
    {
      question: "How can I track my order?",
      answer: "You can track your order by...",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept Visa, MasterCard, etc.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700">
                  {faq.question}
                </h3>
                {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {activeIndex === index && (
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
