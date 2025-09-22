import React from "react";
import { FAQPage, Question, Answer } from "schema-dts";
import Head from "next/head";
import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaXTwitter,
} from "react-icons/fa6";

export default function CustomerServicePage() {
  const faqs = [
    {
      question: "How do I place an order on Vapezone Kenya?",
      answer:
        "Browse our products, select your preferred item, choose any applicable options (e.g., flavour, nicotine strength), then click 'Add to Cart'. Proceed to checkout, fill in your delivery details, and confirm payment.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Lipa na M-PESA, Buy Goods, Till: 3763670. We also accept Cash On Delivery.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Nairobi deliveries typically arrive in 20 minutes the same day if ordered before 10pm. Other regions in Kenya take 1–3 business days.",
    },
    {
      question: "Can I return or exchange an item?",
      answer:
        "Yes. We have a 7-day return policy for unopened and unused products in their original packaging. Contact our support team to initiate a return.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach us via WhatsApp, email (vapezonekenya@gmail.com), or by using our contact form on the website.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map<Question>((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      } as Answer,
    })),
  } as FAQPage & { "@context": string };

  return (
    <>
      <Head>
        <title>Customer Service | Vapezone Kenya</title>
        <meta
          name="description"
          content="Need help with your order? Contact Vapezone Kenya's Customer Service for assistance with payments, shipping, returns, and product information."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </Head>

      <main className="max-w-6xl mx-auto px-6 py-16 text-gray-900">
        <header className="text-center mb-14">
          <h1 className="text-3xl font-extrabold tracking-tight mb-4">
            Customer Service
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your satisfaction is our priority. Explore answers to common
            questions or reach out directly—we’re here to help.
          </p>
        </header>

        <section className="grid gap-8">
          {faqs.map((faq, index) => (
            <article
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {faq.question}
              </h2>
              <p className="mt-2 text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-20 bg-white border border-gray-200 rounded-2xl p-10 shadow-md">
          <h2 className="text-3xl font-bold mb-6">Need More Help?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl">
            Our support team is available to assist you with orders, payments,
            deliveries, and product inquiries. Reach us through any of the
            following channels:
          </p>

          <div className="grid sm:grid-cols-2 gap-6 text-gray-800">
            <div>
              <h3 className="font-semibold mb-2">Connect With Us</h3>
              <div className="flex gap-4 text-2xl">
                <a
                  href="https://twitter.com/vapezonekenya"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-black"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="https://www.instagram.com/vapezonekenya/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-500"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61579752452893"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-600"
                >
                  <FaFacebook />
                </a>
                <a
                  href="mailto:vapezonekenya@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-red-500"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Call for Enquiries</h3>
              <p>+254 798 769 535</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <a
                href="mailto:vapezonekenya@gmail.com"
                className="text-blue-600 hover:underline"
              >
                vapezonekenya@gmail.com
              </a>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p>Available during business hours</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
