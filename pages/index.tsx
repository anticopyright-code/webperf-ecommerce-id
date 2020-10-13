import React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import dataEcommerce from '../constants/ecommerce';
import { EcommerceItem } from '../types';

import Layout from '../components/Layout';
import reports from '../reports/output';
import { getPerfColorClass } from '../utils/getColorClass';

const Home = ({ lastReport, lastUpdate }): React.ReactElement => {
  return (
    <Layout>
      <h3 className="text-gray-900 text-xl font-bold">Last update {lastUpdate}</h3>

      {lastReport.map((item) => (
        <Link href={`/${item.n.toLowerCase()}`} key={item.n}>
          <a href={`/${item.n.toLowerCase()}`}>
            <div className="mt-4 p-4 bg-white shadow overflow-hidden rounded-lg">
              <img className="h-10 w-auto rounded" src={item.logo} alt={item.n} />
              <div className="flex justify-start">
                <div className="text-gray-600 my-2 mr-2">
                  <small className="text-sm font-bold">Desktop</small>
                  <div className="flex justify-start items-center">
                    <span className={`text-5xl font-bold capitalize ${getPerfColorClass(item.d.perf)}`}>
                      {(item.d.perf * 100).toFixed(0)}
                    </span>

                    {item.d.perf < item.dPrev.perf ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-600"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    )}

                    <span className={`text-xl font-bold capitalize text-gray-600`}>
                      {(item.dPrev.perf * 100).toFixed(0)}
                    </span>
                  </div>
                </div>
                <div className="text-gray-600 my-2 ml-2">
                  <small className="text-sm font-bold">Mobile</small>
                  <div className="flex justify-start items-center">
                    <span className={`text-5xl font-bold capitalize ${getPerfColorClass(item.m.perf)}`}>
                      {(item.m.perf * 100).toFixed(0)}
                    </span>

                    {item.m.perf < item.mPrev.perf ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-600"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500"
                      >
                        <polyline points="18 15 12 9 6 15"></polyline>
                      </svg>
                    )}

                    <span className={`text-xl font-bold capitalize text-gray-600`}>
                      {(item.mPrev.perf * 100).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const reportDates = Object.keys(reports) || [];
  const lastDate = reportDates[reportDates.length - 1] || '';
  const prevDate = reportDates[reportDates.length - 2] || '';

  const lastReport = reports[lastDate] || [];
  const prevReport = reports[prevDate] || [];
  const lastReportSorted = lastReport.length > 0 ? lastReport.sort((a, b) => b.d.perf - a.d.perf) : [];

  const findPrevReport = (n: string) => {
    return prevReport.find((report) => report.n === n);
  };

  const findCommerce = (name) =>
    dataEcommerce.find((i: EcommerceItem) => i.name.toLowerCase() === name.toLowerCase()) || { logo: '' };

  const mergeWithPrev = lastReportSorted.map((item: any) => {
    const pReport = findPrevReport(item.n);
    const commerce = findCommerce(item.n);
    return {
      ...item,
      logo: commerce.logo,
      mPrev: pReport.m,
      dPrev: pReport.d,
    };
  });

  return { props: { lastReport: mergeWithPrev, lastUpdate: lastDate } };
};

export default Home;
