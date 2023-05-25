'use client';

import type { NextPageWithLayout } from '@/types';

import Link from 'next/link';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@paperxyz/embedded-wallet-service-rainbowkit';
import { renderPaperCheckoutLink } from '@paperxyz/js-client-sdk';
import { useAccount } from 'wagmi';

import RootLayout from './layout';

import Image from '@/components/ui/image';

export type BlogPost = {
  title: string;
  description: string;
};

const dummyPosts: BlogPost[] = [
  {
    title: 'Lorem Ipsum Dolor Sit Amet',
    description:
      'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    title: 'Vestibulum Ante Ipsum Primis',
    description:
      'Faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel.',
  },
  {
    title: 'Mauris Blandit Aliquet Elit',
    description:
      'Etiam erat velit, scelerisque in dictum non, consectetur eget mi. Vestibulum ante ipsum primis in faucibus.',
  },
  {
    title: 'Cras Ultricies Ligula Sed',
    description:
      'Pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
  },
];

/* ======================================
              Main Component
======================================= */
///const HomePage = () => {

const MintPage: NextPageWithLayout = () => {
  console.log('MintPage=========');

  const [loading, setLoading] = useState(true);
  const [hasNFT, setHasNFT] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  // Thirdweb Stuff
  const sdk = new ThirdwebSDK('mumbai');
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
  const shareableLink = process.env.NEXT_PUBLIC_SHAREABLE_LINK!;
  const minimumBalance = 1;
  const erc1155TokenId = 0;

  const { address, connector } = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
      console.log('Connected');
    },
    onDisconnect() {
      console.log('Disconnected');
      setPosts([]);
      setHasNFT(false);
    },
  });

  useEffect(() => {
    const checkNFT = async () => {
      const contract = await sdk.getContract(contractAddress);

      if (address) {
        const balance = await contract.erc1155.balanceOf(
          address,
          erc1155TokenId
        );
        // const balance = await contract.erc721.balanceOf(address);
        const isValid = balance.gte(minimumBalance);

        if (isValid) {
          const res = await fetch('/api/blogPosts');
          ///const res = await fetch('/apiBlogPosts');
          const posts = await res.json();
          setPosts(posts.data);
          setHasNFT(true);
        } else {
          setPosts([]);
          setHasNFT(false);
        }
      }
    };

    checkNFT();
  }, [address]);

  // Fixes Hydration Issues
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) return null;

  return (
    <div className="text-center">
      {/* Navbar */}
      <nav className="bg-dark-secondary px-4 py-2">
        <div className="flex items-center justify-between px-3 py-3">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/paper.svg"
                alt="Logo"
                width={24}
                height={24}
                className="ml-3 h-9 w-auto"
              />
            </Link>
            <h1 className="text-light-main ml-4 text-2xl font-semibold">
              Paper
            </h1>
          </div>

          <ConnectButton />
        </div>
      </nav>

      {/* Header */}
      <h1 className="mt-12 text-3xl">Demo Blog</h1>

      {/* Blog Posts */}
      {hasNFT ? (
        <div className="bg-dark-main text-light-main mx-auto mb-10 mt-8 max-w-5xl p-4">
          <div className="grid grid-cols-2 gap-4">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-dark-secondary min-h-[200px] rounded p-4 text-left"
              >
                <h2 className="text-light-secondary mb-2 text-xl">
                  {post.title}
                </h2>
                <p className="text-light-tertiary mt-3">{post.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-dark-main text-light-main mx-auto mb-10 mt-8 max-w-5xl p-4">
          <div className="grid grid-cols-2 gap-4">
            {dummyPosts.map((post, index) => (
              <div
                key={index}
                className="bg-dark-secondary min-h-[200px] rounded p-4 text-left"
              >
                <h2 className="text-light-secondary mb-2 text-xl blur-sm">
                  {post.title}
                </h2>
                <p className="text-light-tertiary mt-3 blur-sm">
                  {post.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buy NFT Button */}
      {!address ? null : hasNFT ? null : (
        <button
          onClick={() =>
            renderPaperCheckoutLink({
              checkoutLinkUrl: shareableLink,
            })
          }
          className="bg-dark-tertiary hover:bg-dark-quaternary rounded px-5 py-3 transition-all"
        >
          Buy with Paper
        </button>
      )}
    </div>
  );
};

MintPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default MintPage;
