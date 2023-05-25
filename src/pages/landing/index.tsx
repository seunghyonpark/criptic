import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import VoteList from '@/components/vote/vote-list';
import { ExportIcon } from '@/components/icons/export-icon';
// static data
import { getVotesByStatus } from '@/data/static/vote-data';
import votePool from '@/assets/images/vote-pool.svg';
import RootLayout from '@/layouts/_root-layout';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

import LogoMomocon from '@/assets-landing/images/logo-momocon.svg';
import IcoApple from '@/assets-landing/images/ico-apple.svg';
import IcoAndroid from '@/assets-landing/images/ico-android.svg';
import IcoScrolldown from '@/assets-landing/images/ico-scrolldown.svg';

import phonePC from '@/assets-landing/images/img-app.png';
import phoneMobile from '@/assets-landing/images/0_asset.png';

const ProposalsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { layout } = useLayout();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');
  const { totalVote: totalOffChainVote } = getVotesByStatus('off-chain');
  const { totalVote: totalExecutableVote } = getVotesByStatus('executable');
  const { totalVote: totalPastVote } = getVotesByStatus('past');

  return (
    <>
      <NextSeo
        title="Landing"
        description="Granderby - NFT Horse Racing Game"
      />

      <div id="intro">
        <div className="intro-mov">
          <video id="intro-video" src="../mov/intro.mp4" muted autoPlay></video>
        </div>

        <div className="intro-img" data-aos="fade-up"></div>

        <div className="title-wrap" data-aos="fade-up" data-aos-delay="200">
          <h1>
            <span> Granderby</span>
            <span className="line"> Horse Racing</span>
          </h1>
          <div className="btn-wrap">
            <button className="btn-app">
              <Image src={IcoApple} alt="" width={100} height={100} />
              Download App
            </button>
            <button className="btn-app">
              <Image src={IcoAndroid} alt="" width={100} height={100} />
              Download App
            </button>
          </div>
        </div>

        <a className="btn-scroll" href="#howto" data-aos="fade-up">
          <Image src={IcoScrolldown} alt="" width={100} height={100} />
          <p>SCROLL</p>
        </a>
      </div>

      <div className="mobile-wrap m-hidden">
        <div className="phone">
          <Image src={phonePC} alt="" width={100} height={100} />
        </div>
        <div className="back-phone" data-aos="fade-up"></div>
      </div>

      <div
        className="mobile-wrap-m pc-hidden"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        <div className="phone-m">
          <Image src={phoneMobile} alt="" width={100} height={100} />
        </div>
      </div>

      <footer>
        <div className="footer-wrap">
          <Image src={LogoMomocon} alt="MOMOCON" width={48} height={48} />
          <p>
            MOMOCON SG CO.,LTD.
            <br />
            Copyrights NFT GRANDERBY since 2022
          </p>
        </div>
      </footer>

      {/*
      <footer>
        <div className="footer-wrap">
          <img src="../images/logo-momocon.svg" alt="MONOCON">
          <p>MOMOCON SG CO.,LTD.<br/> 
            Copyrights NFT GRANDERBY since 2022</p>
        </div>
      </footer>
  */}
    </>
  );
};

ProposalsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProposalsPage;
