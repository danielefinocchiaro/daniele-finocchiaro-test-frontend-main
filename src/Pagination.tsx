import React, { BaseSyntheticEvent, useState } from 'react';

import type { BoilerInfo, ToastMessage } from './App';

import classNames from 'classnames';

import { BoilerCard } from './BoilerCard';

export interface BoilerCard {
  cart: BoilerInfo[];
  comparisonList: BoilerInfo[];
  windowComparison: boolean;
  id: string;
  setToCart: (id: BoilerInfo[]) => void;
  setToComparison: (id: BoilerInfo[]) => void;
  handleToast: (props: ToastMessage) => void;
  discount: boolean;
  imageSrc: string;
  articleBrand: string;
  articleDescription: string;
  articleName: string;
  numberStar: number;
  price: number;
  oldPrice?: number;
  discountAmount?: number;
  installation: boolean;
  tipology: string;
  powerType: string;
  locationType: string;
  power: number;
  available: boolean;
}

export function Pagination(props: {
  data: BoilerInfo[];
  pageLimit: number;
  dataLimit: number;
  cart: BoilerInfo[];
  comparisonList: BoilerInfo[];
  onClickItemsHearts: (val: BoilerInfo[]) => void;
  onClickItemsComparison: (val: BoilerInfo[]) => void;
  handleToast: (props: ToastMessage) => void;
}) {
  const pages = Math.max(1, Math.round(props.data.length / props.dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    if (currentPage + 1 <= pages) {
      setCurrentPage(currentPage + 1);
    } else {
      return;
    }
  }

  function goToPreviousPage() {
    if (currentPage - 1 <= pages && currentPage - 1 > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      return;
    }
  }

  function changePage(event: BaseSyntheticEvent) {
    const pageNumber = Number(event.target.textContent);
    if (!isNaN(pageNumber)) {
      setCurrentPage(pageNumber);
    } else {
      return;
    }
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * props.dataLimit - props.dataLimit;
    const endIndex = startIndex + props.dataLimit;
    return props.data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start =
      Math.floor((currentPage - 1) / props.pageLimit) * props.pageLimit;
    return new Array(pages > props.pageLimit ? props.pageLimit : pages)
      .fill({})
      .map((_, i) => {
        let pageN = start + i + 1;
        if (pageN > pages) return '-';
        else return pageN;
      });
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="text-indigo-600 font-medium flex flex-row-reverse mx-8">
          <select name="order" className="text-indigo-600 font-medium">
            <option value="bestReviews">migliori Recensioni</option>
            <option value="bestPrices">migliori Prezzi</option>
            <option value="discount">in Sconto</option>
          </select>
          Ordina per:
        </div>
        <div className="flex justify-around flex-wrap">
          {getPaginatedData().map((cardData, i) => {
            let propsToCard: BoilerCard = {
              ...cardData,
              cart: props.cart,
              comparisonList: props.comparisonList,
              windowComparison: false,
              setToCart: props.onClickItemsHearts,
              setToComparison: props.onClickItemsComparison,
              handleToast: props.handleToast,
            };

            return <BoilerCard key={i} {...propsToCard} />;
          })}
        </div>
        <hr className="mt-12 mx-6" />
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1 ? true : false}
            className="text-xl text-indigo-800 p-3 cursor-pointer m-4 text-center focus:outline-none disabled:text-blueGray-700 disabled:cursor-not-allowed disabled:border-blueGray-400 disabled:opacity-50"
          >
            {'<'} Prev
          </button>

          <div>
            {getPaginationGroup().map((page, i) => (
              <button
                key={i}
                onClick={changePage}
                className={classNames(
                  `w-10 h-10 font-medium rounded-full m-2 focus:outline-none`,
                  currentPage === page
                    ? 'bg-indigo-600 text-white shadow-xl'
                    : 'text-gray-600',
                )}
              >
                <span>{page}</span>
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === pages ? true : false}
            className="text-xl text-indigo-800 p-3 cursor-pointer m-4 text-center focus:outline-none disabled:text-blueGray-700 disabled:cursor-not-allowed disabled:border-blueGray-400 disabled:opacity-50"
          >
            Next {'>'}
          </button>
        </div>
      </div>
    </>
  );
}
