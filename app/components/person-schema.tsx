export default function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gelyn Keil Z. Dela Cruz",
    jobTitle: "Software Quality Engineer",
    email: "gelynkeil.delacruz@gmail.com",
    telephone: "+639206649886",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
    },
    sameAs: [
      "https://github.com/stellaXanthe",
      "https://www.linkedin.com/in/gelyn-keil-z-dela-cruz/",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Cavite State University",
    },
    knowsAbout: [
      "Software Quality Engineering",
      "Test Automation",
      "Data Validation",
      "Azure DevOps",
      "Playwright",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}