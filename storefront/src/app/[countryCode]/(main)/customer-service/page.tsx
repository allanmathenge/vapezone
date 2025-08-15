import React from "react";
import { FAQPage, Question, Answer } from "schema-dts";
import Head from "next/head";

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
        "You can reach us via WhatsApp, email (in@vapezone.co.ke), or by using our contact form on the website.",
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

      <main className="max-w-5xl mx-auto px-6 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customer Service
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We’re committed to making your shopping experience smooth, secure,
            and satisfying. Find answers to common questions or reach out to our
            support team for further assistance.
          </p>
        </header>

        <section className="grid gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {faq.question}
              </h2>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 bg-gray-50 rounded-xl shadow-inner p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need More Help?
          </h2>
          <p className="text-gray-700 mb-6">
            Our Customer Service team is here to help you every step of the way.
            Contact us through any of the channels below:
          </p>
          <ul className="grid sm:grid-cols-2 gap-y-3 text-gray-700">
            <li>
              <strong>WhatsApp:</strong> +254 798 769 535
            </li>
            <li>
              <strong>Call for Enquiries:</strong> +254 798 769 535
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:in@vapezone.co.ke"
                className="text-blue-600 hover:underline"
              >
                in@vapezone.co.ke
              </a>
            </li>
            <li>
              <strong>Live Chat:</strong> Available during business hours
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
