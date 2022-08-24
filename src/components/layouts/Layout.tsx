import Head from "next/head";

type Props = {
  children?: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-screen flex justify-center items-center flex-col min-h-screen font-mono bg-black">
      <Head>
        <title>INJECTION</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <main className="flex flex-1 justify-start items-center w-screen flex-col">
        {children}
      </main>
    </div>
  );
}
