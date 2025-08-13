// Import Product Images
import p_imgDefault from './p_imgDefault.png';
import p_imgDefault_1 from "./p_imgDefault_1.png";
import p_imgDefault_2 from "./p_imgDefault_2.png";
import p_imgDefault_3 from "./p_imgDefault_3.png";

// Import General Images
import logo from "./logo.png";
import hero_img from "./hero_img.png";
import cart_icon from "./cart_icon.png";
import bin_icon from "./bin_icon.png";
import dropdown_icon from "./dropdown_icon.png";
import exchange_icon from "./exchange_icon.png";
import profile_icon from "./profile_icon.png";
import quality_icon from "./quality_icon.png";
import search_icon from "./search_icon.png";
import star_dull_icon from "./star_dull_icon.png";
import star_icon from "./star_icon.png";
import support_icon from "./support_icon.png";
import menu_icon from "./menu_icon.png";
import about_img from "./about_img.png";
import contact_img from "./contact_img.png";
import razorpay_logo from "./razorpay_logo.png";
import stripe_logo from "./stripe_logo.png";
import cross_icon from "./cross_icon.png";
import chat_icon from "./chat_icon.png";
import tryon_icon from "./tryon_icon.png";
import send_icon from "./send_icon.png";
import send_icon_white from "./send_icon_white.png";
import filter_icon from "./filter_icon.png";
import upload_area from "./upload_area.png";

// Export Images
export const assets = {
    logo,
    hero_img,
    cart_icon,
    dropdown_icon,
    exchange_icon,
    profile_icon,
    quality_icon,
    search_icon,
    star_dull_icon,
    star_icon,
    bin_icon,
    support_icon,
    menu_icon,
    about_img,
    contact_img,
    razorpay_logo,
    stripe_logo,
    cross_icon,
    chat_icon,
    tryon_icon,
    send_icon,
    send_icon_white,
    filter_icon,
    upload_area
}

