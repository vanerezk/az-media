import {SITE_URL} from '../data/site';

// React 19 hoists these tags into <head>.
export default function Seo({title, description, path = '/', noindex = false}) {
  const fullTitle = title ? `${title} | AZ Listing Media` : 'AZ Listing Media | Real Estate Photography & Video in Phoenix';
  const url = `${SITE_URL}${path}`;
  return (
    <>
      <title>{fullTitle}</title>
      <meta
        name='description'
        content={description}
      />
      <link
        rel='canonical'
        href={url}
      />
      <meta
        property='og:title'
        content={fullTitle}
      />
      <meta
        property='og:description'
        content={description}
      />
      <meta
        property='og:url'
        content={url}
      />
      {noindex && (
        <meta
          name='robots'
          content='noindex'
        />
      )}
    </>
  );
}
