import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards';
import { FaFilter } from "react-icons/fa";

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] =useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOptions, setSortOptions] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, _] = useState(8);

    // loading data
    useEffect(() => {
        // fetch data
        const fetchData = async() => {
            try {
                const response = await fetch("/menu.json");
                const data = await response.json();
                setMenu(data);
                setFilteredItems(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        }

        // call fetch function
        fetchData();
    }, []);

    // filtering data base on category
    const filterItems = (category) => {
        const filltered = category ===  "all" ? menu : menu.filter((item) => item.category === category);
        setFilteredItems(filltered);
        setSelectedCategory(category);
        setCurrentPage(1);
    }

    // show all data
    const showAll = () => {
        setFilteredItems(menu);
        setSelectedCategory("all");
        setCurrentPage(1);
    }

    // sorting based on A-Z, Z-A, Low-High pricing
    const handleSortChange = (option) => {
        setSortOptions(option);

        let sortedItems = [...filteredItems];

        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "low-to-high":
                sortedItems.sort((a, b) => a.price - b.price);
                break;
            case "high-to-low":
                sortedItems.sort((a, b) => b.price - a.price);
                break;
            default:
                sortedItems = menu;
                break;
        }

        setFilteredItems(sortedItems);
        setCurrentPage(1);
    }

    // pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div>
            {/* menu banner */}
            <div className='section-container section-bg-color'>
                <div className='py-48 flex flex-col justify-center items-center gap-8'>
                    {/* text */}
                    <div className='text-center space-y-7 px-4'>
                        <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug text-black'>For the Love of Delicious <span className='text-green'>Food</span></h2>
                        <p className='text-xl text-[#4A4A4A] md:w-4/5 mx-auto'>Come with famimy & feel the joy of mouthwatering food such as Greek Salad, Lasagne, Butternut
                        Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for a moderate cost.</p>
                        <button className='btn bg-green px-8 py-3 font-semibold text-white rounded-full border-none'>Order Now</button>
                    </div>
                </div>
            </div>

            {/* menu shop section */}
            <div className='section-container section-bg-color text-black'>
                {/* filtering and sorting */}
                <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
                    {/* all category buttons */}
                    <div className='flex flex-row justify-normal md:items-center md:gap-8 gap-4 flex-wrap'>
                        <button onClick={showAll} className={`${selectedCategory === "all" ? "active" : ""}`}>All</button>
                        <button onClick={() => filterItems("salad")} className={`${selectedCategory === "salad" ? "active" : ""}`}>Salad</button>
                        <button onClick={() => filterItems("pizza")} className={`${selectedCategory === "pizza" ? "active" : ""}`}>Pizza</button>
                        <button onClick={() => filterItems("soup")} className={`${selectedCategory === "soup" ? "active" : ""}`}>Soups</button>
                        <button onClick={() => filterItems("dessert")} className={`${selectedCategory === "dessert" ? "active" : ""}`}>Desserts</button>
                        <button onClick={() => filterItems("drinks")} className={`${selectedCategory === "drinks" ? "active" : ""}`}>Drinks</button>
                    </div>

                    {/* sorting filtering */}
                    <div className='flex justify-end mb-4 rounded-sm'>
                        <div className='bg-black p-2'>
                            <FaFilter className="h-4 w-4 text-white"/>
                        </div>

                        {/* sorting options */}
                        <select name='sort' id='sort' onChange={(e) => handleSortChange(e.target.value)} value={sortOptions} className='bg-black text-white px-2 py-1 rounded-sm'>
                            <option value="default">Default</option>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="low-to-high">Low to High</option>
                            <option value="high-to-low">High to Low</option>
                        </select>
                    </div>
                </div>

                {/* products card */}
                <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'>
                    {currentItem.map((item) => (
                        <Cards key={item._id} item={item} />
                    ))}
                </div>
            </div>

            {/* pagination section */}
            <div className='flex justify-center my-8 text-black'>
                {Array.from({length: Math.ceil(filteredItems.length / itemsPerPage)}).map((_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"}`}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Menu