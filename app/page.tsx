"use client";
import { useEffect, useState } from "react";
import { Hero, Loading, ProductCard } from "@/components";
import { fetchAll } from "./Redux/features/Products/productsSlice";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "./Redux/hook";
import { category } from "../constants";

export default function Home() {
  const product = useAppSelector((state) => state.products);
  const { loading, error } = product;
  const [products, setProducts] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState(category[0]);
  const [searchParam, setSearchParam] = useState("?category=groceries");
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const fetchProducts = async () => {
    const res = await dispatch(fetchAll(searchParam));

    setProducts(res.payload);
  };

  const handleOnChangeCategory = (index: number) => {
    setSelectedCategory(category[index]);
    setSearchParam(`?category=${category[index]}`);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchParam]);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Our Products</h1>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="searchbar__item mt-5">
              <input
                className="searchbar__input"
                placeholder="Search here"
                value={search}
                onChange={(e) => handleSearch(e)}
              />
            </div>
            <div className="flex flex-row ">
              <div className="mt-12 pr-10">
                <p className="text-xl">Category</p>
                <div className="flex flex-col">
                  {category.map((el, index) => {
                    return (
                      <label key={el}>
                        <input
                          type="radio"
                          name={el}
                          value={category}
                          checked={selectedCategory === category[index]}
                          onChange={() => handleOnChangeCategory(index)}
                        />
                        {el}
                      </label>
                    );
                  })}
                </div>
              </div>
              {products?.length !== 0 ? (
                <div className="home__cars-wrapper">
                  {products
                    .filter(
                      (el: any) => search == null || el.title.includes(search)
                    )
                    .map((el: any) => {
                      return (
                        <Link key={el._id} href={`/${el._id}`}>
                          <ProductCard
                            _id={el._id}
                            title={el.title}
                            brand=""
                            category=""
                            thumbnail={el.thumbnail}
                            description={el.description}
                            price={el.price}
                            rating={el.rating}
                            discountPercentage={el.discountPercentage}
                          />
                        </Link>
                      );
                    })}
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <h2 className="text-black text-xl font-bold">
                    Oops, no products
                  </h2>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