// Sample Product Data
export const products = [
    {
        _id: "1",
        name: "Women's Stylish Cap",
        description: "A fashionable cap designed for women, perfect for adding a touch of style to any outfit. Made from breathable materials.",
        price: 450,
        image: [p_imgDefault, p_imgDefault_1, p_imgDefault_2, p_imgDefault_3],
        category: "Women",
        subCategory: "Cap",
        sizes: ["S", "M"],
        date: 1718360000000,
        bestseller: true
    },
    {
        _id: "2",
        name: "Men's Classic Sneakers",
        description: "Comfortable and durable sneakers for men, ideal for everyday wear or light sports activities. Features a non-slip sole.",
        price: 1200,
        image: [p_imgDefault, p_imgDefault_1, p_imgDefault_2],
        category: "Men",
        subCategory: "Shoes",
        sizes: ["M", "L", "XL"],
        date: 1718360100000,
        bestseller: false
    },
    {
        _id: "3",
        name: "Kids' Graphic Tee",
        description: "Fun and colorful graphic t-shirt for kids, made from soft cotton for maximum comfort. Available in various playful designs.",
        price: 300,
        image: [p_imgDefault, p_imgDefault_1],
        category: "Kids",
        subCategory: "Clothing",
        sizes: ["S"],
        date: 1718360200000,
        bestseller: false
    },
    {
        _id: "4",
        name: "Women's Elegant Dress",
        description: "A beautiful and elegant dress for women, suitable for special occasions or evening wear. Flattering silhouette.",
        price: 1800,
        image: [p_imgDefault, p_imgDefault_1],
        category: "Women",
        subCategory: "Clothing",
        sizes: ["M"],
        date: 1718360300000,
        bestseller: true
    },
    {
        _id: "5",
        name: "Men's Running Shoes",
        description: "High-performance running shoes for men, offering excellent cushioning and support. Designed for optimal performance.",
        price: 2500,
        image: [p_imgDefault, p_imgDefault_1, p_imgDefault_2],
        category: "Men",
        subCategory: "Shoes",
        sizes: ["L", "XL"],
        date: 1718360400000,
        bestseller: false
    },
    {
        _id: "6",
        name: "Kids' Winter Jacket",
        description: "Warm and cozy winter jacket for kids, perfect for cold weather. Features a durable outer shell and soft inner lining.",
        price: 950,
        image: [p_imgDefault, p_imgDefault_1],
        category: "Kids",
        subCategory: "Clothing",
        sizes: ["M"],
        date: 1718360500000,
        bestseller: false
    },
    {
        _id: "7",
        name: "Women's Denim Jeans",
        description: "Classic denim jeans for women, versatile and comfortable for everyday wear. Available in various washes and fits.",
        price: 800,
        image: [p_imgDefault, p_imgDefault_1, p_imgDefault_2, p_imgDefault_3],
        category: "Women",
        subCategory: "Clothing",
        sizes: ["S", "M", "L"],
        date: 1718360600000,
        bestseller: true
    },
    {
        _id: "8",
        name: "Men's Formal Shirt",
        description: "A sophisticated formal shirt for men, ideal for office wear or special events. Made from premium quality fabric.",
        price: 700,
        image: [p_imgDefault, p_imgDefault_1],
        category: "Men",
        subCategory: "Clothing",
        sizes: ["M", "L", "XL"],
        date: 1718360700000,
        bestseller: false
    },
    {
        _id: "9",
        name: "Kids' Play Shoes",
        description: "Durable and comfortable shoes for active kids, designed for playground adventures. Easy to put on and take off.",
        price: 600,
        image: [p_imgDefault, p_imgDefault_1],
        category: "Kids",
        subCategory: "Shoes",
        sizes: ["S"],
        date: 1718360800000,
        bestseller: false
    },
    {
        _id: "10",
        name: "Women's Dryfit Shorts",
        description: "Lightweight and breathable athletic shorts for women, perfect for workouts or casual summer days.",
        price: 400,
        image: [p_imgDefault, p_imgDefault_1, p_imgDefault_2],
        category: "Women",
        subCategory: "Clothing",
        sizes: ["S", "M"],
        date: 1718360900000,
        bestseller: false
    },
    {
        _id: "11",
        name: "Men's Casual Cap",
        description: "A versatile casual cap for men, suitable for everyday wear. Adjustable strap for a comfortable fit.",
        price: 350,
        image: [p_imgDefault],
        category: "Men",
        subCategory: "Cap",
        sizes: ["M", "L"],
        date: 1718361000000,
        bestseller: false
    },
    {
        _id: "12",
        name: "Kids' Daily Sandals",
        description: "Comfortable and open-toe sandals for kids, perfect for warm weather. Easy to clean and durable for active play.",
        price: 450,
        image: [p_imgDefault, p_imgDefault_1, p_imgDefault_2, p_imgDefault_3],
        category: "Kids",
        subCategory: "Shoes",
        sizes: ["S"],
        date: 1718361100000,
        bestseller: false
    },
    {
        _id: "13",
        name: "Women's Knit Sweater",
        description: "A cozy and stylish knit sweater for women, perfect for cooler evenings. Soft and comfortable fabric.",
        price: 900,
        image: [p_imgDefault, p_imgDefault_1],
        category: "Women",
        subCategory: "Clothing",
        sizes: ["M", "L"],
        date: 1718361200000,
        bestseller: false
    },
    {
        _id: "14",
        name: "Men's Leather Boots",
        description: "Rugged and stylish leather boots for men, offering durability and comfort. Ideal for outdoor adventures or casual wear.",
        price: 2000,
        image: [p_imgDefault, p_imgDefault_1],
        category: "Men",
        subCategory: "Shoes",
        sizes: ["L", "XL"],
        date: 1718361300000,
        bestseller: true
    },
    {
        _id: "15",
        name: "Kids' Beanie Hat",
        description: "A cute and warm beanie hat for kids, perfect for keeping them cozy in chilly weather. Soft and stretchable material.",
        price: 250,
        image: [p_imgDefault, p_imgDefault_1],
        category: "Kids",
        subCategory: "Cap",
        sizes: ["S"],
        date: 1718361400000,
        bestseller: false
    }
]