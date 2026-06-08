import React from 'react';
import { Helmet } from 'react-helmet-async';
import { OWNER_CONFIG } from '../config/owner';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = OWNER_CONFIG.title,
  description = OWNER_CONFIG.bio,
  keywords = 'Pranav Patil, Pranav Shahaji Patil, Android Specialist, Creative Developer, Kotlin, Java Developer, Android Studio, UI/UX Designer, Software Engineer Portfolio, Pune IT Professional',
  image = '/profil1.png',
  url = window.location.origin
}: SEOProps) {
  const finalTitle = title;
  const finalDescription = description.length > 155 ? `${description.slice(0, 152)}...` : description;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": OWNER_CONFIG.fullName || "Pranav Shahaji Patil",
    "alternateName": OWNER_CONFIG.name || "Pranav Patil",
    "jobTitle": OWNER_CONFIG.role || "Creative Software Developer & Android Specialist",
    "worksFor": {
      "@type": "Organization",
      "name": "AppVishwa Software Solutions Pvt. Ltd."
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Nanasaheb Mahadik Polytechnic Institute"
    },
    "url": url,
    "image": `${url}${image}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "India"
    },
    "description": finalDescription,
    "sameAs": Object.values(OWNER_CONFIG.socials || {}).filter(Boolean),
    "knowsAbout": [
      "Android Development",
      "Java Programming",
      "UI/UX Design",
      "Kotlin",
      "SQL",
      "Android Studio",
      "React",
      "Software Development",
      "DBMS"
    ]
  };

  return (
    <Helmet>
      {/* Standard HTML Head Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={OWNER_CONFIG.fullName} />
      <meta name="theme-color" content="#ffffff" />
      <link rel="canonical" href={url} />

      {/* Schema.org Structured Data for Google's Rich Snippet & Search Knowledge Panel Algorithm */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Open Graph (Facebook / LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={`${OWNER_CONFIG.fullName} Portfolio`} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@pranav_patil" />

      {/* Dynamic Google Site Verification meta tag */}
      {localStorage.getItem('google_site_verification') && (
        <meta name="google-site-verification" content={localStorage.getItem('google_site_verification') || ''} />
      )}

      {/* Search Console Verification or Google Crawler hints */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    </Helmet>
  );
}
