import Head from "next/head";

export default function MainLayout({ title, children }) {
  return (
    <>
      <Head>
        <title>{'Tiny Chat' + (title ? ` | ${title}` : '')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
}
