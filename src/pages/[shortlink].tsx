// pages/[shortlink].tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

type Props = {
  redirectUrl: string | null;
};

const ShortLinkPage = ({ redirectUrl }: Props) => {
  const router = useRouter();

  if (typeof window !== 'undefined' && redirectUrl) {
    window.location.href = redirectUrl;
  }

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
  const filePath = path.join(process.cwd(), 'short.json');
  let data = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(fileContent);
  }

  const linkData = data.find((link: { shortlink: string }) => link.shortlink === shortlink);

  return {
    props: {
      redirectUrl: linkData ? linkData.redirectUrl : null,
    },
  };
};

export default ShortLinkPage;
