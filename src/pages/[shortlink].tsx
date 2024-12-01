// pages/[shortlink].tsx
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Props = {
  redirectUrl: string | null;
};

const ShortLinkPage = ({ redirectUrl }: Props) => {
  const router = useRouter();

  useEffect(() => {
    if (redirectUrl) {
      router.replace(redirectUrl.startsWith('http') ? redirectUrl : `http://${redirectUrl}`);
    }
  }, [redirectUrl, router]);

  return (
    <div>
      {redirectUrl ? (
        <p>Redirecting...</p>
      ) : (
        <p>Short link not found</p>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { shortlink } = context.params!;
  const prisma = new PrismaClient();
  const linkData = await prisma.link.findUnique({
    where: {
      short: shortlink as string,
    },
  });

  return {
    props: {
      redirectUrl: linkData ? linkData.url : null,
    },
  };
};

export default ShortLinkPage;
